const Joi = require('joi');
const mongoose = require('mongoose');
const { UserSchema } = require('./user');
const { ApartmentSchema } = require('./apartment');

const ApartmentBooking = mongoose.model('Apartment_Booking', new mongoose.Schema({
    apartment: {
        type: ApartmentSchema,
        required: true
    },
    user: {
        type: UserSchema,
        required: true
    },
    salesman: String,
    desc: String,
    create_at: {
        type: Date,
        default: Date.now
    },
}));

exports.Apartmet_Booking = ApartmentBooking;