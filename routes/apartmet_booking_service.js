const { Apartmet_Booking } = require('../models/apartmet_booking');
const { Apartment } = require('../models/apartment');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


/*
    Lấy ra toàn bộ thông tin apartmet booking.
*/
router.get('/', async (req, res) => {
    const apt_booking = await Apartmet_Booking.find().sort('name');
    res.send(apt_booking);
});

/*
    Lấy ra apartmet booking theo id.
*/
router.get('/:id', async (req, res) => {
    const apt_booking = await Apartmet_Booking.findById(req.params.id);

    if (!apt_booking) return res.status(404).send('The apartmet booking with the given ID was not found.');
    res.send(apt_booking);
});

/*
    Thêm mới apartment booking.
*/
router.post('/', auth, async (req, res) => {

    // Apartmet
    const apartment = await Apartment.findById(req.body.apartmet_id);
    if (!apartment) return res.status(400).send('Invalid apartmet!');

    // Apartmet Building
    const apartmetBuilding = await Apartment_Building.findById(apartment.apartment_building._id);
    if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');

    // User
    const user = await User.findById(req.body.user_id).select('-password');
    if (!user) return res.status(400).send('Invalid user!');

    // Apartmet
    let apartmetBooking = new Apartmet_Booking({
        apartment: {
            apt_name: apartment.apt_name,
            address: apartment.address,
            rooms_count: apartment.rooms_count,
            bedrooms_count: apartment.bedrooms_count,
            bathrooms_count: apartment.bathrooms_count,
            area: apartment.area,
            area_builtin: apartment.area_builtin,
            elavator: apartment.elavator,
            direction: apartment.direction,
            price: apartment.price,
            price_rent: apartment.price_rent,
            apt_desc: apartment.apt_desc,
            apt_status: apartment.apt_status,
            stype_code: apartment.stype_code,
            apartment_building: {
                _id: apartmetBuilding._id,
                short_name: apartmetBuilding.short_name,
                full_name: apartmetBuilding.full_name,
                desc: apartmetBuilding.desc,
                address: apartmetBuilding.address,
                phone_number: apartmetBuilding.phone_number,
                email: apartmetBuilding.email,
                ceo_building: apartmetBuilding.ceo_building,
                logo_img: apartmetBuilding.logo_img
            },
            apartment_img: apartment.apartment_img
        },
        user: {
            _id: user._id,
            user_name: user.user_name,
            email: user.email,
            full_name: user.full_name,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            phone_number: user.phone_number,
        },
        desc: req.body.desc
    });

    apartmetBooking = await Apartmet_Booking.save();
    res.send(apartmetBooking);
});

/*
    Xóa apartment booking theo id.
*/
router.delete('/:id', async (req, res) => {
    const apartmetBooking = await Apartment_Building.findByIdAndRemove(req.params.id);

    if (!apartmetBooking) return res.status(404).send('The Apartment Building with the given ' + req.body.apt_name + 'was not found.');
    res.send(apartmetBooking);
});

module.exports = router; 