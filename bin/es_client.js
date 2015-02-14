var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');
var app_logger = require("../logger/logger");
getEsClient = function(){
    app_logger.info("Trying to fetch es client for "+process.env.NODE_ENV);
    var host = process.env.NODE_ENV === "production"? "https://5bkexnn4:gzn0t5dus6y7js6q@smoke-5691776.us-east-1.bonsai.io": 'localhost:9200';
    return new elasticsearch.Client({
        host: host
    });
};

exports.save = function(doc, indexName, type){
    return new Promise(function(resolve, reject){
        getEsClient().index({
            index: indexName,
            type: type,
            requestTimeout: 5000000,
            body: doc
        }, function (error, response) {
            if(error){
                app_logger.error("Error in saving the doc ",error);
                reject(error);
            }else{
                app_logger.info("inserted trade hash ",doc);
                resolve("saved successfully");
            }
        });

    });

};

