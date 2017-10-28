var express = require('express');
var addDomainToQueue = require('../controller/addDomainToQueue');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Phát triển phần mềm phân tán - DSD14',
        descriptions: 'Thêm danh sách domain vào queue'
    });
    addDomainToQueue.addDomainToQueue();
});

module.exports = router;