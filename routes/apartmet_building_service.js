const { Apartment_Building, validate } = require('../models/apartmet_building');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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
router.post('/', async (req, res) => {
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
        logo_img: req.body.logo_img
    });

    apartment_building = await apartment_building.save();
    res.send(apartment_building);
});

/*
    Chỉnh sửa apartment building.
*/
router.put('/:id', async (req, res) => {
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
        logo_img: req.body.logo_img
    }, { new: true });

    if (!apartment_building) return res.status(404).send('The apartment building with the given ' + req.body.apt_name + ' was not found.');
    res.send(apartment_building);
});

/*
    Xóa apartment building theo id.
*/
router.delete('/:id', async (req, res) => {
    const apartment_building = await Apartment_Building.findByIdAndRemove(req.params.id);

    if (!apartment_building) return res.status(404).send('The Apartment Building with the given '+ req.body.apt_name + 'was not found.');
    res.send(apartment_building);
});

module.exports = router; 