var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Phát triển phần mềm phân tán - DSD14',
    descriptions: 'Hello Cô Giang'
  });
});

module.exports = router;
