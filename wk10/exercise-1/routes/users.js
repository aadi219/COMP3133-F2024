const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  console.log('First Name: ' + req.body.firstname);
  console.log('Last Name: ' + req.body.lastname);
  res.send('POST Received');
})

router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;

