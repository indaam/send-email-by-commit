/**
 * Import app & libs
 */

const child_process = require('child_process');

let app = {
    commit  : require('./app/commit'),
    prompt  : require('./app/prompt'),
    helper  : require('./app/helper.js'),
    email   : require('./app/email'),
    dir : {
        root: String(process.cwd()).replace(/\s/g, '// '),
        current: String(__dirname).replace(/\s/g, '// '),
        app : ''
    },
    libs    : {
        child_process : child_process,
        fs          : require('fs'),
        moment      : require('moment'),
        prompt      : require('prompts'),
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
            child_process : this.app.libs.child_process,
            nodemailer : this.app.libs.nodemailer,
            dir : this.app.dir
        };

        const email = new this.app.email(data);
        email.send();
    }

    this.init = function() {
        const _this = this;
        console.log("Enter password for", this.app.CONFIG["email"]["from"]);

        const email = this.app.CONFIG["email"]["from"];
        const password = this.app.CONFIG["email"]["password"];

        if(password){
            return _this.sendEmail(password);
        }

        return this.app.prompt(this.app.libs.prompt, email, function(error, result) {
            if(!error){
                return _this.sendEmail(result.password);
            }
            return null
        });
    }
}

/**
 * Init
 */
const Daily = new daily(app);
Daily.init();
