
/**
 * prompInit
 * @constructor
 * @param prompt
 * @param {func} func after get prompt 
 * @rev https://www.npmjs.com/package/prompt
 */

const prompInit = function(prompt, callback){
    prompt.start();
    prompt.get([{
        name: 'password',
        hidden: true,
        replace: '*',
        conform: function(value) {
            return true;
        }
    }], function(err, result) {
        if ( callback && typeof callback === 'function') {
            callback(err, result);
        }
    });
}

module.exports = prompInit
