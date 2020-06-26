/**
 * Get Commit Collection
 * @constructor
 * @param {object} Commit options, include config, helper & libs
 */

const templatev1 = require('./templatev1');

const commit = function(options){
    this.moment = options.moment;
	this.helper = options.helper;
	this.config = options.config;

	this.getCommitString = function(){
		return require('child_process')
			.execSync(`git log --pretty=format:'{"commit":"%H","author":"%an","email":"%ae","date":"%ad","message":"%f"}@@@'`)
			.toString()
	}

	this.getCommitArrayString = function(commit){
		commit = JSON.stringify(commit);
        commit = commit.split('@@@');
		return commit
	}

	this.getCommitObject = function(commit){
		var data = [];
		for( let i in commit){
            commit[i] = commit[i].replace('"{', '{')
            .replace(/\\/g, "")
            .replace(/n\{/g, "{");
			try {
				data.push(JSON.parse(commit[i]));
			}catch(err) {
				// console.log(err);
			}
        }
		return data
	}

	this.getCommitClean = function(commit){
        let data = commit;
        for( let ig in this.config.git.ignore){
            let ignore = this.config.git.ignore[ig];
            data = this.helper.filterData(data, 'message', ignore);
        }
		return data
    }
    
    this.getCommitUpdate = function(data){
        const moment = this.moment;

		for( let i in data){
			data[i]["today"] = this.helper.getToday(data[i]["date"]);
			data[i]["timestamp"] = this.helper.createTimestamp(data[i]["date"], moment);
			data[i]["message"] = this.helper.replaceToSpace(data[i]["message"]);
		}

		return data
    }

    this.getTimestampFrom = function (day) {
        const moment = this.moment;
        return moment().subtract(day, 'days').valueOf();
    }

    this.getCommitByEmail = function(data, email){
        if(typeof email === "string"){
            return data.filter(function(data) {
                if( ( data.email === email)){
                    return data
                }
            });
        }
        return data.filter(function(data) {
            if( (email.includes(data.email))){
                return data
            }
        });
    }
    
    this.getCommitUser = function(data, config){
        var gitConfig = config.git;
        var email = gitConfig.email || null;
        var from = gitConfig.getFrom || 1;
        var timestampFrom = this.getTimestampFrom(from);
        var temp = this.getCommitByEmail(data, email);

        if(String(from).toLowerCase() === "today"){
            return this.getCommitToday(temp, new Date());
        }

        return temp.filter(function(data) {
            if( (data.timestamp > timestampFrom )){
                return data
            }
        });
    }

    this.getCommitToday = function(data, date){
        let today = this.helper.getToday(date);
        return data.filter(function(data) {
            if( data.today === today){
                return data
            }
        });
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

	this.jsonMockup = function(data, config){
        let mockup = {...config.email};
        const subjectTimeFormat = this.getTimeFormat(config.email.send.subject);
        // const dateTimeFormat = this.getTimeFormat(config.email.body.header.date.data);
        // const timeOutTimeFormat = this.getTimeFormat(config.email.body.header.timeOut.data);
        delete mockup.auth;
        mockup["send"]["subject"] = subjectTimeFormat.text + this.moment(new Date()).format(subjectTimeFormat.format);
        // mockup["body"]["header"]["date"]["data"] = this.moment(new Date()).format(dateTimeFormat.format);
        // mockup["body"]["header"]["timeOut"]["data"] = this.moment(new Date()).format(timeOutTimeFormat.format);
        mockup["body"]["content"]["taskCompleted"]["data"] = this.helper.createDataList(data, config.email.body.content.taskCompleted.data);
        return mockup;
    }
    
	this.htmlMockup = function(jsonData, config){
        var template = new templatev1();
        var configEmail = config.email;
        var templateConfig = configEmail.template || "default";
        if(templateConfig === "v1"){
            return template.init(jsonData);
        }
        return this.helper.createHtmlMockupUpdate(jsonData);
	}

	this.get = function(){
        var config = this.config;

        var commitString = this.getCommitString();
        var commitArray = this.getCommitArrayString(commitString);
        var commitObject = this.getCommitObject(commitArray);
        var commitClean = this.getCommitClean(commitObject);
        var commitUpdate = this.getCommitUpdate(commitClean);
        var commitUser = this.getCommitUser(commitUpdate, config);

        commit.json = this.jsonMockup(commitUser, this.config);
        commit.html = this.htmlMockup(commit.json, this.config);
        
		return commit
	}
}

module.exports = commit
