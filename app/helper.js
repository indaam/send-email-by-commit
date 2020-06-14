
/**
 * Helper - Reusable Function
 * @constructor
 */

var helper = function(){
	var helper = {};

	helper.getToday = function(date){
		const data = new Date(date);
		return data.getFullYear() + "" + data.getMonth() + "" + data.getDate()
	}

	helper.replaceToSpace = function(str){
		return str.replace(/(.)-(.)/g, function(a, b, c){
			return b + " " + c
		}); 
	}

    helper.filterData = function(data, key, regexStr){
        const regex = new RegExp(regexStr, "i");
        return data.filter(function(data) {
            if( !regex.test(data[key]) ){
                return data
            }
        });
    }

	helper.createDataList = function(data, defaultData){
		let arr = [];
        if ( data.length && typeof data[0] === "string" ) {
            for( let i in data){
                arr.push(data[i]);
            }
        }else{
            for( let i in data){
                arr.push(data[i]["message"]);
            }            
        }

        if(!arr.length){
            return defaultData;
        }

		return arr;
	}

	helper.createHtmlTypeStr = function(data){
		return `<div dir="auto" style="font-size:12.8px;text-decoration-style:initial;text-decoration-color:initial;font-family:sans-serif">
			<font color="#212121">
				<b style="font-size:12.8px;word-spacing:1px">${data.title} ${data.data}</b>
			</font>
		</div>`;
	}

	helper.createHtmlTypeList = function(data){

		let html = `<div dir="auto" style="font-size:12.8px;text-decoration-style:initial;text-decoration-color:initial;font-family:sans-serif">`;

		if (data.title) {
			html += `<p style="font-size:12.8px;text-decoration-style:initial;text-decoration-color:initial"><span><b style="font-size:12.8px;word-spacing:1px">${data.title}</b></span></p>`;
		}

		if( data.data.length){
		    html += `<ol style="font-size:12.8px;text-decoration-style:initial;text-decoration-color:initial">`;
		    for( let i in data.data){
		        html += `<li style="margin-left:15px">${data.data[i]}</li>`
		    }
		    html += `</ol>`;
		}else{
			html += `<ol style="font-size:12.8px;text-decoration-style:initial;text-decoration-color:initial">
				<li style="margin-left:15px">NA</li>
			</ol>`;
		}
		html += `</div>`;

		return html;
	}

	helper.createHtmlMockup = function(data){
        let html = `<div dir="ltr">`;
		for( let i in data){
			if ( typeof data[i].data === "string") {
				html += this.createHtmlTypeStr(data[i]);
			}else{
				html += this.createHtmlTypeList(data[i]);
			}
		}
		html += `</div>`;
		return html;
    }

    helper.createHeader = function(data){


        const { header } = data;
        let html = '';

		for( let k in header){
            let d = header[k];
            d["id"] = k;
            html += this.createHeaderLists(d);
        }
        return html;        

    }


    helper.createContentListsUl = function (data) {
        let ol = `<ul style="margin-top: 12px">`;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            ol+= `<li>${element}</li>`;
        }
        ol+= `</ul>`;
        return ol;
    }

    helper.createHeaderLists = function (data) {
        if(data && data.data && data.data.length){
            return `
            <tr style="height:21px">
                <td style="border:1px solid #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;font-weight:bold">
                    <font face=".AppleSystemUIFont">${data.title}</font>
                </td>
                <td style="border-width:1px;border-style:solid;border-color:#ccc #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold">
                    <font face=".AppleSystemUIFont">${data.data}</font>
                </td>
            </tr>
        `;
        }
        return '';
    }

    helper.createContentLists = function (data) {
        if(data && data.data && data.data.length){
            return `
            <tr style="height:21px">
                <td rowspan="1" colspan="2" style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;background-color:rgb(243,243,243);font-weight:bold">
                    <font face=".AppleSystemUIFont">${data.title}</font>
                </td>
            </tr>
            <tr style="height:21px">
                <td rowspan="1" colspan="2" style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(204,204,204) #ccc;overflow:hidden;padding:2px 3px;vertical-align:top">
                    ${this.createContentListsUl(data.data)}
                </td>
            </tr>
        `;
        }
        return '';
    }

    helper.createContent = function (bodyData) {
        const { content } = bodyData;
        let html = '';

		for( let k in content){
            let d = content[k];
            d["id"] = k;
            html += this.createContentLists(d);
        }
        return html;
    }

    helper.createSpace = function(){
        return `<!-- Space -->
        <tr style="height:21px">
            <td colspan="2" style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:top"></td>
        </tr>
        `;
    }

    helper.createTitle = function (data) {
        return `<div><font face=".AppleSystemUIFont"><b>${data.title}<br></b></font><br/></div>`;
    }

	helper.createHtmlMockupUpdate = function(data){
        const openWrapper = `<div dir="ltr">`;
        const closeWrapper = `</div>`;

        const openTable = `<table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;width:100%;max-width:600px;border-collapse:collapse;border:none"><tbody>`;
        const closeTable = `</tbody></table>`;

        const credit = `<div><font style="font-size: 7px" face=".AppleSystemUIFont">Generator : <a href="https://github.com/indaam/send-email-by-commit">Send email by commit</a></font></div>`;
        const space = this.createSpace();

        const title = helper.createTitle(data.body);
        const header = helper.createHeader(data.body);
        const content = helper.createContent(data.body);

        return openWrapper + title + openTable + header + space + content + closeTable + credit + closeWrapper;
    }

    helper.defaulConfig = function(app){
        const { libs, dir } = app;
        try {
            const configFile = `${dir.current}/daily.email.config.sample.json`;
            const configFileContent = libs.fs.readFileSync(configFile, 'utf8');
            return JSON.parse(configFileContent);
        }catch (e){
            throw "Config not found, please read docs: https://github.com/indaam/send-email-by-commit";
        }

    }

    helper.createConfig = function(app){
        const { libs, dir } = app;
        try {
            const configFile = `${dir.root}/daily.email.config.json`;
            const configFileContent = libs.fs.readFileSync(configFile, 'utf8');
            return JSON.parse(configFileContent);
        }catch (e){
            console.log("Use default config, please read docs: https://github.com/indaam/send-email-by-commit")
            return helper.defaulConfig(app);
        }

    }
	return helper
}

module.exports = helper
