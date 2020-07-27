const { User_Role, validate } = require('../models/user_role');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/*
   Lấy ra toàn bộ quyền đang hiện có.
*/
router.get('/', async (req, res) => {
    const user_role = await User_Role.find().sort('name');
    res.send(user_role);
});

/*
   Thêm mới 1 quyền.
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // User Role
    let user_role = new User_Role({
        role_code: req.body.role_code,
        desc: req.body.desc,
    });
    user_role = await user_role.save();
    res.send(user_role);
});

/*
   Chỉnh sửa thông tin quyền.
*/
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // User Role
    const user_role = await User_Role.findByIdAndUpdate(req.params.id, {
        role_code: req.body.role_code,
        desc: req.body.desc,
    }, { new: true });

    if (!user_role) return res.status(404).send('The user role with the given ' + req.body.user_name + ' was not found.');
    res.send(user_role);
});

/*
   Xóa đi thông tin quyền.
*/
router.delete('/:id', async (req, res) => {
    const user_role = await User_Role.findByIdAndRemove(req.params.id);

    if (!user_role) return res.status(404).send('The user role with the given ID was not found.');
    res.send(user_role);
});

module.exports = router; 