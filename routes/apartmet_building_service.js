const { Apartment_Building, validate } = require('../models/apartmet_building');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true)
    else
        cb({ message: 'Unsupported File Format' }, false)
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


/*
    Lấy ra toàn bộ apartment building.
*/
router.get('/', async (req, res) => {
    const apt_building = await Apartment_Building.find().sort('name');
    res.send(apt_building);
});

/*
    Lấy ra apartment building theo id.
*/
router.get('/:id', async (req, res) => {
    const apt_building = await Apartment_Building.findById(req.params.id);

    if (!apt_building) return res.status(404).send('The apartmet building with the given ID was not found.');
    res.send(apt_building);
});

/*
    Thêm mới apartment building.
*/
router.post('/', [auth, admin_auth], upload.single('logo_img'), async (req, res) => {
    console.log(req.file)
    // check if a logo img file exists
    if (!req.file) return res.status(404).send('Please upload a logo image file.');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Apartmet Building
    let apartment_building = new Apartment_Building({
        short_name: req.body.short_name,
        full_name: req.body.full_name,
        desc: req.body.desc,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        ceo_building: req.body.ceo_building,
        logo_img: req.file.path
    });

    apartment_building = await apartment_building.save();
    res.send(apartment_building);
});

/*
    Chỉnh sửa apartment building.
*/
router.put('/:id', [auth, admin_auth], upload.single('logo_img'), async (req, res) => {
    console.log(req.file)
    // check if a logo img file exists
    if (!req.file) return res.status(404).send('Please upload a logo image file.');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Apartmet Building
    const apartment_building = await Apartment_Building.findByIdAndUpdate(req.params.id, {
        short_name: req.body.short_name,
        full_name: req.body.full_name,
        desc: req.body.desc,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        ceo_building: req.body.ceo_building,
        logo_img: req.file.path,
        update_at: Date.now()
    }, { new: true });

    if (!apartment_building) return res.status(404).send('The apartment building with the given ' + req.body.apt_name + ' was not found.');

    res.send(apartment_building);
});

/*
    Xóa apartment building theo id.
*/
router.delete('/:id', [auth, admin_auth], async (req, res) => {
    const apartment_building = await Apartment_Building.findByIdAndRemove(req.params.id);

    if (!apartment_building) return res.status(404).send('The Apartment Building with the given ' + req.body.apt_name + 'was not found.');
    res.send(apartment_building);
});

module.exports = router;