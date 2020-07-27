//Module
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const { json } = require('express');
const app = express();

//Congfig private key
const config = require('./config/default.json');

//Path Routes
const User_Role = require('./routes/user_role_service');
const User = require('./routes/user_service');
const Apartment = require('./routes/apartment_service');
const Apartment_Building = require('./routes/apartmet_building_service');
const Apartment_Booking = require('./routes/apartmet_booking_service');
const Auth = require('./routes/auth');

//Kiểm tra lưu chữ bí mật trong biến môi trường jwtPrivateKey.
if (!config.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

//Kết nối database MongoDB.
mongoose.connect('mongodb://localhost/Apartment-Management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


//Sử dụng API
app.use(express.json());
app.use('/api/user_role', User_Role);
app.use('/api/user', User);
app.use('/api/auth', Auth);
app.use('/api/apartment', Apartment);
app.use('/api/apartment_building', Apartment_Building);
app.use('/api/apartment_booking', Apartment_Booking);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));