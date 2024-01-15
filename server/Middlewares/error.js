
const errorHandler = ((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  
  module.exports = { errorHandler  }
  