var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const formidable = require('formidable')
var util = require('util');
const streamToBlob = require('stream-to-blob')
 
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
    var fs = require('fs');
    // fs.rename(file.path, <targetPath>, function (err) { ... }); 
      
      

      // Send result on client
    
    let filename = fields.filename
    let contents = files.contents

    const stream = fs.createReadStream(contents)
    const blob = await streamToBlob(stream)


    const client = new cassandra.Client({ 
      contactPoints: ['127.0.0.1'], 
      keyspace: 'hw6',
      localDataCenter: 'datacenter1'
    });


    let query = 'INSERT INTO imgs (filename, contents)'
    let params = [filename, blob]

    try {
      await client.execute(query, params)
    } 
    catch (error) {
      console.log(error)
    }

    res.status(200)
  });

});

router.get('/retrieve', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
