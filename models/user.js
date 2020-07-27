const config = require('../config/default.json');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const mongoose = require('mongoose');

/*
    Tạo đối tượng USER
*/
const userSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    full_name: String,
    date_of_birth: Date,
    gender: String,
    phone_number: String,
    role_type: String
});

/*
    Logic đóng gói auth token
*/
userSchema.methods.generateAuthToken = function () {
    //Storing Secrets in Environment Variables
    const token = jwt.sign({ _id: this._id }, config.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(User) {
    const schema = {
        user_name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        full_name: Joi.string().min(5).max(50).required(),
        phone_number: Joi.string().required()
    }
    return Joi.validate(User, schema, { allowUnknown: true });
}

exports.UserSchema = userSchema;
exports.User = User;
exports.validate = validateUser;