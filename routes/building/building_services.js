var express = require('express');
var router = express.Router();
var building = require('../../controllers/apartment_building_service.js');


// Get all
router.get('/', function(req, res) {
  building.list(req, res);
});
// Get with ID
router.get('/:id', function(req, res) {
  building.show(req, res);
});
// Create
router.get('/create', function(req, res) {
  building.create(req, res);
});
// Save
router.post('/save', function(req, res) {
  building.save(req, res);
});
// Edit
router.get('/edit/:id', function(req, res) {
  building.edit(req, res);
});
// Edit update

router.post('/update/:id', function(req, res) {
  building.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  building.delete(req, res);
});




module.exports = router; 