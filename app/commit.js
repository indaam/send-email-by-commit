/**
 * Get Commit Collection
 * @constructor
 * @param {object} Commit options, include config, helper & libs
 */

const commit = function(options){
    this.moment = options.moment;
	this.helper = options.helper;
	this.config = options.config;

	this.getCommit = function(){
		return require('child_process')
			.execSync(`git log --pretty=format:'{"commit":"%H","author":"%an","email":"%ae","date":"%ad","message":"%f"}@@@'`)
			.toString()
	}

	this.commitArray = function(){
		let commit = this.getCommit();
		commit = JSON.stringify(commit);
		commit = commit.split('@@@');
		return commit
	}

	this.commitObject = function(){
		var data = [];
		let commit = this.commitArray();

		for( let i in commit){
			commit[i] = commit[i].replace('"{', '{');
			commit[i] = commit[i].replace(/\\/g, "");
			commit[i] = commit[i].replace(/n{/g, "{");

			try {
				data.push(JSON.parse(commit[i]));
			}catch(err) {
				// console.log(err);
			}
		}
		return data
	}

	this.updateCommit = function(){
        let data = this.commitObject();

        data = this.helper.filterData(data, 'message', this.config.git.ignore[0]);
        data = this.helper.filterData(data, 'message', this.config.git.ignore[1]);
        
		for( let i in data){
			data[i]["today"] = this.helper.getToday(data[i]["date"]);
			data[i]["message"] = this.helper.replaceToSpace(data[i]["message"]);
		}

		return data
	}

    this.getCommitToday = function(date){
        let data = this.updateCommit();
        let today = this.helper.getToday(date);

        return data.filter(function(data) {
            if( data.today === today){
                return data
            }
        });
    }

	this.getCommitByEmail = function(email){
        let data = this.getCommitToday(new Date());
		return data.filter(function(data) {
			if( data.email === email){
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
        const dateTimeFormat = this.getTimeFormat(config.email.body.header.date.data);
        const timeOutTimeFormat = this.getTimeFormat(config.email.body.header.timeOut.data);
        delete mockup.auth;
        mockup["send"]["subject"] = subjectTimeFormat.text + this.moment(new Date()).format(subjectTimeFormat.format);
        mockup["body"]["header"]["date"]["data"] = this.moment(new Date()).format(dateTimeFormat.format);
        mockup["body"]["header"]["timeOut"]["data"] = this.moment(new Date()).format(timeOutTimeFormat.format);
        mockup["body"]["content"]["taskCompleted"]["data"] = this.helper.createDataList(data, config.email.body.content.taskCompleted.data);
        return mockup;
    }
    
	this.htmlMockup = function(jsonData){
        return this.helper.createHtmlMockupUpdate(jsonData);
	}

	this.get = function(){
		var commit = {};
        commit.object = this.commitObject();
		commit.update = this.updateCommit();
        commit.today = this.getCommitToday(new Date());
		commit.byEmail = this.getCommitByEmail(this.config.git.email);
        commit.json = this.jsonMockup(commit.byEmail, this.config);
		commit.html = this.htmlMockup(commit.json);
		return commit
	}
}

module.exports = commit
