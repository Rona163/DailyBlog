//(..roles) -> this is called rest paramenter.
//this is used to accept multiple values
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
};

//401- not logged in
//403 - logged in but not allowed

module.exports = authorizeRoles;