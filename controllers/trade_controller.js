var trade = require('../models/trade');
var esClient = require('../bin/es_client');
var app_logger = require("../logger/logger");
exports.save = function (req, res) {
    var tradeHash = req.body;
    app_logger.info("request for saving ", tradeHash);
    esClient.save(tradeHash, "trade-processor", "trade")
        .then(function (success) {
            res.send(success);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
};

exports.groupByCurrency = function (req, res) {
    trade.groupByCurrencyFromAndTo().then(function (esRes) {
        res.json(esRes);
    }).catch(function (err) {
            console.log(err);
        });
};