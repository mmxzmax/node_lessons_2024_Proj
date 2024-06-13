const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    secretKey: process.env.SECRET_KEY,
};
