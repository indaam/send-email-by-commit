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
app["CONFIG"] = app.helper().createConfig(app);

/**
 * daily App
 * @constructor
 */
const Daily = function(app){
    this.app = app;

    this.getCommit = function() {
        const commit = new this.app.commit({
            helper: this.app.helper(),
            config: this.app.CONFIG,
            moment : this.app.libs.moment
        });
        return commit.get();
    }

    this.sendEmail = function(password, autoSend) {
        this.app.CONFIG["email"]["auth"]["password"] = password;
        var data = {
            data: this.getCommit(),
            helper: this.app.helper(),
            config: this.app.CONFIG,
            fs : this.app.libs.fs,
            child_process : this.app.libs.child_process,
            nodemailer : this.app.libs.nodemailer,
            dir : this.app.dir,
            autoSend : autoSend
        };

        const email = new this.app.email(data);
        email.send();
    }

    this.init = function() {
        const _this = this;

        const email = _this.app.CONFIG.email.auth.user;
        const password = _this.app.CONFIG.email.auth.password;
        const autoSend = _this.app.CONFIG.email.send.autoSend;

        if(password){
            return _this.sendEmail(password, autoSend);
        }

        return this.app.prompt(this.app.libs.prompt, email, function(error, result) {
            if(!error){
                return _this.sendEmail(result.password, autoSend);
            }
            return null
        });
    }
}

/**
 * Init
 */
const daily = new Daily(app);
daily.init();
