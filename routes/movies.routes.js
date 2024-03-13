// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// routes/movies.routes.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// GET route to render the form to add a new movie
router.get('/new', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('movies/new-movie', { celebrities });
    } catch (err) {
      console.error('Error retrieving celebrities:', err);
      res.status(500).send('Error retrieving celebrities');
    }
  });

// POST route to handle form submission and create a new movie
router.post('/create', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      const newMovie = await Movie.create({ title, genre, plot, cast });
      console.log('New movie created:', newMovie);
      res.redirect('/movies'); // Redirect to the page with the list of all movies
    } catch (err) {
      console.error('Error creating new movie:', err);
      res.status(500).send('Error creating new movie');
    }
  });

// GET route to display details of a specific movie
router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate('cast');
      res.render('movies/movie-details', { movie });
    } catch (err) {
      console.error('Error retrieving movie details:', err);
      res.status(500).send('Error retrieving movie details');
    }
  });

  // POST route to delete a specific movie
router.post('/:id/delete', async (req, res) => {
    try {
      await Movie.findByIdAndRemove(req.params.id);
      res.redirect('/movies'); // Redirect to the list of movies page
    } catch (err) {
      console.error('Error deleting movie:', err);
      res.status(500).send('Error deleting movie');
    }
  });


// GET route to render the form to edit an existing movie
router.get('/:id/edit', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render('movies/edit-movie', { movie, celebrities });
  } catch (err) {
    console.error('Error retrieving movie details for editing:', err);
    res.status(500).send('Error retrieving movie details for editing');
  }
});

// routes/movies.routes.js

// POST route to update an existing movie
router.post('/:id', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
      res.redirect(`/movies/${req.params.id}`);
    } catch (err) {
      console.error('Error updating movie:', err);
      res.status(500).send('Error updating movie');
    }
  });
  
  module.exports = router;
  

module.exports = router;
