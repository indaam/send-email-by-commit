
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

	helper.createDataList = function(data){
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

	return helper
}

module.exports = helper
