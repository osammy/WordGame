module.exports = function(res,errCode,message) {
    
//    const err = new Error();
    const err ={}
    err.message = message;
    return res.status(errCode).json(err);

}