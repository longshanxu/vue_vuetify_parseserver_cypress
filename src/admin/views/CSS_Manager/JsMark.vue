<!--
 * @Author: Json.Xu
 * @Date: 2020-05-11 13:49:32
 * @LastEditTime: 2020-05-14 14:50:06
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\views\CSS_Manager\JsMark.vue
 -->
<template>
  <v-container class="pa-0" fluid style="height:100%">
    <v-row>
      <v-col cols="6">请打开开发者工具(F12)</v-col>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    console.time("Loop time");
    for (var i = 0; i < 50; i++) {
      console.log(123);
    }
    console.timeEnd("Loop time");
    var personArr = [
      { personId: 123, name: "Jhon", city: "Melbourne", phoneNo: "1234567890" },
      { personId: 124, name: "Amelia", city: "Sydney", phoneNo: "1234567890" },
      { personId: 125, name: "Emily", city: "Perth", phoneNo: "1234567890" },
      { personId: 126, name: "Abraham", city: "Perth", phoneNo: "1234567890" }
    ];
    console.table(personArr, ["name", "phoneNo"]);

    var person = { name: "john", surname: "Doe" };
    Object.defineProperty(person, "fullName", {
      get: function() {
        return this.name + " " + this.surname;
      },
      set: function(value) {
        [this.name, this.surname] = value.split(" ");
      }
    });
    console.log(person.fullName);
    person.surname = "777";
    console.log(person.fullName);
    person.fullName = "json xu";
    console.log(person.name);

    var obj = { a: "hello", b: "this is", c: "javascript!" };

    var array = Object.keys(obj).map(function(key) {
      return obj[key];
    });

    console.log(array);

    var x = { a: 10, b: 3 },
      props;
    props = Object.getOwnPropertyNames(x);
    console.log(props);

    var obj1 = { 0: "a", 1: "b", 2: "c" };
    console.log(Object.values(obj1));

    console.log(Math.PI);

    var a1 = 5;
    var b1 = a1++;

    console.log(b1);

    var monitor = {
      threshold: 5,
      check: function(value) {
        if (value > this.threshold) {
          this.display("Value is too high!");
        } else {
          this.display("Value is too low!");
        }
      },
      display(message) {
        console.log(message);
      }
    };
    monitor.check(6666);
    var badcheck = monitor.check.bind(monitor);
    badcheck(1);
    var check1 = monitor.check.bind(monitor, 3);
    check1();

    var prototype = {
      foo: "foo",
      bar: function() {
        return this.foo;
      }
    };

    var obj3 = Object.create(prototype);

    console.log(obj3.foo);
    console.log(obj3.bar());
    prototype.foo = "bar";
    console.log(obj3.foo);

    console.log(performance.now());

    let handler = {
      get(target, property) {
        if (!Reflect.has(target, property)) {
          return { value: undefined, type: "undefined" };
        }
        let value = Reflect.get(target, property);
        return { value: value, type: typeof value };
      }
    };

    let proxied = new Proxy({ foo: "bar" }, handler);

    console.log(proxied.foo);

    let obejct1 = {};
    let handler1 = {
      set(target, prop, value) {
        if ("string" === typeof value) {
          target[prop] = value + " is proxy";
          return true;
        }
      }
    };
    let proxied1 = new Proxy(obejct1, handler1);
    proxied1.example = "example111";
    console.log(obejct1);

    //观察者模式
    function Subject() {
      this.observers = [];
      this.registerObserver = function(observer) {
        if (this.observers.indexOf(observer) === -1) {
          this.observers.push(observer);
        }
      };

      this.unregisterObserver = function(observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
      };

      this.notifyObservers = function(message) {
        this.observers.forEach(function(observer) {
          observer.notify(message);
        });
      };
    }

    // function Observer() {
    //   this.notify = function(message) {
    //     // Every observer must implement this function
    //   };
    // }

    function Employee(name) {
      this.name = name;
      this.notify = function(meetingTime) {
        console.log(this.name + ":666:" + meetingTime);
      };
    }

    var bob = new Employee("BOB");
    var jane = new Employee("Jane");
    var meetingAlerts = new Subject();
    meetingAlerts.registerObserver(jane);
    meetingAlerts.registerObserver(bob);
    meetingAlerts.notifyObservers("4pm");
    var log = (function() {
      var log = "";

      return {
        add: function(msg) {
          log += msg + "\n";
        },
        show: function() {
          console.log(log);
          log = "";
        }
      };
    })();
    //中介模式，调度模式
    var Participant = function(name) {
      this.name = name;
      this.chatroom = null;
    };

    Participant.prototype = {
      send: function(message, to) {
        this.chatroom.send(message, this, to);
      },
      receive: function(message, from) {
        log.add(from.name + "to" + this.name + ":" + message);
      }
    };

    var Chatroom = function() {
      var participants = {};
      return {
        register: function(participant) {
          participants[participant.name] = participant;
          participant.chatroom = this;
        },
        send: function(message, from) {
          for (const key in participants) {
            if (participants[key] !== from) {
              participants[key].receive(message, from);
            }
          }
        }
      };
    };

    function run() {
      var yoko = new Participant("A");
      var john = new Participant("B");
      var paul = new Participant("C");
      var ringo = new Participant("D");

      var chatroom = new Chatroom();
      chatroom.register(yoko);
      chatroom.register(john);
      chatroom.register(paul);
      chatroom.register(ringo);

      yoko.send("All you need is love.");
      yoko.send("I love you John.");
      paul.send("Ha, I heard that!");

      log.show();
    }

    run();

    //window.navigator.vibrate(100);

    try {
      throw new Error("Useful message");
    } catch (error) {
      console.log("Something went wrong! " + error.message);
    }

    console.log(performance.now());

  }
};
</script>

<style lang="scss" scoped>
</style>