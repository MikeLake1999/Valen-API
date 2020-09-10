var express = require('express');
var router = express.Router();
var apartment = require('../../controllers/apartment_services.js');
const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
      cb(null, new Date().toDateString() + file.originalname)
  }
})
var upload = multer({ storage: storage })

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
router.post('/save', upload.array("multi-files", 20) ,  function(req, res) {
  
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