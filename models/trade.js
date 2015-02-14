var esClient = require('../bin/es_client');
var Promise = require('bluebird');

exports.save = function (trade) {

};

exports.groupByCurrencyFromAndTo = function () {
    return new Promise(function (resolve, reject) {
        var client = esClient.getClient();
        client.search({
            index: "trade-processor",
            type: "trade",
            body: {
                "size": 0,
                "aggs": {
                    "group_by_currencyFrom": {
                        "terms": {
                            "field": "currencyFrom"
                        }
                    },
                    "group_by_currencyTo": {
                        "terms": {
                            "field": "currencyTo"
                        }
                    },
                    "group_by_origin": {
                        "terms": {
                            "field": "originatingCountry"
                        }
                    },
                    "group_by_createdOn": {
                        "terms": {
                            "field": "createdOn"
                        }
                    }
                }
            }
        }).then(function (resp) {
                var currencyAggregation = {currencyFrom: resp.aggregations.group_by_currencyFrom.buckets,
                    currencyTo: resp.aggregations.group_by_currencyTo.buckets,
                    originCountry:resp.aggregations.group_by_origin.buckets,
                    createdOn:resp.aggregations.group_by_createdOn.buckets
                };
                resolve(currencyAggregation);
            }, function (err) {
                reject(err);
            });
    });

};