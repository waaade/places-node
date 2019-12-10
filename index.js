const express = require('express')
const request = require('request');
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


var sql = 'SELECT * FROM types';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/testServer', function(req, res){
    pool.query(sql, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(result.rows);
    })})
    .get('/search', (req, res) => res.render('pages/search'))
    .get('/seeall', function(req, res){
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
