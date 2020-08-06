
const { Apartment } = require('../models/apartment');
const { Apartment_Building } = require('../models/apartmet_building');
const { array } = require('joi');

var apartmentController = {};

// show list apartment

apartmentController.list = async(req, res) => {
  new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')     // delete the dot and everything after
    Apartment.find({}).exec(function(err, apartment) {
        console.log(apartment);
        if (err){
            console.log("Error:", err);
        }else{
            res.render('../views/apartment/index', {apartment: apartment, page_name: 'apartment'});
        }
    });
};

  //  Lấy ra  apartment theo id.
apartmentController.show = async (req, res) => {
    Apartment.findOne({_id: req.params.id}).exec(function (err, apartment) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/apartment/show", {apartment: apartment, page_name: 'apartment'});
        }
      });
    };
// Create new 
apartmentController.create = async(req, res)=>{
    res.render("../views/apartment/create",{_id : req.params.id, page_name: 'building'});
  };
// Save new 
apartmentController.save = async(req, res) => {
 console.log(req.files);
  const apartmetBuilding = await Apartment_Building.findById(req.body.id);
  if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');


    var apartment = new Apartment({
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
      apartment_img: req.files
  });
  
    apartment.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/apartment/create");
      } else {
        console.log("Successfully to created!");
        res.redirect("/building/apartment_service");
      }
    });
  };

  // Edit 
apartmentController.edit = async(req, res) => {
    Apartment.findOne({_id: req.params.id}).exec(function (err, apartment) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/apartment/edit", {apartment: apartment, page_name: 'apartment'});
      }
    });
  };

  // Update 
apartmentController.update = async(req, res) => {
  const apartmetBuilding = await Apartment_Building.findById(req.body.id);
  if (!apartmetBuilding) return res.status(400).send('Invalid apartmet building.');
    Apartment.findByIdAndUpdate(req.params.id, { $set: {
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
        apartment_img: req.files
}}, { new: true }, function (err, apartment) {
      if (err) {
        console.log(err);
        res.render("../views/apartment/edit", {apartment: req.body, page_name: 'apartment'});
      }
      console.log("Successfully to edit!");
      res.redirect("/building/apartment_service");
    });
  };
module.exports = apartmentController;