/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 15:50:37
 * @LastEditTime: 2020-02-26 10:27:17
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server.js
 */
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const bodyParser = require('body-parser');
const compression = require('compression');
const ParseDashboard = require('parse-dashboard');
// const history = require('connect-history-api-fallback');
//const Parse = require('parse/node');

const app = express();

const serverUrl = 'http://localhost/parse';

// console.log(__dirname);

const parseconfig = {
  appName: '来自天际的数据',
  databaseURI: 'mongodb://localhost:27017/datacenter', // Connection string for your MongoDB database
  cloud: './server/main.js', // Absolute path to your Cloud Code
  verbose: false,
  logLevel: "ERROR",
  logsFolder: 'C:/logs',
  appId: 'JsonApp',          //X-Parse-Application-Id headers key  
  javascriptKey: 'JsonKey',  //X-Parse-JavaScript-Key headers key
  restAPIKey: 'JsonRestKey',
  masterKey: 'JsonMasterKey', // Keep this key secret!
  serverURL: serverUrl, // Don't forget to change to https if needed
  cacheTimeout: 60 * 600 * 1000,
  cluster: 2,
  enableExpressErrorHandler: true
}

const options = {
  allowInsecureHTTP: false
};

const dashboardconfig = {
  "apps": [{
    "serverURL": serverUrl,
    "appId": "JsonApp",
    "masterKey": "JsonMasterKey",
    "appName": "APP",
  }],
  "users": [{
    "user": "admin",
    "pass": "admin"
  }]
}



app.use(compression()); //use compression 

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '2048mb'
}))

//app.use(history());

// app.use(bodyParser.json({ type: 'application/json' }));

const api = new ParseServer(parseconfig);
const dashboard = new ParseDashboard(dashboardconfig, options);

app.get('/gettest', (req, res) => res.send("Hello express!"));

app.use('/parse', api);

app.use('/dashboard', dashboard);

app.use(express.static('./dist'));

app.use(function respondError(err, req, res, next) {
  console.log('500');
  var status,
    errmsg;
  status = err.status || 500;
  res.status(status);
  errmsg = err.message || 'oo there was a problem!';

  if (req.method === 'GET') {
    res
      .status('500')
      .send('服务器错误：' + errmsg)
  } else {
    res
      .type('txt')
      .send(errmsg + '\n');
  }
});

//var httpServer = require('http').createServer(app);

app.listen(80, function (err, result) {

  if (err) {
    console.log(err);
  }
  console.log('Server running on http://localhost');
});