/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 15:50:37
 * @LastEditTime : 2019-12-27 13:03:10
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify\server.js
 */
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const bodyParser = require('body-parser');
const compression = require('compression');
//const Parse = require('parse/node');

const app = express();

let serverUrl = 'http://localhost:8632/parse';

const parseconfig = {
  appName: '来自天际的数据',
  databaseURI: 'mongodb://localhost:27017/datacenter', // Connection string for your MongoDB database
  cloud: __dirname + '/main.js', // Absolute path to your Cloud Code
  verbose: false,
  logLevel: "ERROR",
  logsFolder: 'C:/logs',
  appId: 'myAppId',
  javascriptKey: 'myjskey',
  masterKey: 'myMasterKey', // Keep this key secret!
  serverURL: serverUrl, // Don't forget to change to https if needed
  cacheTimeout: 60 * 600 * 1000,
  cluster:2,
  enableExpressErrorHandler:true,
  port:8632,
  mountPath:"/parse",
  masterKeyIps:["127.0.0.1"]
}


app.use(compression()); //use compression 

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '2048mb'
}))

// app.use(bodyParser.json({ type: 'application/json' }));

const api = new ParseServer(parseconfig);

app.use('/parse', api);

app.get('/get', (req, res) => res.send("Hello express!"));

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

var httpServer = require('http').createServer(app);

httpServer.listen(8632, function (err, result) {

  if (err) {
    console.log(err);
  }
  console.log('Server running on http://127.0.0.1:8632');
});