
const { Apartment_Building } = require('../models/apartmet_building');
const { array, date } = require('joi');
const { User } = require('../models/user');
var buildingController = {};

// show list building

buildingController.list = async(req, res) => {
  
    Apartment_Building.find({}).exec(function(err, building) {
      User.findOne({ _id: req.session.userId }, function (err, data) { 
        console.log(building);
        if (err){
            console.log("Error:", err);
        }else{
          if (data.user_role.desc != 'Admin' && data.user_role.desc != 'Marketing'){
            res.render('../views/404');
            
          }else{
            res.render('../views/building/index', {building: building, page_name: 'building', "username" : data.user_name , "check" : data.user_role.desc});
          }
        }
      });
    });
};

  //  Lấy ra apartment building theo id.
buildingController.show = async (req, res) => {
    Apartment_Building.findOne({_id: req.params.id}).exec(function (err, building) {
      User.findOne({ _id: req.session.userId }, function (err, data) { 
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/building/show", {building: building, page_name: 'building', "username": data.user_name , "check" : data.user_role.desc});
        }
      });
      });
    };
// Create new 
buildingController.create = async(req, res)=>{
    res.render("../views/building/create");
  };
// Save new 
buildingController.save = async(req, res) => {
    var building = new Apartment_Building(req.body);
  
    building.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/building/create");
      } else {
        console.log("Successfully to created!");
        res.redirect("/admin/building_service");
      }
    });
  };

  // Edit 
buildingController.edit = async(req, res) => {
    Apartment_Building.findOne({_id: req.params.id}).exec(function (err, building) {
      User.findOne({ _id: req.session.userId }, function (err, data) { 
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/building/edit", {building: building, page_name: 'building', "username" : data.user_name , "check" : data.user_role.desc});
      }
    });
    });
  };

  // Update 
buildingController.update = async(req, res) => {
    Apartment_Building.findByIdAndUpdate(req.params.id, { $set: {
        short_name: req.body.short_name,
       full_name: req.body.full_name,
       desc: req.body.desc,
       address: req.body.address,
       phone_number: req.body.phone_number,
       email: req.body.email,
       ceo_building: req.body.ceo_building,
       logo_img: req.body.logo_img
}}, { new: true }, function (err, building) {
      if (err) {
        console.log(err);
        res.render("../views/building/edit", {building: req.body, page_name: 'building'});
      }
      console.log("Successfully to edit!");
      res.redirect("/admin/building_service");
    });
  };
module.exports = buildingController;