const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticationToken = (req, res, next) => {
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({message : "Access denied. No token provided."});
    }

    try{
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(403).json({message : "Invalid token"})
    }
};
module.exports = authenticationToken;