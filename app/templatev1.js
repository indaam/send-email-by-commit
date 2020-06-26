
/**
 * Template v1 - Template v1
 * @constructor
 */

const helper = require("./helper");
const moment = require("moment");

var helpers = helper();

var Templatev1 = function(){
    this.openTable = function (){
        return `        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="color:rgb(0,0,0);font-family:Times;font-size:medium;border-spacing:0px;margin:0px;padding:0px">
    <tbody>
        <tr>
            <td style="border-spacing:0px;font-family:Helvetica,Arial,sans-serif;line-height:1.5;padding:48px">
                <table cellpadding="0" cellspacing="0" border="0" width="max-width:100%;" bgcolor="#fff" style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;width:960px;max-width: 100%;margin:0px;padding:0px">
                    <tbody>`;
    }

    this.closeTable = function () {
        return `                            </tbody>
                </table>
            </td>
        </tr>
        </tbody>
        </table>`;
    }

    this.createName = function(data){
        if(data && data.name){
            return `
            <tr>
                <td colspan="2" style="color:rgb(55,55,55);font-size:16px;line-height:24px;padding:0px 0px 2px">${data.name}</td>
            </tr>
            `;
        }
        return '';

    }

    this.createTitle = function(data){
        if(data && data.title){
            return `
            <tr>
                <td colspan="2" style="color:rgb(34,34,34);font-size:64px;line-height:72px;padding:0px 0px 48px"><strong>${data.title}</strong></td>
            </tr>
            `
        }
        return '';
    }

    this.isStatus = function (text) {
        return /normal|warning|critical/.test(text.toLowerCase());
    }

    this.getStatus = function (text) {
        let color = "rgb(87,232,0)";
        if(text.toLowerCase() === "warning"){
            color = 'rgb(255, 205, 79)';
        }
        if(text.toLowerCase() === "critical"){
            color = 'rgb(255, 18, 18)';
        }
        return {
            text : `<strong>${text}</strong>`,
            color : color
        }
    }

    this.getTextTime = function(data){
        return data.text + moment(new Date()).format(data.format);
    }

    this.printDataTimeFormat = function (data) {
        var timeFormat = this.getTimeFormat(data);
        var textTime = this.getTextTime(timeFormat);
        return `
        <tr>
            <td colspan="2" style="color:rgb(55,55,55);font-size:24px;line-height:28px;padding:0px 0px 40px">${textTime}</td>
        </tr>`;
    }

    this.printDataStatus = function (data) {
        var statusFormat = this.getStatus(data);
        return `
        <tr>
            <td colspan="2" style="color:${statusFormat.color};font-size:24px;line-height:28px;padding:0px 0px 40px">${statusFormat.text}</td>
        </tr>`;
    }

    this.printDataArray = function (data) {
        var temp = [];
        for (const i in data) {
            var d = data[i];
            if(i == 1){
                temp.push(' | ');
            }
            for (const j in d) {
                if( j === "title"){
                    temp.push(`<strong>${d[j]}</strong>`)
                }else{
                    temp.push( this.getDataText(d[j]));
                }
            }
        }

        var text = temp.join("");
        return `
        <tr>
            <td colspan="2" style="color:rgb(55,55,55);font-size:24px;line-height:28px;padding:0px 0px 40px">${text}</td>
        </tr>`;

    }

    this.getDataText = function(data){
        var isTimeFormat = this.isTimeFormat(data);
        if(isTimeFormat){
            var timeFormat = this.getTimeFormat(data);
            return this.getTextTime(timeFormat);
        }
        return data;
    }

    this.printDataValid = function(data){
        var text = this.getDataText(data);
        return `
        <tr>
            <td colspan="2" style="color:rgb(55,55,55);font-size:24px;line-height:28px;padding:0px 0px 40px">${text}</td>
        </tr>`;
    }

    this.printData = function(data){
        if(typeof data === 'string'){
            var isStatus = this.isStatus(data);

            if(isStatus){
                return this.printDataStatus(data);
            }
            return this.printDataValid(data);
        }
        return this.printDataArray(data);
    }

    this.isTimeFormat = function(text){
        var first = /\{\{/.test(text);
        var last = /\}\}/.test(text);
        return first && last;
    }

    this.getTimeFormat = function(text){
        try {
            const timeFormat = String(text).split("{{");
            return {
                text : timeFormat[0], 
                format : timeFormat[1].replace("}}", "")
            }
        } catch (error) {
            throw "Invalid time format example : {{DD MMM YYYY}}"
        }
    }

    this.createHeaderLists = function (d) {
        return `
        <td style="border-spacing:0px;font-family:Helvetica,Arial,sans-serif;line-height:1.5;">
            <table cellpadding="0" cellspacing="0" border="0" style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;margin:0px;padding:0px">
                <tr>
                    <td colspan="2" style="color:rgb(151,151,151);font-size:14px;line-height:20px;padding:0px 0px 4px">${d.title}</td>
                </tr>
                ${this.printData(d.data)}
            </table>
        </td>
        `
    }

    this.createHeaderSection = function(data){
        let temp = '';
        for (const d of data) {
            temp += '<tr>';
            for (const j of d) {
                temp += this.createHeaderLists(j);
            }
            temp += '</tr>';
        }
        return temp;
    }

    this.chunkHeaderData = function(data){
        const { header } = data;
        const temp = [];
        for( let k in header){
            temp.push(header[k]);
        }
        return helpers.chunkArray(temp, 2)
    }

    this.createHeader = function(data){
        const headerData = this.chunkHeaderData(data);
        const html = this.createHeaderSection(headerData);
        return html;
    }

    this.createContentLists = function(data){
        let list = '';
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            list+= `<li>${element}</li>`;
        }
        return list;
    }

    this.createContentSection = function(data){

        if(data && data.data && data.data.length){
            return `
            <tr>
                <td colspan="2" style="color:rgb(151,151,151);font-size:14px;line-height:20px;padding:0px 0px 8px">${data.title}</td>
            </tr>
            <tr>
                <td colspan="2" style="color:rgb(55,55,55);padding:0px 0px 32px">
                    <ul style="margin:0px;padding:0px 0px 0px 24px;font-size:16px;line-height:32px">
                        ${this.createContentLists(data.data)}
                    </ul>
                </td>
            </tr>
        `;
        }
        return '';
    }

    this.createContent = function (bodyData) {
        const { content } = bodyData;
        let html = '';

		for( let k in content){
            let d = content[k];
            d["id"] = k;
            html += this.createContentSection(d);
        }

        return html;
    }

    this.createCredit = function(data){
        return `
        <tr>
            <td colspan="2" style="color:rgb(55,55,55);padding:0px 0px 32px;font-size: 8px;">
            <a style="text-decoration: none;color: inherit;" href="https://github.com/indaam/send-email-by-commit">Generator, send email by commit</a>
            </td>
        </tr>
        `;
    }

    this.init = function(data){

        const openTable = this.openTable();
        const closeTable = this.closeTable();

        const name = this.createName(data.body);
        const title = this.createTitle(data.body);
        const header = this.createHeader(data.body);
        const content = this.createContent(data.body);
        const credit = this.createCredit();

        return openTable + name + title + header+ content + credit + closeTable;
    }
}

module.exports = Templatev1
