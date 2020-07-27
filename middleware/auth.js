const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    //Kiểm tra xem có mã token hay chưa.
    console.log("Access denied. No token provided.")
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch (ex) {
        //Nếu thông tin token gửi đến không đúng, catch ra ngoại lệ.
        res.status(400).send('Invalid token.');
    }
}