const { Apartment, validate } = require('../models/apartment');
const { Apartment_Building } = require('../models/apartmet_building');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    }
})
var upload = multer({ storage: storage })

/*
    Lấy ra toàn bộ apartment.
*/
router.get('/', async (req, res) => {
    const apt = await Apartment.find().sort('name');
    res.send(apt);
});
/*
    Lấy ra toàn bộ nhà bán.
*/
router.get('/sell', async (req, res) => {
    const apt = await Apartment.find({stype: '0'}).sort('name');
    res.send(apt);
});
/*
    Lấy ra toàn bộ nhà thuê.
*/
router.get('/rent', async (req, res) => {
    const apt = await Apartment.find({stype: '1'}).sort('name');
    res.send(apt);
});

/*
    Lấy ra apartment theo id.
*/
router.get('/:id', async (req, res) => {
    const apt = await Apartment.findById(req.params.id);

    if (!apt) return res.status(404).send('The apartment with the given ID was not found.');
    res.send(apt);
});

/*
    Thêm mới apartment.
*/
router.post('/', [auth, admin_auth], upload.array('apartment_images', 20), async (req, res) => {
    if (!req.files) return res.status(404).send('Please upload a file.');
    var arrayFile = [];
    req.files.forEach((item, index) => {
        arrayFile.push(item.path)
    });
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Apartmet Building
    const apartmetBuilding = await Apartment_Building.findById(req.body.apartmet_building_id);
    if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');

    // Apartmet
    let apartment = new Apartment({
        apt_name: req.body.apt_name,
        address: req.body.address,
        rooms_count: req.body.rooms_count,
        bedrooms_count: req.body.bedrooms_count,
        bathrooms_count: req.body.bathrooms_count,
        area: req.body.area,
        area_builtin: req.body.area_builtin,
        elavator: req.body.elavator,
        direction: req.body.direction,
        price: req.body.price,
        price_rent: req.body.price_rent,
        apt_desc: req.body.apt_desc,
        apt_status: req.body.apt_status,
        stype_code: req.body.stype_code,
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
        apartment_img: arrayFile

    });
    apartment = await apartment.save();
    res.send(apartment);
});

/*
    Sửa đổi thông tin Apartmet
*/
router.put('/:id', [auth, admin_auth], upload.array('apartment_images', 20), async (req, res) => {
    if (!req.files) return res.status(404).send('Please upload a file.');
    var arrayFile = [];
    req.files.forEach((item, index) => {
        arrayFile.push(item.path)
    });
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Apartmet Building
    const apartmetBuilding = await Apartment_Building.findById(req.body.apartmet_building_id);
    if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');

    // Apartmet
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, {
        apt_name: req.body.apt_name,
        address: req.body.address,
        rooms_count: req.body.rooms_count,
        bedrooms_count: req.body.bedrooms_count,
        bathrooms_count: req.body.bathrooms_count,
        area: req.body.area,
        area_builtin: req.body.area_builtin,
        elavator: req.body.elavator,
        direction: req.body.direction,
        price: req.body.price,
        price_rent: req.body.price_rent,
        apt_desc: req.body.apt_desc,
        apt_status: req.body.apt_status,
        stype_code: req.body.stype_code,
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
        apartment_img: arrayFile,
        update_at: Date.now()
    }, { new: true, useFindAndModify: false });

    if (!apartment) return res.status(404).send('The apartment with the given ' + req.body.apt_name + ' was not found.');
    res.send(apartment);
});

/*
    Xóa toàn thông tin Apartmet theo ID
*/
router.delete('/:id', [auth, admin_auth], async (req, res) => {
    const apartment = await Apartment.findByIdAndRemove(req.params.id);

    if (!apartment) return res.status(404).send('The apartment with the given ID was not found.');
    res.send(apartment);
});

module.exports = router; 