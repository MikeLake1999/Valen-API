const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/*
    Current user account
*/
router.get('/me', auth, async (req, res) => {
    //Trả lại thông tin người dùng và exclude password.
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

/*
    User Registration và Authentication
*/
router.post('/', async (req, res) => {
    //Validate thông tin register User từ Client. 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Kiểm tra sự tồn tại của email.
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    //Tạo một mảng dữ liệu được truyển từ client đã có bằng cách lấy ra các properties đã được xác định.
    user = new User(_.pick(req.body,['user_name','email','password','full_name','date_of_birth','gender','phone_number','role_type']))

    //Hash password.
    const salt = await bcrypt.genSalt(10);
    // Auto-gen a salt và hash
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    //Nếu register thành công, trả về client một header response.
    res.header('x-auth-token', token).send(_.pick(user,['_id','user_name','email']));
});

module.exports = router; 