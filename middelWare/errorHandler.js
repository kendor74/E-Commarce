const errorHandler = ((err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';
        if(process.env.NODE_ENV === 'development') {
            devError(err,res);
        }
        else {
            prodError(err,res);
        }
        
})


const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack : err.stack
    });
}

const prodError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}
module.exports = errorHandler;