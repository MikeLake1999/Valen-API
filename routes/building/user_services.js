var express = require('express');
var router = express.Router();
var user = require('../../controllers/user_services.js');


// Get all
router.get('/', function(req, res) {
  user.list(req, res);
});
// Get with ID
router.get('/:id', function(req, res) {
  user.show(req, res);
});
// Create
router.get('/create', function(req, res) {
  user.create(req, res);
});
//  Change Password
router.get('/password/:id', function(req, res) {
  user.password(req, res);
});
// Change Password
router.post('/savepass/:id', function(req, res) {
  user.savepass(req, res);
});
// Save
router.post('/save', function(req, res) {
  user.save(req, res);
});
// Edit
router.get('/edit/:id', function(req, res) {
  user.edit(req, res);
});
// Edit update

router.post('/update/:id', function(req, res) {
  user.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  user.delete(req, res);
});
module.exports = router; 