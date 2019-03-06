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
router.post('/', uploadCloud.array('photo'), (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  var pictures = []
  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      pictures.push(req.files[i].secure_url)
    }
  }
  let { title, rating, visibility, depth, description, location, date, diveType } = req.body

  location = location.split(",")

  // console.log(secureUrl, location)


  Dive.create({
    title,
    visibility,
    depth,
    description,
    location,
    rating,
    pictures,
    date,
    diveType
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
  Dive.findById(req.params.id)
    .then(dive => {
      res.json(dive);
    })
    .catch(err => next(err))
});

router.post('/edit-dive/:id', (req, res, next) => {
  Dive.findByIdAndUpdate(req.params.id, req.body)
    .then(dive => {
      console.log("Updated the dive!")
      res.json(dive);
    })
    .catch(err => next(err))
});

router.delete('/delete/:id', (req, res, next) => {
  Dive.findByIdAndDelete(req.params.id)
    .then(dive => {
      res.json("done")
      console.log("Deleted the dive")
    })
    .catch(err => next(err))
})


router.post('/favourite/:id', (req, res, next) => {
  Dive.findByIdAndUpdate(req.params.id, { favourite: true })
    .then(dive => {
      console.log("Favourite dive!")
      res.json(dive);
    })
    .catch(err => next(err))
})

router.get('/favouriteDives', (req, res, next) => {
  Dive.find({ favourite: true })
    .then(dives => {
      res.json(dives);
    })
    .catch(err => next(err))
})

module.exports = router;
