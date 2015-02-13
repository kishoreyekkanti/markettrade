var ROOT_DIR = process.env.PWD;
var express = require('express');
var router = express.Router();
var tradeController = require(ROOT_DIR + '/controllers/trade_controller');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next){
    tradeController.save(req, res);
});
module.exports = router;
