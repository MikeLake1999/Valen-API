const { Apartmet_Booking } = require('../models/apartmet_booking');
const { Apartment } = require('../models/apartment');
const { User } = require('../models/user');
const { Apartment_Building } = require('../models/apartmet_building');
const { User_Role } = require('../models/user_role');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin');

const express = require('express');
const router = express.Router();


/*
    Lấy ra toàn bộ thông tin apartmet booking.
*/
router.get('/',[auth, admin_auth], async (req, res) => {
    const apt_booking = await Apartmet_Booking.find().sort('name');
    res.send(apt_booking);
});

/*
    Lấy ra apartmet booking theo id.
*/
router.get('/:id',auth, async (req, res) => {
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

    // User role
    const user_role = await User_Role.findById(user.user_role._id);
    if (!user_role) return res.status(400).send('Invalid user role!');

    // Apartmet
    let apartmet_booking = new Apartmet_Booking({
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
            user_role: {
                _id: user_role._id,
                role_code: user_role.role_code,
                desc: user_role.desc
            }
        },
        desc: req.body.desc
    });
    console.log(apartmet_booking);

    apartmet_booking = await apartmet_booking.save();
    res.send(apartmet_booking);
});

/*
    Xóa apartment booking theo id.
*/
router.delete('/:id', auth, async (req, res) => {
    const apartmetBooking = await Apartment_Building.findByIdAndRemove(req.params.id);

    if (!apartmetBooking) return res.status(404).send('The Apartment Building with the given ' + req.body.apt_name + 'was not found.');
    res.send(apartmetBooking);
});

module.exports = router; 