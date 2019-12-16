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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
