
/**
 * prompInit
 * @constructor
 * @param prompt
 * @param {func} func after get prompt 
 * @rev https://www.npmjs.com/package/prompts
 */

const prompInit = function(prompt, email, callback){

    var questions = [{
        type: 'password',
        name: 'password',
        message: 'Enter password for ' + email
    }]
    prompt(questions).then( res => {
        if ( callback && typeof callback === 'function') {
            if(res && res.password){
                callback(false, res);
            }else{
                callback(true, res);
            }
        }
        // console.log(res);
    }).catch ( e => {
        if ( callback && typeof callback === 'function') {
            callback({
                error : 1,
                message : e
            }, res);
        }
    })
}

module.exports = prompInit
