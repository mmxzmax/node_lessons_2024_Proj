const db = require('../db/db');

function checkAdmin(req, res, next) {
    try {
        const id = req?.userId;
        db.getUserById(id).then(user => {
            if(user.role === 'admin') {
                next();
            } else {
                res.status(401).json({error: 'Access denied'});
            }
        })
    } catch (error) {
        res.status(500).json({error: 'internal server error'});
    }
}

module.exports = checkAdmin;
