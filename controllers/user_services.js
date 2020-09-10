const { User_Role } = require('../models/user_role');
const { User, validate } = require('../models/user');
const { array } = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const moment = require('moment');

var userController = {};

// show list user

userController.list = async(req, res) => {
  
    User.find({}).exec(function(err, user) {
      User_Role.find({}).exec(function(err, role) {
      User.findOne({ _id: req.session.userId }, function (err, data) {
        console.log(user);
        if (err){
            console.log("Error:", err);
        }else{
            if (data.user_role.desc == 'Admin'){
            res.render('../views/user/index', {user: user, page_name: 'user', moment: moment, "username": data.user_name, role: role, "check" : data.user_role.desc});
            }else {
              res.render('../views/404');
            }
        }
      });
    });
    });
};

// Create new 
userController.create = async(req, res)=>{
    res.render("../views/user/create");
  };
// Save new 
userController.save = async(req, res) => {

   //Validate thông tin register User từ Client. 
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //Kiểm tra sự tồn tại của email.
   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send('User already registered.');
   const user_role = await User_Role.findById(req.body.user_role_id);
   if (!user_role) return res.status(400).send('Invalid user role!');

   const salt = await bcrypt.genSalt(10);
    // Auto-gen a salt và hash
    const password_hash = await bcrypt.hash(req.body.password, salt);
    //Tạo một mảng dữ liệu được truyển từ client đã có bằng cách lấy ra các properties đã được xác định.
    //user = new User(_.pick(req.body, ['user_name', 'email', 'password', 'full_name', 'date_of_birth', 'gender', 'phone_number', 'role_type']))
    user = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: password_hash,
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        user_role: {
            _id: user_role._id,
            role_code: user_role.role_code,
            desc: user_role.desc
        }
    });
  
   await user.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/user/create");
      } else {
        console.log("Successfully to created!");
        res.redirect("/admin/user_service");
      }
    });
  };

  // Edit 
userController.edit = async(req, res) => {
  
    User.findOne({_id: req.params.id}).exec(function (err, user) {
      User.findOne({ _id: req.session.userId }, function (err, data) {
        User_Role.find({}).exec(function(err, role) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/user/edit", {user: user, page_name: 'user', moment: moment, "username": data.user_name, role: role , "check" : data.user_role.desc});
      }
    });
  })
    });
  };

  // Update 
userController.update = async(req, res) => {
  const user_role = await User_Role.findById(req.body.user_role_id);
   if (!user_role) return res.status(400).send('Invalid user role!');
    User.findByIdAndUpdate(req.params.id, { $set: {
        user_name: req.body.user_name,
       full_name: req.body.full_name,
       date_of_birth: req.body.date_of_birth,
       gender: req.body.gender,
       phone_number: req.body.phone_number,
       user_role: {
        _id: user_role._id,
        role_code: user_role.role_code,
        desc: user_role.desc
    }
}}, { new: true }, function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/user/edit", {user: req.body, page_name: 'user'});
      }
      console.log("Successfully to edit!");
      res.redirect("/admin/user_service");
    });
  };

   // Change Pass
userController.password = async(req, res) => {
  
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    User.findOne({ _id: req.session.userId }, function (err, data) {
      User_Role.find({}).exec(function(err, role) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/user/show", {user: user, page_name: 'user', moment: moment, "username": data.user_name, role: role , "check" : data.user_role.desc});
    }
  });
})
  });
};

// Update 
userController.savepass = async(req, res) => {
  if (req.body.password == req.body.passwordConf) {
  const salt = await bcrypt.genSalt(10);
   password1 = await bcrypt.hash(req.body.password, salt);


    User.findByIdAndUpdate(req.params.id, { $set: {
       password: password1,
       
}}, { new: true }, function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/user/edit", {user: req.body, page_name: 'user'});
      }
      res.redirect("/admin/user_service");
    });
}else{
  res.send({ "Success": "Password Không Trùng!" });
  // res.render("../views/user/show", {"Success": "Password does not matched! Both Password should be same."});
}};
module.exports = userController;