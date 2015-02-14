var esClient = require('../bin/es_client');

var client = esClient.getClient();
console.log("got ES client");
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
            }
        }
    }
}).then(function (resp) {
        console.dir(resp.aggregations.group_by_currencyFrom.buckets);
        var hits = resp.hits.hits;
    }, function (err) {
        console.trace(err.message);
    });