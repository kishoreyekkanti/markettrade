This is a sample trade processing POC using node.js and elasticsearch. Messages can be posted to the endpoint
JSON can take the format of
{"userId": "134256", "currencyFrom": "EUR", "currencyTo": "GBP", "amountSell": 1000, "amountBuy": 747.10, "rate": 0.7471, "timePlaced" : "14-JAN-15 10:27:44", "originatingCountry" : "FR"}

Used Bluebird as a promise based framework. Haven't introduced cluster or forever as it is a small poc.

UI is rendered by using c3.js a wrapper on d3.js to generate some charts. Following are different graphs generated after
processing above data.

1. Donut chart based on number of requests sent to convert the currency from.

2. Donut chart based on number of requests sent to convert a currency to.

3. Trade break up by country of origin.

4. Number of requests sent on a daily basis.

Above application is deployed on heroku with name https://calm-hamlet-6251.herokuapp.com/trades. Because its hosted on
heroku with the default dynos, first request might take good amount of time to respond.

