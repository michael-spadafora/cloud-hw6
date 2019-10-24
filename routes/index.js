var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deposit', function(req, res, next) {
  let filename = req.body.filename
  let contents = req.body.contents
  console.log(filename)


  res.render('index', { title: 'Express' });
});

router.get('/retrieve', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
