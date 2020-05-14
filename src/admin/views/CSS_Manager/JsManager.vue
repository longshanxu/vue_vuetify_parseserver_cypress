<!--
 * @Author: Json.Xu
 * @Date: 2020-05-04 15:29:23
 * @LastEditTime: 2020-05-11 13:49:59
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\views\CSS_Manager\JsManager.vue
 -->
<template>
  <v-container class="pa-0" fluid style="height:100%">
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>构造函数模式</v-card-title>
          <code style="width:100%">
            <br />// This creates a new empty Object
            <br />
            var newObject = {};
            <br />// This creates a new empty Object
            <br />var newObject = Object.create(Object.prototype);
            <br />var newObject = newObject();
            <br />
          </code>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>原型模式</v-card-title>
          <code style="width:100%">
            <br />var myCar= {
            <br />name:"Ford Escort",
            <br />brake:function(){
            <br />console.log("Stop! I am applying brakes");
            <br />},
            <br />Panic : function (){
            <br />console.log ( "wait. how do you stop thuis thing?")
            <br />}
            <br />}
            <br />// use objec create to instansiate a new car
            <br />var yourCar= object.create(myCar);
            <br />//You can now see that one is a prototype of the other
            <br />console.log (yourCar.name);
          </code>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>模块设计模式</v-card-title>
          <code style="width:100%">
            <br />function AnimalContainter () {
            <br />const container = [];
            <br />
            function addAnimal (name) {container.push(name);}
            <br />
            function getAllAnimals() { return container;}
            <br />function removeAnimal(name) {
            <br />const index = container.indexOf(name);
            <br />
            if(index == -1) {throw new Error('Animal not found in container'); }
            <br />container.splice(index, 1)
            <br />}
            <br />return {
            <br />add: addAnimal,
            <br />get: getAllAnimals,
            <br />remove: removeAnimal
            <br />}
            <br />}
            <br />const container = AnimalContainter();
            <br />container.add('Hen');
            <br />container.add('Goat');
            <br />container.add('Sheep');
            <br />container.remove('Sheep')
          </code>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card-title>单例模式</v-card-title>
        <code style="width:100%">
          <br />function DatabaseConnection () {
          <br />let databaseInstance = null;
          <br />// tracks the number of instances created at a certain time
          <br />let count = 0;
          <br />function init() {
          <br />
          console.log(`Opening database #${count + 1}`);
          <br />//now perform operation
          <br />}
          <br />function createIntance() {
          <br />if(databaseInstance == null) {
          <br />databaseInstance = init();
          <br />}
          <br />return databaseInstance;
          <br />}
          <br />function closeIntance() {
          <br />console.log('closing database');
          <br />databaseInstance = null;
          <br />}
          <br />return {
          <br />open: createIntance,
          <br />close: closeIntance
          <br />}
          <br />}
          <br />const database = DatabseConnection();
          <br />database.open(); //Open database #1
          <br />database.open(); //Open database #1
          <br />database.open(); //Open database #1
          <br />database.close(); //close database
        </code>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>工厂模式</v-card-title>
          <code
            style="width:100%"
          >It is a creational concerned with the creation of objects without the need for a constructor. It provides a generic interface for creating objects, where we can specify the type of factory objects to be created. Therefore, we only specify the object and the factory instantiates and returns it for us to use. It is wise for us to use factory pattern when the object component set up has a high level of complexity and when we want to create different instances of objects easily depending on the environment we are in. We can also use factory pattern when working with many small objects sharing the same properties and when composing objects that need decoupling.</code>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>观察者模式</v-card-title>
          <code style="width:100%">
            <br/>function Observer() {
            <br/>     this.observerContainer = [];
             <br/>}
             <br/>Observer.prototype.subscribe = function (element) {
            <br/>     this.observerContainer.push(element);
            <br/> }
            <br/> // the following removes an element from the container
            <br/> Observer.prototype.unsubscribe = function (element) {
             <br/>    const elementIndex = this.observerContainer.indexOf(element);
             <br/>    if (elementIndex &gt; -1) {
             <br/>    this.observerContainer.splice(elementIndex, 1);
            <br/>     }
            <br/> }
            <br/> /**
           <br/>  * we notify elements added to the container by calling
           <br/>  * each subscribed components added to our container
            <br/> */
            <br/> Observer.prototype.notifyAll = function (element) {
            <br/>     this.observerContainer.forEach(function (observerElement) {
             <br/>    observerElement(element);
            <br/> });
            <br/> }
          </code>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <canvas id="canvas"></canvas>
      </v-col>
      <v-col cols="6">
         <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" version="1.1">
            <circle cx="200" cy="100" r="100" stroke="#afeedd" stroke-width="5" fill="#f0ddff" />
      </svg>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    // var newObject = {};
    // var newObject = Object.create(Object.prototype);
    // var newObject = newObject();
    // var myCar ={
    //     name:"mycar",
    //     brake:function(){
    //         console.log("brake");
    //     },
    //     panic:function(){
    //         console.log("panic");
    //     }
    // }
    // var yourCar = Object.create(myCar);
    // console.log(yourCar.name);
    // function AnimalContainter() {
    //   const container = [];
    //   function addAnimal(name) {
    //     container.push(name);
    //   }
    //   function removeAnimal(name) {
    //     const index = container.indexOf(name);
    //     if (index < 0) {
    //       throw new Error("Animal not found in container");
    //     }
    //     container.splice(index, 1);
    //   }
    //   function getAllAnimals() {
    //     return container;
    //   }
    //   return {
    //     add: addAnimal,
    //     get: getAllAnimals,
    //     remove: removeAnimal
    //   };
    // }
    // const test = AnimalContainter();
    // test.add("Hen");
    // test.add("Goat");
    // test.add("Sheep");
    // console.log(test.get());
    // test.remove("Sheep");
    // console.log(test.get());
    // function DatabaseConnection() {
    //   let databaseInstance = null;
    //   let count = 0;
    //   function init() {
    //     console.log(`Opening database ${count + 1}`);
    //   }
    //   function createIntance() {
    //     if (databaseInstance == null) {
    //       databaseInstance = init();
    //     }
    //     return databaseInstance;
    //   }
    //   function closeIntance() {
    //     console.log("close");
    //     databaseInstance = null;
    //   }
    //   return {
    //     open: createIntance,
    //     close: closeIntance
    //   };
    // }
    // const database = DatabaseConnection();
    // database.open(); //Open database #1
    // database.open(); //Open database #1
    // database.open(); //Open database #1
    // database.close(); //close database
    //     let DealerA = {};
    //     DealerA.title = function title() {
    //       return "Dealer A";
    //     };
    //     DealerA.pay = function pay(amount) {
    //       console.log(
    //         `set up configuration using username: ${this.username} and password: ${this.password}`
    //       );
    //       return `Payment for service ${amount} is successful using ${this.title()}`;
    //     };
    //     function DealerFactory(dealerOption, config = {}) {
    //       const dealer = Object.create(dealerOption);
    //       Object.assign(dealer, config);
    //       return dealer;
    //     }
    //     const dealerFactory = DealerFactory(DealerA, {
    //       username: "user",
    //       password: "pass"
    //     });
    //     console.log(dealerFactory.title());
    //     console.log(dealerFactory.pay(12));

    // function Observer(){
    //     this.observerContainer = [];
    // }
    // Observer.prototype.subscribe=function (element){
    //     this.observerContainer.push(element)
    // }
    // Observer.prototype.unsubscribe = function(element){
    //     const elementIndex = this.observerContainer.indexOf(element);
    //     if(elementIndex > -1){
    //         this.observerContainer.splice(elementIndex,1);
    //     }
    // }
    // Observer.prototype.notifyAll = function(element){
    //     this.observerContainer.forEach(function(observerElement){
    //         observerElement(element);
    //     })
    // }
    // var pro;

    // {
    //     var a = 123;
    //     pro = function pro(){
    //         console.log("6666"+a);
    //     };
    // }
    // a = 321;
    // pro()

    var canvas = document.getElementById("canvas");
    canvas.width=500;
    canvas.height=200;
    var ctx = canvas.getContext('2d');
    ctx.font ="30px Cursive";
    ctx.fillText("Hello Canvas",50,50);

    // console.time('response in');
    // alert('Click to continue');
    //  console.timeEnd('response in')



  }
};
</script>

<style lang="scss" scoped>
</style>

