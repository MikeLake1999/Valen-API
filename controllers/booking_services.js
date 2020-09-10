const { Apartmet_Booking } = require('../models/apartmet_booking');
const { Apartment } = require('../models/apartment');
const { Apartment_Building } = require('../models/apartmet_building');
const { array } = require('joi');
const { User } = require('../models/user');
var moment = require('moment');
var bookingController = {};

// show list booking

bookingController.list = async(req, res) => {
Apartmet_Booking.find({}).exec(function(err, booking) {
  Apartment.find({}).exec(function(err, apartment) {
      User.findOne({ _id: req.session.userId }, function (err, data) { 
        console.log(booking);
        if (err){
            console.log("Error:", err);
        }else{
          if (data.user_role.desc != 'Admin' && data.user_role.desc != 'Salesman'){
            res.render('../views/404');
           
          }else{
            res.render('../views/booking/index', {apartment: apartment, booking: booking, page_name: 'booking', moment: moment, "username": data.user_name , "check" : data.user_role.desc});
          }
        }
      });
    });
    });
};
// Update 
bookingController.update = async(req, res) => {
 
    Apartmet_Booking.findByIdAndUpdate(req.params.id, { $set: {
        salesman: req.body.salesman
        // apartment_img: req.files
}}, { new: true }, function (err, booking) {
      if (err) {
        console.log(err);
        res.render("../views/booking/index");
      }
      console.log("Successfully to Get!");
      res.redirect("/admin/booking_service");
    });
  };


  bookingController.edit = async(req, res) => {
    Apartment.findOne({_id: req.params.id}).exec(function (err, apartment) {
      User.findOne({ _id: req.session.userId }, function (err, data) { 
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/booking/edit", {apartment: apartment, page_name: 'booking', "username": data.user_name , "check" : data.user_role.desc});
      }
    });
    });
  };

  // Update 
bookingController.updateAPT = async(req, res) => {
  const apartmetBuilding = await Apartment_Building.findById(req.body.id);
  if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');
    Apartment.findByIdAndUpdate(req.params.id, { $set: {
        apt_name: req.body.apt_name,
        address: req.body.address,
        rooms_count: req.body.rooms_count,
        bedrooms_count: req.body.bedrooms_count,
        bathrooms_count: req.body.bathrooms_count,
        area: req.body.area,
        furniture: req.body.furniture,
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
        // apartment_img: req.files
}}, { new: true }, function (err, apartment) {
      if (err) {
        console.log(err);
        res.render("../views/apartment/edit", {apartment: req.body, page_name: 'booking'});
      }
      console.log("Successfully to edit!");
      res.redirect("/admin/booking_service");
    });
  };

module.exports = bookingController;