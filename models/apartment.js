const Joi = require('joi');
const mongoose = require('mongoose');
const { ApartmentBuildingSchema } = require('./apartmet_building');


const apartmentSchema = new mongoose.Schema({
    apt_name: String,
    address: String,
    rooms_count: Number,
    bedrooms_count: Number,
    bathrooms_count: Number,
    area: Number,
    area_builtin: Number,
    elavator: Boolean,
    direction: String,
    price: Number,
    price_rent: Number,
    apt_desc: String,
    apt_status: Number,
    stype_code: Number,
    apartment_building: {
        type: ApartmentBuildingSchema,
        required: true
    },
    apartment_img: Array
});

const apartment = mongoose.model('Apartments', apartmentSchema);

function validateApartment(apartment) {
    const schema = Joi.object({
        apt_name: Joi.string().required(),
        address: Joi.string().required()
    });
    return Joi.validate(apartment, schema, {allowUnknown:true});
}
exports.ApartmentSchema = apartmentSchema;
exports.Apartment = apartment;
exports.validate = validateApartment;

