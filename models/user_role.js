const Joi = require('joi');
const mongoose = require('mongoose');

/*
    Quyền của từng đối  User.
*/

const userRoleSchema = new mongoose.Schema({
    role_code: String,
    desc: String,
});

const userRole = mongoose.model('User_Role', userRoleSchema);

function validateUserRole(User_Role) {
    const schema = {
        role_code: Joi.string().required(),
        desc: Joi.string().required(),
    }
    return Joi.validate(User_Role, schema, { allowUnknown: true });
}

exports.userRoleSchema = userRoleSchema;
exports.userRole = userRole;
exports.validate = validateUserRole;