const Joi = require('joi');
const mongoose = require('mongoose');

function PriceCondition(code_condition) {
    var priceCondition = {}
    switch (code_condition) {
        case '01':
            priceCondition = { price: { $lte: 500000000 } }
            break;
        case '02':
            priceCondition = { price: { $gte: 500000000, $lte: 800000000 } }
            break;
        case '03':
            priceCondition = { price: { $gte: 800000000, $lte: 1000000000 } }
            break;
        case '04':
            priceCondition = { price: { $gte: 1000000000, $lte: 2000000000 } }
            break;
        case '05':
            priceCondition = { price: { $gte: 2000000000, $lte: 3000000000 } }
            break;
        case '06':
            priceCondition = { price: { $gte: 3000000000, $lte: 5000000000 } }
            break;
        case '07':
            priceCondition = { price: { $gte: 5000000000, $lte: 7000000000 } }
            break;
        case '08':
            priceCondition = { price: { $gte: 7000000000, $lte: 10000000000 } }
            break;
        case '09':
            priceCondition = { price: { $gte: 10000000000, $lte: 20000000000 } }
            break;
        case '10':
            priceCondition = { price: { $gte: 20000000000, $lte: 30000000000 } }
            break;
        case '11':
            priceCondition = { price: { $gte: 30000000000, $lte: 50000000000 } }
            break;
        case '12':
            priceCondition = { price: { $gte: 50000000000, $lte: 100000000000 } }
            break;
        case '13':
            priceCondition = { price: { $gte: 100000000000 } }
            break;
    }
    return priceCondition;
}

// Default ordering (sorting)
const  SortingValueDefault = {
    DESC: 'DESC',
    ASC: 'ASC'
}

// Default apartment
const StypeCodeDefault = {
    APARTMENT: '01',
    VILLA: '02'
}

exports.SortingValueDefault = SortingValueDefault;
exports.StypeCodeDefault = StypeCodeDefault;
exports.PriceCondition = PriceCondition;

