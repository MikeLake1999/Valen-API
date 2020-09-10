var express = require('express');
var router = express.Router();
var booking = require('../../controllers/booking_services.js');


// Get all
router.get('/', function(req, res) {
  booking.list(req, res);
});
// Update Salesman
router.post('/update/:id', function(req, res) {
  booking.update(req, res);
});
// Update
router.post('/apartment/:id', function(req, res) {
  booking.updateAPT(req, res);
});
// Edit
router.get('/show/:id', function(req, res) {
  booking.edit(req, res);
});
module.exports = router; 