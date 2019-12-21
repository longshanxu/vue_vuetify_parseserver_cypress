/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 15:50:37
 * @LastEditTime: 2019-11-29 16:31:56
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify\server.js
 */
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const bodyParser = require('body-parser');
const compression = require('compression');



let serverUrl = 'http://localhost:1337/parse';

// judge databaseURI && serverURL

const deaoparseconfig = {
  appName: '给刘庆测试吹逼用',
  databaseURI: 'mongodb://localhost:27017/datacenter', // Connection string for your MongoDB database
  cloud: __dirname + '/main.js', // Absolute path to your Cloud Code
  verbose: false,
  logLevel:"ERROR",
  logsFolder: 'C:/logs',
  appId: 'myAppId',
  restAPIKey: 'myrestkey',
  javascriptKey:'myjskey',
  dotNetKey:'mydotNetKey',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: serverUrl, // Don't forget to change to https if needed
  maxUploadSize: '100mb',
  // liveQuery: {
  //   classNames: ['StudentSigns','TeacherRatingStudent'],
  //   redisURL: 'redis://h:DFzFC3Gk47mnjykT5EpQcRKawb+04kelOwCkm8kKIoY=@svdeao.redis.cache.chinacloudapi.cn:6379/5'
  // },
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000
}



//require('./src/server/parse_to_kue');

const app = express();
//console.log(app);
app.use(compression()); //use compression 
app.use(bodyParser.urlencoded({ extended: true, limit: '2048mb' }))
// app.use(bodyParser.json({ type: 'application/json' }));

const api = new ParseServer(deaoparseconfig);

app.use('/parse', api);

app
  .use(function respondError(err, req, res, next) {
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

// Listen

var httpServer = require('http').createServer(app);

httpServer.listen(1337, function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Server running on 127.0.0.1:%s', 1337);
});

// var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer,{
//   redisURL: 'redis://h:DFzFC3Gk47mnjykT5EpQcRKawb+04kelOwCkm8kKIoY=@svdeao.redis.cache.chinacloudapi.cn:6379/5'
// });
