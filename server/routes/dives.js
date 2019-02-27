const express = require('express');
const Dive = require('../models/Dive')

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
router.post('/', (req, res, next) => {
  let { title, visibility, depth, description } = req.body
  Dive.create({ title, visibility, depth, description })
    .then(dive => {
      res.json({
        success: true,
        dive
      });
    })
    .catch(err => next(err))
});

module.exports = router;
