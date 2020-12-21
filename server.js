/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 15:50:37
 * @LastEditTime: 2020-11-08 16:37:48
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server.js
 */
const express = require('express');
const serveIndex = require('serve-index');
const ParseServer = require('parse-server').ParseServer;
const bodyParser = require('body-parser');
const compression = require('compression');
const ParseDashboard = require('parse-dashboard');

// const history = require('connect-history-api-fallback');
//const Parse = require('parse/node');

const app = express();

const serverUrl = 'http://localhost:80/parse';

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

//console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);
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
//app.use(express.static('./dist'));

//app.use('/ftp', express.static('public/footballimg'), serveIndex('public/footballimg', {'icons': true}))

app.use(function (err, req, res, next) {
  // logic
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

//var httpServer = require('http').createServer(app);

app.listen(80, function (err) {

  if (err) {
    console.log(err);
  }
  console.log('Server running on http://localhost');
});