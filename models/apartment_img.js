const Joi = require('joi');
const mongoose = require('mongoose');

const ApartmentImg = mongoose.model('Apartment_Img', new mongoose.Schema({
    apt_code: String,
    img_desc: String,
    img_path: String
}));

function validateApartmentImg(ApartmentImg) {
    const schema = {
        apt_code: Joi.string().required(),
        img_path: Joi.string().required()
    }
}

exports.Apartment_Img = ApartmentImg;
exports.validate = validateApartmentImg;    