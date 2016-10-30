'use strict';

function MyApp() {
	
	this.initFirebase();
	this.loadUsers();

	this.userModule = new UserModule();


}


MyApp.prototype.initFirebase = function() {
	console.log("init firebase")
  	// Shortcuts to Firebase SDK features.
  	this.auth = firebase.auth();
  	this.database = firebase.database();
  	this.storage = firebase.storage();
  };

// Saves a new message on the Firebase DB.
MyApp.prototype.saveMessage = function(address, name, phoneNumber) {
	
	// Add a new message entry to the Firebase Database.
	this.messagesRef.push({
		address: address,
		name: name,
		phoneNumber: phoneNumber
	});
	console.log("send");

};

MyApp.prototype.loadUsers = function() {

  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('users_');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads messages and listen for new ones.
  var setMessage = function(data) {

  	var val = data.val();

    this.userModule.add(val);

  	$('#visited').append('<li class="ui-li ui-li-static ui-btn-up-c">' +
  	" address : " + val.address + "<br> name : " + val.name + "<br> phoneNumber : "+ val.phoneNumber + '</li>');

  }.bind(this);

  this.messagesRef.on('child_added', setMessage);
};