var express = require('express');
var router = express.Router();
var role = require('../../controllers/role_services.js');


// Get all
router.get('/', function(req, res) {
  role.list(req, res);
});
// Get with ID
router.get('/:id', function(req, res) {
  role.show(req, res);
});
// Create
router.get('/create', function(req, res) {
  role.create(req, res);
});
// Save
router.post('/save', function(req, res) {
  role.save(req, res);
});
// Edit
router.get('/edit/:id', function(req, res) {
  role.edit(req, res);
});
// Edit update

router.post('/update/:id', function(req, res) {
  role.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  role.delete(req, res);
});




module.exports = router; 