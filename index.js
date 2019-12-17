const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


var testQuery = 'SELECT * FROM types';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/testServer', function(req, res){
    pool.query(testQuery, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(result.rows);
    })})
    .get('/search', (req, res) => res.render('pages/search')) //The search page
    .get('/submit', (req, res) => res.render('pages/submit')) //The submit page
    .get('/seeall', function(req, res){ //Get all the places
      pool.query('SELECT * FROM places', function(err, result) {
        if (err) {
          console.log("Error in query: ")
          console.log(err);
        }
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(result.rows); 
      })
    })
    .get('/searchbyname', function(req, res){
      var name = req.query.name;
      var sql = "SELECT * FROM places WHERE name ILIKE '" + name + "'";
      pool.query(sql, function(err, result) {
        if (err) {
          console.log("Error in query: ")
          console.log(err);
        }
        res.json(result.rows);
      })
    })
    .get('/searchbytype', function(req, res) {
      var type = req.query.type;
      var sql = "SELECT * FROM places WHERE places_type = (SELECT types_id FROM types WHERE name = '" + type + "')";
      pool.query(sql, function(err, result) {
        if (err) {
          console.log("Error in query: ");
          console.log(err);
        }
        res.json(result.rows);
      })
    })
    .get('/reviews', function(req, res){
      var place = req.query.id;
      var sql = "SELECT * FROM reviews WHERE place = '" + place + "'";
      pool.query(sql, function(err, result) {
        if (err) {
          console.log("Error in query: ")
          console.log(err);
        }
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(result.rows);
    })
    })
    .get('/addplace', function(req, res){
      var name = req.query.name;
      var type = req.query.type;
      var address = req.query.address;
      var phone = req.query.phone;
      pool.query(("SELECT types_id FROM types WHERE name = '" + type + "'"), function(err, result) {
        if (err) {
          console.log("Error in query: ")
          console.log(err);
        }
        type = result.rows[0].types_id;
        console.log(type);
        const sql = "INSERT INTO places(places_type, name, phone, address) VALUES ($1, $2, $3, $4)";
        const values = [type, name, phone, address];
        pool.query(sql, values, function(err, result) {
          if (err) {
            console.log("Error in query: ")
            console.log(err);
          }
          else {
            console.log("Yay");
          }
        }) 
      })
    })
    .get('/addreview', function(req, res){
      var score = req.query.score;
      var comment = req.query.comment;
      var user = 1;
      var place = req.query.placeid;
      const sql = "INSERT INTO reviews(place, reviews_user, score, comment) VALUES ($1, $2, $3, $4)";
      const values = [place, user, score, comment];
      pool.query(sql, values, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
          }
          else {
            console.log("Yay");
          } 
      })
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
