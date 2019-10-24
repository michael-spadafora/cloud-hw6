var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deposit', async function(req, res, next) {
  let filename = req.body.filename
  console.log(filename)
  console.log(req.body)

  const client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1'], 
    keyspace: 'hw6',
    localDataCenter: 'datacenter1'
  });

  let contents = req.files

  let query = 'INSERT INTO imgs (filename, contents)'
  let params = [filename, contents]

  try {
    await client.execute(query, params)
  } 
  catch (error) {
    console.log(error)
  }

  res.status(200)
});

router.get('/retrieve', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
