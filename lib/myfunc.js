var myfunc = {};

myfunc.gen_nonce =  function (len, raw_str) {
    var len = len || 32;
    var chars = raw_str || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
    var nonce = '';
    for (let i=0; i<len; ++i){
        nonce += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return nonce;
}

myfunc.gen_nonce_number = function (len) {
    return this.gen_nonce(len, '0123456789');
}

myfunc.format_ret  = function (code, msg, data) {
    var ret = {};
    ret.code = code;
    ret.msg  = msg;
    ret.data = data || '';
    return JSON.stringify(ret);
}
module.exports = myfunc;