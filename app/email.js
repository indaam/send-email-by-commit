
/**
 * Email
 * @constructor
 * @param {object} email options, include config & helper
 * @rev https://nodemailer.com/about/
 */

const email = function(options){
    
    const fs = options.fs;
    const nodemailer = options.nodemailer;

    this.data = options.data;
    this.config = options.config;
    this.helper = options.helper;
    this.logDir = options.config.log.dir;
    this.dir = options.dir;
    this.child_process = options.child_process;

    this.writeLog = function(openBrowser){
        const today = this.helper.getToday(new Date());
        const names = ["html", "json"];
        const logLocation = [];
        for( let i in names){
            const location = this.dir.root + "/" + this.dir.app + this.logDir + "/" + today + "." + names[i];
            const content = (typeof this.data[names[i]] == "object" ? JSON.stringify(this.data[names[i]], null, 4) : this.data[names[i]] );
            logLocation.push(location);
            fs.writeFileSync( location, content);
            console.log('Create Log ' + today + "." + names[i] );
        }

        if(openBrowser){
            return this.child_process.exec(`open -a "Google Chrome" ${logLocation[0]}`, (err, stdout, stderr) => {
                console.log("stdout", stdout)
            });
        }
    }

    this.createLog = function(openBrowser){
        if (!fs.existsSync(this.logDir)){
            fs.mkdirSync(this.logDir);
            this.writeLog(openBrowser);
        }else{
            this.writeLog(openBrowser);
        }

    }

    this.send = function(){
        const _this = this;
        console.log("this.config", this.config);
        const { autosend } = this.config.email;
        if(autosend){
            return nodemailer.createTestAccount(function(err, account){
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: _this.config.email.user, // generated ethereal user
                        pass: _this.config.email.password // generated ethereal password
                    }
                });
    
                let mailOptions = {
                    from: '<'+ _this.config.email.user +'>',
                    to: _this.data.json.to,
                    subject: _this.data.json.subject,
                    html: _this.data.html
                };
    
                if( _this.config.email.cc ){
                    mailOptions["cc"] = _this.config.email.cc;
                }
    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    this.createLog(false);
                });
            });
        }
        console.log("Open preview");
        this.createLog(true);
        return null;
    }
}

module.exports = email
