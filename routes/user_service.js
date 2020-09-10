
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { User_Role } = require('../models/user_role');
const express = require('express');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin');
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
    Lấy ra toàn bộ User.
*/
router.get('/', [auth, admin_auth], async (req, res) => {
    const use = await User.find().sort('name');
    res.send(use);
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

    // User role
    const user_role = await User_Role.findById(req.body.user_role_id);
    if (!user_role) return res.status(400).send('Invalid user role!');

    //Hash password.
    const salt = await bcrypt.genSalt(10);
    // Auto-gen a salt và hash
    const password_hash = await bcrypt.hash(req.body.password, salt);
    //Tạo một mảng dữ liệu được truyển từ client đã có bằng cách lấy ra các properties đã được xác định.
    //user = new User(_.pick(req.body, ['user_name', 'email', 'password', 'full_name', 'date_of_birth', 'gender', 'phone_number', 'role_type']))
    user = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: password_hash,
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        user_role: {
            _id: user_role._id,
            role_code: user_role.role_code,
            desc: user_role.desc
        }
    });
    await user.save();
    const token = user.generateAuthToken();
    //Nếu register thành công, trả về client một header response.
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'user_name', 'email']));
});

/*
    User Registration và Authentication
*/
router.put('/:id', auth, async (req, res) => {
    //Validate thông tin register User từ Client. 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // User role
    const user_role = await User_Role.findById(req.body.user_role_id);
    if (!user_role) return res.status(400).send('Invalid user role!');

    //Hash password.
    const salt = await bcrypt.genSalt(10);
    // Auto-gen a salt và hash
    var password_hash = await bcrypt.hash(req.body.password, salt);

    //Kiểm tra sự tồn tại của user và update.
    let user = await User.useFindAndModify(req.params.id, {
        user_name: req.body.user_name,
        email: req.body.email,
        password: password_hash,
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        user_role: {
            _id: user_role._id,
            role_code: user_role.role_code,
            desc: user_role.desc
        }
    }, { new: true });

    if (!user) return res.status(404).send('The user with the given ' + req.body.user_name + ' was not found.');
    const token = user.generateAuthToken();
    //Nếu update thành công, trả về client một header response.
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'user_name', 'email']));
});

module.exports = router; 