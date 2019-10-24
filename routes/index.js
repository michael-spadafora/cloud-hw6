var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const formidable = require('formidable')
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deposit', async function(req, res, next) {

  var form = new formidable.IncomingForm();

  form.parse(req, async function(err, fields, files) {
    if (err)
      console.log(err)
    // Copy file from temporary place
    // var fs = require('fs');
    // fs.rename(file.path, <targetPath>, function (err) { ... }); 
      
      

      // Send result on client
    res.end(util.inspect({fields: fields, files: files}));
    
    console.log(files)


    let filename = fields.filename
    let contents = files

    const client = new cassandra.Client({ 
      contactPoints: ['127.0.0.1'], 
      keyspace: 'hw6',
      localDataCenter: 'datacenter1'
    });


    let query = 'INSERT INTO imgs (filename, contents)'
    let params = [filename, contents]

    try {
      await client.execute(query, params)
    } 
    catch (error) {
      console.log("cassandra sucks")
    }

    res.status(200)
  });

});

router.get('/retrieve', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
