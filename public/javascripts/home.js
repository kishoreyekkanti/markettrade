$(document).ready(function () {
//    var ctx = $("#myChart")[0].getContext("2d");
//    new Chart(ctx).Pie(data,{});
    fetchCurrencyAggregation();
});

$(document).ajaxStart(function () {
    $(".ajaxMsg").text("Hold it tight we are analyzing and fetching data from backend..");
});
$(document).ajaxComplete(function () {
    $(".ajaxMsg").text("Here you go..! Below is a brief analysis of the trade");
    $(".main .text").show();
});
function getDataInChartFormat(currencyFrom) {
    var currencyColumns = [];
    $.each(currencyFrom, function (index) {
        var data = [currencyFrom[index].key, currencyFrom[index].doc_count];
        currencyColumns.push(data);
    });
    return currencyColumns;
}
function getDataInTimeSeriesFormat(creationData) {
    var columns = [];
    var x = ['x'];
    var data = [];
    $.each(creationData, function (index) {
        var yyyymmdd = creationData[index].key_as_string.substr(0, 8);
        x.push(yyyymmdd.substr(0, 4) + "-" + yyyymmdd.substr(4, 2) + "-" + yyyymmdd.substr(6, 2));
        data.push(creationData[index].doc_count);
    });
    columns.push(x);
    columns.push(data);
    return columns;
}
var fetchCurrencyAggregation = function () {
    $.getJSON("/trades/byCurrency", function (data) {
        var dataForCurrencyFrom = getDataInChartFormat(data.currencyFrom);
        var dataForCurrencyTo = getDataInChartFormat(data.currencyTo);
        var dataForOriginCountry = getDataInChartFormat(data.originCountry);
        var timeSeriesData = getDataInTimeSeriesFormat(data.createdOn);
        generateDonutChart("#currencyFromChart", dataForCurrencyFrom);
        generateDonutChart("#currencyToChart", dataForCurrencyTo);
        generateDonutChart("#originCountry", dataForOriginCountry);
        generateTimeSeriesChart("#createOn", timeSeriesData);
    });
};

var generateDonutChart = function (binder, columns) {
    var chart = c3.generate({
        bindto: binder,
        data: {
            columns: columns,
            type: 'donut'
        }
    });

};

var generateTimeSeriesChart = function (binder, columns) {
    var chart = c3.generate({
        bindto: binder,
        data: {
            x: 'x',
            columns: columns
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
};