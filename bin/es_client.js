var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');
getEsClient = function(){
    console.log(process.env.NODE_ENV);
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
                console.log(error);
                reject(error);
            }else{
                console.log("inserted trade hash "+doc);
                resolve("saved successfully");
            }
        });

    });

};

