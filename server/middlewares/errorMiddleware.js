const errorMiddleware = (err, req, res, next) => {
    console.log("Error middleware called");
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
    console.log(err)

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = errorMiddleware;
