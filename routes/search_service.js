const { Apartment } = require('../models/apartment');
const Common_List = require('../middleware/commons');
const Apartment_Stype = require('../config/apartment_stype_list.json');
const Price_Stype = require('../config/price_list.json');
const Sorting_Stype = require('../config/sorting_type.json');
const express = require('express');
const router = express.Router();

/*
    Searching, finding, sorting all value.
*/
router.get('/', async (req, res) => {
    var sortValue = {};
    var findValue = {};
    var orFindValue = [];

    //Apartment name and address Lookup
    if (req.body.search_all_value != 'undefined' && req.body.search_all_value != null) {
        orFindValue.push({ "address": new RegExp(req.body.search_all_value, 'i') });
        orFindValue.push({ "apt_name": new RegExp(req.body.search_all_value, 'i') });
        orFindValue.push({ "apartment_building.full_name": new RegExp(req.body.search_all_value, 'i') });
        orFindValue.push({ "apartment_building.short_name": new RegExp(req.body.search_all_value, 'i') });
    }
    //Apartment type: APARTMENT: '01', VILLA: '02'
    if (req.body.stype_code != 'undefined' && req.body.stype_code != null &&
         (req.body.stype_code == Common_List.StypeCodeDefault.APARTMENT ||
          req.body.stype_code == Common_List.StypeCodeDefault.VILLA)) {
        Object.assign(findValue, { stype_code: { $eq: req.body.stype_code } });
    }
    //Price apartment BETWEEN minimum_price and maximum_prices
    if (req.body.price_condition != 'undefined' && req.body.price_condition != null) {
        if (req.body.price_condition.minimum_prices != 'undefined' && req.body.price_condition.minimum_prices != null &&
            req.body.price_condition.maximum_prices != 'undefined' && req.body.price_condition.maximum_prices != null) {
            Object.assign(findValue, { price: {
                 $gte: req.body.price_condition.minimum_prices,
                 $lte: req.body.price_condition.maximum_prices } });
        }
    }
    //Count the Bedrooms
    if (req.body.bedrooms_count != 'undefined' && req.body.bedrooms_count != null) {
        Object.assign(findValue, { bedrooms_count: { $eq: req.body.bedrooms_count } });
    }


    //Apartment Sorting 
    // Apartment name sorting : A - Z || Z - A
    if (req.body.sort_apt_name != 'undefined' && req.body.sort_apt_name != null && req.body.sort_apt_name == Common_List.SortingValueDefault.DESC) {
        Object.assign(sortValue, { apt_name: -1 });
    }
    else {
        Object.assign(sortValue, { apt_name: 1 });
    }
    //Price sort
    if (req.body.sort_price != 'undefined' && req.body.sort_price != null && req.body.sort_price == Common_List.SortingValueDefault.DESC) {
        Object.assign(sortValue, { price: -1 });
    }
    else {
        Object.assign(sortValue, { price: 1 });
    }
    //New||Old
    if (req.body.sort_date != 'undefined' && req.body.sort_date != null && req.body.sort_date == Common_List.SortingValueDefault.DESC) {
        Object.assign(sortValue, { create_at: -1 });
    }
    else {
        Object.assign(sortValue, { create_at: 1 });
    }

    //Pagination
    var pageNumber = parseInt(req.query.pageNumber);
    var pageSize = parseInt(req.query.pageSize);

    //Results
    let apartment = await Apartment
        .find(findValue)
        .or(orFindValue)
        .sort(sortValue)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)

    res.send(apartment);
});


/*
    Filter drop down menu
*/
router.get('/filter', async (req, res) => {
    const filter = {
        apartment_stype: Apartment_Stype,
        price_stype: Price_Stype,
        sorting_stype: Sorting_Stype
    }
    res.send(filter);
});

module.exports = router; 