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
    area_builtin: String,
    stype: Number,
    furniture: String,
    elavator: Number,
    direction: String,
    price: String,
    price_rent: String,
    apt_desc: String,
    apt_status: Number,
    stype_code: String,
    apartment_building: {
        type: ApartmentBuildingSchema,
        required: true
    },
    apartment_img: Array,
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: Date
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

