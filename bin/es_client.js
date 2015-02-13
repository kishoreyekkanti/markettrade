var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');
getEsClient = function(){
    return new elasticsearch.Client({
        host: 'localhost:9200'
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
                console.log(error);
                reject(error);
            }else{
                console.log("inserted trade hash "+doc);
                resolve("saved successfully");
            }
        });

    });

};

