/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 15:18:02
 * @LastEditTime : 2019-12-27 11:28:03
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserverc:\deao-fe2.0\ecosystem.config.js
 */
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'JsonWeb',
      script    : './server.js',
      watch     : true,
      env: {
       NODE_ENV : "development",
      },
      env_production : {
        NODE_ENV: 'production'
      },
      instances  : 2,
      exec_mode  : "cluster"
    },

  ]

};
