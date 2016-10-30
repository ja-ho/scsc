var UserModule = (function(){
  // private
  // 사용자 목록 배열
  var users = [];


  function myUser(name,passwd, check1, check2, check3, check4,start1,end1,start2,end2) {
      var newUser = {
             name : name,
             passwd : passwd,
             preference : {
                 integer : check1,
                 integer1 : check2,
                 integer2 : check3,
                 integer3 : check4
             },

            time : {
                time1: {
                    start1:start1,
                    end1:end1
                },
                time2: {
                    start2:start2,
                    end2:end2
                }
            }
         };
     return newUser;
  };


  // 사용자 추가 시 Firebase에 추가
  var addUser = function(user) {

    dbRef.push(user);
   };

  var listUsers = function() {
    return users;
  };

  // 사용자들의 이름으로 검색하여 업데이트
  var updateUser = function(user) {
    users.forEach(function(_user, idx) {
      if(_user.name == user.name) {
        dbRef.child(user.key).set(user);
      }
    });
  };

  // 이름으로 삭제
  var removeUser = function(user) {
    users.forEach(function(_user, idx) {
      if (user.name == _user.name)
        dbRef.child(user.key).remove();
    });
  };

  var initFirebase = function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDPkFngRLB98fn6vipOp8tXehBzF9Lcs-o",
        authDomain: "test-project-28098.firebaseapp.com",
        databaseURL: "https://test-project-28098.firebaseio.com",
        storageBucket: "test-project-28098.appspot.com",
        messagingSenderId: "493664749056"
      };
    firebase.initializeApp(config);

      this.auth = firebase.auth();
      this.database = firebase.database();
      this.storage = firebase.storage();
      this.dbRef = this.database.ref('user');

      this.dbRef.on('child_added', function(data) {
         var user = data.val();

        // data의 key를 동적으로 user 객체에 key 추가
        user.key = data.key;

        users.push(user);
      });

      this.dbRef.on('child_changed', function(data) {
         var user = data.val();
             users.forEach(function(_user, idx) {
            if(_user.name == user.name) {
              _user = user;
            }
          });
      });

      this.dbRef.on('child_removed', function(data) {
         var user = data.val();
            users.forEach(function(_user, idx) {
         if (user.name == _user.name)
           users.splice(idx, 1);
          });
      });
  }

  // public vars and aliases to private functions
  return {

    init : function(firebase) {
       initFirebase(firebase);
    },

    add: function(user) {
      addUser(user);
    },
    update: function(user) {
      updateUser(user);
    },

    count: function() {
      return users.length;
    },

    list: function() {
      return users;
    },

    get: function(name) {
         var targetUser;
        users.forEach(function(user, idx) {
        if(name == user.name) {
           targetUser = user;
        }
      });

      return targetUser;
    },

    remove: function(name) {
      removeUser(name);
    },
    exist: function(name) {
        var count=0;
        users.forEach(function(user, idx) {
            if(name == user.name) {
                count=count+1;
            }
        });
        if (count==0)
            return  false;
        else
            return true;
    },

    myUser:myUser,
    removeUser:removeUser,
    updateUser:updateUser,
    users : users

  };

})();