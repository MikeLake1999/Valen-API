//Module
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const { json } = require('express');
const app = express();
const ejs = require('ejs');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');

 // session 
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
 });
 
 app.use(session({
     secret: 'work hard',
     resave: true,
     saveUninitialized: false,
     store: new MongoStore({
       mongooseConnection: db
     })
   }));
//Congfig private key
const config = require('./config/default.json');


//Path Routes
const User_Role = require('./routes/user_role_service');
const User = require('./routes/user_service');
const Apartment = require('./routes/apartment_service');
const Apartment_Building = require('./routes/apartmet_building_service');
const Apartment_Booking = require('./routes/apartmet_booking_service');
const Search = require('./routes/search_service');
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

    // Views path
const Building = require('./routes/building/building_services');
const Booking = require('./routes/building/booking_services');
const Apartment_service = require('./routes/building/apartment_services');
const User_service = require('./routes/building/user_services');
const Role = require('./routes/building/role_services');
const index = require('./routes/index');
// View Engine
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('*/css',express.static('public/css'));
app.use('*/lib',express.static('public/lib'));
app.use('*/vendor',express.static('public/vendor'));
app.use('*/img',express.static('public/img'));
app.use('*/upload',express.static('upload'));
// Page
app.use('/', index);
app.use('/admin/building_service', Building);
app.use('/admin/apartment_service', Apartment_service);
app.use('/admin/user_service', User_service);
app.use('/admin/booking_service', Booking);
app.use('/admin/role_service', Role);
//Sử dụng API
app.use(express.json());
app.use('/api/user_role', User_Role);
app.use('/api/user', User);
app.use('/api/auth', Auth);
app.use('/api/apartment', Apartment);
app.use('/api/apartment_building', Apartment_Building);
app.use('/api/apartment_booking', Apartment_Booking);
app.use('/api/search', Search);

app.use('/api/upload',express.static('upload'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));