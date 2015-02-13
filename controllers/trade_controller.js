var trade = require('../models/trade');
var esClient = require('../bin/es_client');
exports.save = function (req, res) {
    var tradeHash = req.body;
    esClient.save(tradeHash, "trade-processor", "trade")
        .then(function (success) {
            res.send(success);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
};