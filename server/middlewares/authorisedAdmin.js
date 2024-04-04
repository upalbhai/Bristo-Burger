const ErrorHandler = require("../utils/ErrorHandler");

const authorisedAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("Only Admin Allowed", 401));
    }
    next();
};

module.exports = authorisedAdmin;
