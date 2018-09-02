
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
    this.logDir = "_log/";

    this.writeLog = function(){
        const today = this.helper.getToday(new Date());
        const names = ["html", "json"];
        for( let i in names){
            fs.writeFileSync( this.logDir + today + "." + names[i], (typeof this.data[names[i]] == "object" ? JSON.stringify(this.data[names[i]], null, 4) : this.data[names[i]] ));
            console.log('Create Log ' + today + "." + names[i] );
        }
    }

    this.createLog = function(){

        if (!fs.existsSync(this.logDir)){
            fs.mkdirSync(this.logDir);
            this.writeLog();
        }else{
            this.writeLog();
        }

    }

    this.send = function(){

        this.createLog();
        const _this = this;

        nodemailer.createTestAccount(function(err, account){
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: _this.config.email.from, // generated ethereal user
                    pass: _this.config.email.password // generated ethereal password
                }
            });

            let mailOptions = {
                from: '<'+ _this.config.email.from +'>',
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
                this.createLog();
            });
        });
        

    }
}

module.exports = email
