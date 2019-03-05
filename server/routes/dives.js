const express = require('express');
const Dive = require('../models/Dive')
const uploadCloud = require('../configs/cloudinary.js');

const router = express.Router();

// Route to get all dives
router.get('/', (req, res, next) => {
  Dive.find()
    .then(dives => {
      res.json(dives);
    })
    .catch(err => next(err))
});



// Route to add a dive
router.post('/', uploadCloud.single('photo'), (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  var mainPicture = ""
  if (req.file) {
    const secureUrl = req.file.secure_url;
    mainPicture = secureUrl
  }
  let { title, rating, visibility, depth, description, location } = req.body

  location = location.split(",")

  // console.log(secureUrl, location)


  Dive.create({
    title,
    visibility,
    depth,
    description,
    location,
    rating,
    mainPicture
  })
    .then(dive => {
      res.json({
        success: true,
        dive
      });
    })
    .catch(err => next(err))
});

router.get('/dive/:id', (req, res, next) => {
  Dive.findElement()
    .then(dives => {
      res.json(dives);
    })
    .catch(err => next(err))
});

module.exports = router;
