var express = require('express');
var router = express.Router();
// send all requests to index.html so browserHistory in React Router works
router.get('/', function(req, res, next) {
  var dirName = __dirname;
  dirName = dirName.replace('/routes', '');
  res.sendFile(dirName + '/build/' + 'index.html');
});

module.exports = router;
