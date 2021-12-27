var Util:any = function () {};

Util.prototype.success = function (payload:any, message:string) {
    
    return {success: true, message: message, result: payload}

}
Util.prototype.error = function (payload:any, message:string) {
    //log.error("err: " + payload)
    return {success: false, message: message, result: []}

}
export default new Util();
