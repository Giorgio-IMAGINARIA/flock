var express = require('express');
var router = express.Router();
var environment = require('../environment.js');
process.env['API_ADDRESS'] = environment.apiAddress;

/* GET API Address. */
router.get('/', function(req, res, next) {
  var apiAddressJson = {
      apiAddress: process.env['API_ADDRESS']
  };
  res.json(apiAddressJson);
});

module.exports = router;
