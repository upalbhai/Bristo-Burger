const ErrorHandler = require("../utils/ErrorHandler");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies["connect.sid"];
    if (!token) {
        return res.status(401).json({ message: "Not logged in" });
    }
    next();
};



module.exports = isAuthenticated;
