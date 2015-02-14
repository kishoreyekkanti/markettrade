var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');
var app_logger = require("../logger/logger");
var moment = require("moment");

var getEsClient = function(){
    app_logger.info("Trying to fetch es client for "+process.env.NODE_ENV || 'localhost:9200');
    var host = process.env.NODE_ENV === "production"? process.env.BONSAI_URL: 'localhost:9200';
    console.log("HOST"+host);
    return new elasticsearch.Client({
        host: host
    });
};
exports.getClient = getEsClient;
exports.save = function(doc, indexName, type){
    return new Promise(function(resolve, reject){
        if(doc.timePlaced){
            doc.createdOn = moment(doc.timePlaced, "DD-MMMM-YY HH:mm:ss").format("YYYYMMDD");
        }
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

