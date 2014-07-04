/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }


})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);

var ngApp =  angular.module('landing', []);

ngApp.controller('MainCtrl', [ '$rootScope',
  function($rootScope) {

      var hostname = window.location.hostname;
      $rootScope.server;
      if (hostname == 'localhost') {
          $rootScope.server = 'http://localhost:1337/';
      } else {
          $rootScope.server = 'http://vetheroes:1337'
      }
  }
]);

ngApp.controller('LandingCtrl', [ '$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){

        var path = window.location.pathname.split('/');
        var inviteId = path[3];
        var inviteToken = path[4];
        $scope.inviteInfo = {};
        $scope.isInvited =  false;
        $scope.formActive =  true;

        if (inviteId) {
            $http.get($rootScope.server+'invite/getsafe/'+inviteId+'/'+inviteToken).success(function(data){
                $scope.inviteInfo = data;
                $scope.isInvited = true;
                if(data.status == 2){
                    $scope.formActive =  false;
                }
            });
        }

        $scope.sendForm = function(){
            console.log('sending form');
            if ($scope.isInvited) {
                $http.post($rootScope.server+'invite/confirm/' + inviteId, $scope.inviteInfo)
                    .success(function(data){
                        $scope.formActive = false;
                        ga('send', 'event', 'form', 'submit', 'invite_accepted', 1);
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }else{
                $scope.inviteInfo.status = 3;
                $http.post($rootScope.server+'invite/request', $scope.inviteInfo)
                    .success(function(data){
                        $scope.formActive = false;
                        ga('send', 'event', 'form', 'submit', 'invite_requested', 1);
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }
        };
    }
]);

ngApp.controller('NewInviteCtrl', [ '$scope', '$rootScope', '$http',
   function($scope, $rootScope, $http){
       $scope.inviteInfo = {};
       $scope.newInvitation = function(){
           $http.post($rootScope.server+'invites', $scope.inviteInfo)
               .success(function(data){
                   alert('Invitacion guardada correctamente');
               })
               .error(function(err){
                   $scope.error = err;
                   console.log(err);
           });
       }
   } 
]);


/*
Icon Validation
Simply puts icon code into element if valid

<i class="ionicons-font" mb-icon-validation="form.name"></i>

* */

ngApp.directive('mbIconValidation',['$rootScope', '$timeout', '$parse',
  function($rootScope, $timeout, $parse){
    return{
      scope:{
        validationObj: '=mbIconValidation',
      },
      link: function(scope, element, attrs){
        var okIcon = '&#xe0d9;';
        var failIcon = '&#xe0e0;';
        scope.$watchCollection('[validationObj.$valid, validationObj.$pristine]', function(n,o){
          if(scope.validationObj.$valid === true && scope.validationObj.$pristine === false){
            element.html(okIcon); //Ok icon
            element.css('color', '#59c063');
          }else if(scope.validationObj.$valid === false && scope.validationObj.$pristine === false){
            element.html(failIcon);
            element.css('color', '#F10C15');
          }else{
            element.html('');
          }

        });
      }
    };
  }
]);