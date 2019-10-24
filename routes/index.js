var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deposit', function(req, res, next) {
  let filename = req.body.filename
  console.log(filename)
  console.log(req.body)
  const client = new cassandra.Client({ 
    contactPoints: ['h1'], 
    keyspace: 'hw6' 
  });

  let contents = req.files

  let query = 'INSERT INTO imgs (filename, contents)'
  let params = [filename, contents]

  client.execute(query, params).then(
    res.send(200)
  )





  res.render('index', { title: 'Express' });
});

router.get('/retrieve', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
