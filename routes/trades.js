var ROOT_DIR = process.env.PWD;
var express = require('express');
var router = express.Router();
var tradeController = require('../controllers/trade_controller');
var app_logger = require("../logger/logger");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next){
    app_logger.info("Got request to save a trade");
    tradeController.save(req, res);
});
module.exports = router;
