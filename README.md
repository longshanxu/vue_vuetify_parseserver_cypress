<!--
 * @Author: Json.Xu
 * @Date: 2019-12-21 14:51:07
 * @LastEditTime: 2022-09-07 21:40:08
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\README.md
 -->
# VUE + VUE_Cli 4.0 + Vuetify UI + Express + ParseServer + Mongodb 
# Cypress + e2e + CodeCoverage 
> 基于vue-cli3 构建的 vue + express + Vuetify + ParseSever + Mongodb的集成开发的基础模板
> 同时集成了(E2E)端到端的测试和代码覆盖率测试


## Project setup
```
npm install 
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


### Run your end-to-end tests
```
npm run test:e2e
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


PS Technology stack:
VUE + VUE_Cli 4.0 + Vuetify UI + ParseServer + Mongodb 

### Getting Started
1. need install Mongodb or mongodb address (example: mongodb://localhost:27017/datacenter )
2. install Node (laster version) npm (laster version)
3. npm install -g @vue/cli 
4. npm install ( Open Project Folder)

### 启动服务 run Parse Server 
npm run dev  
Parse Server Address: http://localhost/parse (config in server.js)

### Dashboard Address
http://localhost/x
user: admin
pwd : admin

### Dev Demo with Postman 
http://localost/parse/functions/hello (need headers with Authentication and application)

### documents 
./documents ( mind map and others )


### cypress e2e 
npm run test:e2e 

### dev UI Address 
npm run serve 
http://localhost:90
为了和测试环境的server 不进行合并。开发环境的时候UI访问端口为90，支持热更新
测试环境的server的端口为80,发布到生产环境的时候，只需要发布UI，然后运行生产server就可以了
去掉了统一端口开发的配置文件。
