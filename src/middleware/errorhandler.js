const  errorHandler = (err, req, res, next) => {
   console.error(err.mesage);
   console.error(err.stack);

   const statuscode = err.statuscode || 500;

   res.status(statuscode).json({
    success: false,
    error: err.message || 'server error',
    });
}

module.exports = errorHandler;