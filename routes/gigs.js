  const express = require ('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
  .then(gigs => res.render('gigs', {
      gigs
    }))
  .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

//Add a gigs
router.post('/add', (req, res) => {
  let {title, technologies, budget, description, contact_email} = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add an email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
        budget = `$${budget}`;
    }

    // lowercase and Space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert to table
      Gig.create ({
        title,
        technologies,
        description,
        budget,
        contact_email
      })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

// search
router.get('/search', (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' }}})
  .then(gigs => res.render ('gigs', { gigs }))
  .catch(err => console.log(err));
});

module.exports = router;
