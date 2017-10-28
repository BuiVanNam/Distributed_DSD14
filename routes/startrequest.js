var express = require('express');
var addResToQueue = require('../controller/addResToQueue');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Phát triển phần mềm phân tán - DSD14',
        descriptions: 'Gửi request đến danh sách domain'
    });

    addResToQueue.addResToQueue();
    
});

module.exports = router;