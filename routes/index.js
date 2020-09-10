const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const  {User}  = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
	return res.render('index.ejs', {"Success": ""});
});

router.get('/404', function (req, res, next) {
	return res.render('404.ejs');
});

router.get('/login', function (req, res, next) {
	return res.render('index.ejs', {"Success": ""});
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {
			bcrypt.compare(req.body.password, data.password, function (err, result) {
				if (result == true) {
					req.session.userId = data._id;
					res.redirect('/profile');
				} else {
					res.render('index.ejs',{ "Success": "Email không tồn tại hoặc mật khẩu sai!" });
				}
			  });
		} else {
			res.render('index.ejs',{ "Success": "Email không tồn tại hoặc mật khẩu sai!" });
		}
	});
});


router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ _id: req.session.userId }, function (err, data) {
		if (!data) {
			res.redirect('/login');
		} else {
			//console.log("found");
			return res.render('homepage.ejs', { "username": data.user_name, "useremail": data.email, page_name: 'homepage', "check": data.user_role.desc });
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
});



module.exports = router;