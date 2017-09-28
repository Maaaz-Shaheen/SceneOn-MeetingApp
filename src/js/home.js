var database = firebase.database().ref();
var auth = firebase.auth();
var userInfo = JSON.parse(window.localStorage.getItem("User Info"));
var userID = window.localStorage.getItem("UID");

var eventName = document.getElementById("eventName");
var eventLocation = document.getElementById("eventLocation");
var eventTime = document.getElementById("time");
var eventDate = document.getElementById("date");
var eventDescription = document.getElementById("description");

//IF LOGGED OUT

ifLoggedOut();

// Page JS

function createAnEvent(){
      var eventObj = {
        name : eventName.value,
        place: eventLocation.value,
        date: eventDate.value,
        description: eventDescription.value,
        by : userInfo.name,
      }
    
      eventName.value = '';
      eventLocation.value = '';
      description.value = '';

      database.child('events').push(eventObj);
}
    