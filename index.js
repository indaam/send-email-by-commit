/**
 * Import app & libs
 */
var a = require('./app/prompt');

let app = {
    commit  : require('./app/commit'),
    prompt  : require('./app/prompt'),
    helper  : require('./app/helper.js'),
    email   : require('./app/email'),
    libs    : {
        fs          : require('fs'),
        moment      : require('moment'),
        prompt      : require('prompt'),
        nodemailer  : require('nodemailer'),
    }
}


/**
 * Get config
 */
app["CONFIG"] = require('./config')
// app["CONFIG"] = require('./indaam.config.js')

/**
 * daily App
 * @constructor
 */
const daily = function(app){
    this.app = app;

    this.getCommit = function() {
        const commit = new this.app.commit({
            helper: this.app.helper(),
            config: this.app.CONFIG,
            moment : this.app.libs.moment
        });
        return commit.get();
    }

    this.sendEmail = function(password) {
        this.app.CONFIG["email"]["password"] = password;
        var data = {
            data: this.getCommit(),
            helper: this.app.helper(),
            config: this.app.CONFIG,
            fs : this.app.libs.fs,
            nodemailer : this.app.libs.nodemailer
        };

        console.log(data);
        // console.log()
        // const email = new this.app.email(data);
        // email.send();
    }

    this.init = function() {
        const _this = this;
        console.log("Enter password for", this.app.CONFIG["email"]["from"]);
        this.app.prompt(this.app.libs.prompt, function(error, result) {
            if (error ){ console.log(error) }
            _this.sendEmail(result.password);
        });
    }
}

/**
 * Init
 */
const Daily = new daily(app);
Daily.init();
