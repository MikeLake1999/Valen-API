var express = require('express');
var router = express.Router();
var apartment = require('../../controllers/apartment_services.js');
const multer = require('multer');
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage });
// Get all
router.get('/', function(req, res) {
  apartment.list(req, res);
});
// Get with ID
router.get('/:id', function(req, res) {
  apartment.show(req, res);
});
// Create
router.get('/create/:id', function(req, res) {
  apartment.create(req, res);
});
// Save
router.post('/save', uploadFiles.array("multi-files") ,  function(req, res) {
  
  apartment.save(req, res);
});
// Edit
router.get('/edit/:id', function(req, res) {
  apartment.edit(req, res);
});
// Edit update

router.post('/update/:id', uploadFiles.array("multi-files"), function(req, res) {
  apartment.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  apartment.delete(req, res);
});




module.exports = router; 