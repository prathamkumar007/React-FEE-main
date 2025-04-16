require('dotenv').config();

const checkAdminRole = (req, res, next) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (req.user && req.user.email === adminEmail) {
        req.user.role = 'admin';
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin access only." });
    }
};

module.exports = checkAdminRole;
