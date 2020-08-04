
const { Apartment_Building } = require('../models/apartmet_building');
const { array } = require('joi');

var buildingController = {};

// show list building

buildingController.list = async(req, res) => {
    Apartment_Building.find({}).exec(function(err, building) {
        console.log(building);
        if (err){
            console.log("Error:", err);
        }else{
            res.render('../views/building/index', {building: building, page_name: 'building'});
        }
    });
};

  //  Lấy ra apartment building theo id.
buildingController.show = async (req, res) => {
    Apartment_Building.findOne({_id: req.params.id}).exec(function (err, building) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/building/show", {building: building, page_name: 'building'});
        }
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
        res.redirect("/building/building_service");
      }
    });
  };

  // Edit 
buildingController.edit = async(req, res) => {
    Apartment_Building.findOne({_id: req.params.id}).exec(function (err, building) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/building/edit", {building: building, page_name: 'building'});
      }
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
      res.redirect("/building/building_service");
    });
  };
module.exports = buildingController;