const express = require ('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

//Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
  .then(gigs => {
    res.render('gigs', {
      gigs
    });
  })
  .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

//Add a gigs
router.post('/add', (req, res) => {
  const data = {
    title: 'Netlify Expert',
    technologies: 'javascript',
    budget: '$3000',
    description: ' mantappppppppppppp hehehehe',
    contact_email: 'user@gmail.com'
  }

  let {title, technologies, budget, description, contact_email} = data;

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
});

module.exports = router;
