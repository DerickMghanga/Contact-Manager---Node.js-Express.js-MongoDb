//This handler verifies the accesstoken for specific users when logging in('/current' route)
// extract User info from the token

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is Not Authorized");
            }
            // console.log(decoded);
            req.user = decoded.user;  //extract User info embeded in the token
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("User in Not authorized or token is missing");
        }
    }
});

module.exports = validateToken;