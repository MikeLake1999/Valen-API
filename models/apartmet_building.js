const Joi = require('joi');
const mongoose = require('mongoose');

const apartmentBuildingSchema = new mongoose.Schema({
    short_name: String,
    full_name: String,
    desc: String,
    address: String,
    phone_number: String,
    email: String,
    ceo_building: String,
    logo_img: String,
    updated_at: { type: Date, default: Date.now }
});

const Apartment_Building = mongoose.model('Apartment_Building', apartmentBuildingSchema);

function validateApartmentBuilding(ApartmentBuilding) {
    const schema = {
        short_name: Joi.string().trim().min(3).max(10).required(),
        full_name: Joi.string().trim().min(3).max(100).required(),
        address: Joi.string().min(3).max(100).required(),
        phone_number: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required(),
        ceo_building: Joi.string().min(3).max(100).required(),
        logo_img: Joi.string().required(),
    }
    return Joi.validate(ApartmentBuilding, schema, {allowUnknown:true});
}

exports.ApartmentBuildingSchema = apartmentBuildingSchema;
exports.Apartment_Building = Apartment_Building;
exports.validate = validateApartmentBuilding;