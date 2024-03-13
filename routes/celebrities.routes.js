// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");



router.get("/create", (req, res) => {
        res.render("celebrities/new-celebrity");
      });

// POST route to handle form submission and create a new celebrity
router.post("/create", (req, res) => {
    try {
      // Create a new celebrity using data from the form
      const newCelebrity = await Celebrity.create(req.body);
      console.log("New celebrity created:", newCelebrity);
      // Redirect to a confirmation page or another appropriate route
      res.redirect("/celebrities");
    } catch (err) {
      console.error('Error creating new celebrity:', err);
      // Handle error appropriately, perhaps by rendering an error page
      res.status(500).send('Error creating new celebrity');
    }
  });

 // GET route to retrieve all celebrities
router.get('/', async (req, res) => {
    try {
      // Retrieve all celebrities from the database
      const celebrities = await Celebrity.find();
      // Render the celebrities view and pass the array of celebrities
      res.render('celebrities/celebrities', { celebrities });
    } catch (err) {
      // Handle error appropriately
      console.error('Error retrieving celebrities:', err);
      res.status(500).send('Error retrieving celebrities');
    }
  });

      module.exports = router;