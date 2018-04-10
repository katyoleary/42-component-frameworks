'use strict';

const angular = require('angular');
const cowsay = require('cowsay-browser');

//registering of controller literally the only thing that mkes it an angular app.
const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', CowsayController]); //dependency injection. controller is a way to manage scope within the app

function CowsayController($log) { //passing any dependencies we need IN ORDER that we passed them above
  $log.debug('CowsayController');

  this.title = 'Welcome to Cowland';
  this.history = []; //initial hisory state is nothing. pushing shit here
  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = this.cowfiles[0];
  });

  //update functionality
  this.update = function(input) {
    $log.debug('cowsayCtrl.update()');
    return cowsay.say({ text: input || 'moo', f: this.current })
  }

  //speak functionality
  this.speak = function(input) {
    $log.debug('cowsayCtrl.speak()'); //cowsay lowercase bc speak function is for every instance of cowsay
    this.spoken = this.update(input);
    this.history.push(this.spoken);
  }

  //undo functionality
  this.undo = function() {
    $log.debug('cowsayCtrl.undo()');
    this.history.pop();
    //history stack. popping last item off of stack
    this.spoken = this.history[this.history.length - 1] || '';
  }
}



//another controller for navigation. generally these two controllers should not be in the same file
cowsayApp.controller('NavController', ['$log', NavController]); //last NavController is actual funcion we create below

function NavController($log) {
  $log.debug('NavController');

  this.routes = [
    {
      name: 'home',
      url: '/home'
    },
    {
      name: 'about', 
      url: '/about-us'
    }
  ]
};
//looking through an array of object and stuffing that info into dom

