const { User_Role, validate } = require('../models/user_role');
const { User } = require('../models/user');
const { array } = require('joi');
const _ = require('lodash');

var roleController = {};

// show list user

roleController.list = async(req, res) => {
  
    User_Role.find({}).exec(function(err, role) {
      
      User.findOne({ _id: req.session.userId }, function (err, data) {
        
        if (err){
            console.log("Error:", err);
        }else{
            if (data.user_role.desc == 'Admin'){
            res.render('../views/role/index', {page_name: 'role', "username": data.user_name, role: role, "check" : data.user_role.desc});
            }else {
              res.render('../views/404');
            }
        }
     
    });
    });
};

  //  Lấy ra apartment user theo id.
roleController.show = async (req, res) => {
    User_Role.findOne({_id: req.params.id}).exec(function (err, role) {
      User.findOne({ _id: req.session.userId }, function (err, data) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/role/show", {role: role, page_name: 'role', "username": data.user_name, "check" : data.user_role.desc});
        }
      });
      });
    };
// Create new 
roleController.create = async(req, res)=>{
    res.render("../views/role/create");
  };
// Save new 
roleController.save = async(req, res) => {

   //Validate thông tin register User từ Client. 
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   // User Role
   let user_role = new User_Role({
       role_code: req.body.role_code,
       desc: req.body.desc,
   });
  
   await user_role.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/role/create");
      } else {
        console.log("Successfully to created!");
        res.redirect("/admin/role_service");
      }
    });
  };

  // Edit 
roleController.edit = async(req, res) => {
  
    User_Role.findOne({_id: req.params.id}).exec(function (err, role) {
      User.findOne({ _id: req.session.userId }, function (err, data) {
       
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/role/edit", {page_name: 'role', "username": data.user_name, role: role , "check" : data.user_role.desc});
      }
    });
  })
   
  };

  // Update 
roleController.update = async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    User_Role.findByIdAndUpdate(req.params.id, { $set: {
        role_code: req.body.role_code,
        desc: req.body.desc,
}}, { new: true }, function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/role/edit");
      }
      console.log("Successfully to edit!");
      res.redirect("/admin/role_service");
    });
  };

   // Change Pass

module.exports = roleController;