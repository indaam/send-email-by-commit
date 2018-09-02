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

	this.jsonMockup = function(data){
		let mockup = {
            from : "",
			to : "",
			cc : "",
			subject : "",
			content : {
				date : {
					title : "Date: ",
					data : ""
				},
				timeIn : {
					title : "Time In : ",
					data : ""
				},
				timeOut : {
					title : "Time Out : ",
					data : ""
				},
				taskAssigned : {
					title : "Task Assigned: ",
					data : []	
				},
				taskCompleted: {
					title : "Task Completed: ",
					data : []	
				},
				planForNextDay : {
					title : "Plan for Next Day: ",
					data : []	
				},
				healthyThingAchievedToday : {
					title : "Healthy Thing Achieved Today:",
					data : []	
				},
				anyIssuesFaced: {
					title : "Any issues faced:",
					data : []	
				},
				leavePlannedApproved: {
					title : "Leave Planned / Approved:",
					data : []	
				},
				gratitude : {
					title : "Gratitude: ",
					data : []	
				},
				blocker : {
					title : "Blocker : ",
					data : []	
				}
			}
		}

        mockup["from"] = this.config.email.from;
        mockup["to"] = this.config.email.to;
		mockup["cc"] = this.config.email.cc;
		mockup["subject"] = "Daily Update " + this.moment(new Date()).format('DD MMMM YYYY');
		mockup["content"]["date"]["data"] = this.moment(new Date()).format('DD MMM YYYY').toUpperCase();
		mockup["content"]["timeIn"]["data"] = this.config.base.timeIn;
		mockup["content"]["timeOut"]["data"] = this.config.base.timeOut;
        mockup["content"]["taskAssigned"]["data"] = this.helper.createDataList(this.config.base.task);
        mockup["content"]["taskCompleted"]["data"] = this.helper.createDataList(data);

		return mockup;
	}

	this.htmlMockup = function(data){
		return this.helper.createHtmlMockup(data);
	}

	this.get = function(){
		var commit = {};
		commit.object = this.commitObject();
		commit.update = this.updateCommit();
        commit.today = this.getCommitToday(new Date());
		commit.byEmail = this.getCommitByEmail(this.config.git.email);
        commit.json = this.jsonMockup(commit.byEmail);
		commit.html = this.htmlMockup(commit.json.content);
		return commit
	}
}

module.exports = commit
