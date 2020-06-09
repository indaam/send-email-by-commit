
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
        const { date, timeIn, timeOut, status } = data.header;
        return `
            <tr style="height:21px">
                <td style="border:1px solid #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;font-weight:bold">
                    <font face=".AppleSystemUIFont">${date.title}</font>
                </td>
                <td style="border-width:1px;border-style:solid;border-color:#ccc #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold">
                    <font face=".AppleSystemUIFont">${date.data}</font>
                </td>
            </tr>
            <tr style="height:21px">
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;font-weight:bold">
                    <font face=".AppleSystemUIFont">${timeIn.title}</font>
                </td>
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold">
                    <font face=".AppleSystemUIFont">${timeIn.data}</font>
                </td>
            </tr>
            <tr style="height:21px">
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;font-weight:bold">
                    <font face=".AppleSystemUIFont">${timeOut.title}</font>
                </td>
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold">${timeOut.data}</td>
            </tr>
            <tr style="height:21px">
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:top"></td>
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:bottom"></td>
            </tr>
            <tr style="height:21px">
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc;overflow:hidden;padding:2px 3px;vertical-align:top;font-weight:bold">
                    <font face=".AppleSystemUIFont">${status.title}</font>
                </td>
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:bottom;font-weight:bold">
                    <font face=".AppleSystemUIFont">
                        <font color="#030004">${status.data}</font>
                    </font>
                </td>
            </tr>
            
            <tr style="height:21px">
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:top"></td>
                <td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) #ccc #ccc rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:bottom"></td>
            </tr>
    `;
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

    helper.createContent = function (data) {
        const { content } = data;
        let html = '';

		for( let k in content){
            let d = content[k];
            d["id"] = k;
            html += this.createContentLists(d);
        }
        return html;
    }

	helper.createHtmlMockupUpdate = function(data){
        let html = `<div dir="ltr"><div><font face=".AppleSystemUIFont"><b>The&nbsp;Daily&nbsp;Journal:<br></b></font><br/></div><table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;width:100%;max-width:600px;border-collapse:collapse;border:none"><tbody>`;
        let header = helper.createHeader(data);
        let content = helper.createContent(data);

        html+= (header + content);
        html += `</tbody></table><font style="font-size: 7px" face=".AppleSystemUIFont">Generator : <a href="https://github.com/indaam/send-email-by-commit">Send email by commit</a></font></div>`;
		return html;
    }
    



	return helper
}

module.exports = helper
