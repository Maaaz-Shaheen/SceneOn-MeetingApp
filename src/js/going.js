ifLoggedOut();

var database = firebase.database().ref();
var renderDiv = document.getElementById("render-div");
var userID = window.localStorage.getItem("UID");
var userInfo = JSON.parse(window.localStorage.getItem("User Info"));


function goingAction(eventObj) {
    database.child("status").child(userID).child(eventObj.id).set({
        display: true,
    });
}

function notGoingAction(eventObj) {
    database.child("status").child(userID).child(eventObj.id).set({
        display: false,
    });
}



database.child("events").on("child_added", function(snapshot){
    var eventObj = snapshot.val();
    eventObj.id = snapshot.key;
    render(eventObj);
})



function render(eventObj){


    var eventName = eventObj.name;
    var eventDescription = eventObj.description;
    var eventDate = eventObj.date;
    var eventPlace = eventObj.place;
    var by = eventObj.by;

    var eventColumn = document.createElement("DIV");
    eventColumn.setAttribute("class", "col-md-9 d-block my-3");

    var eventCard = document.createElement("DIV");
    eventCard.setAttribute("class", "card card-primary card-form ");
    eventCard.setAttribute("id", eventObj.id);
 

    var eventCardHead = document.createElement("DIV");
    eventCardHead.setAttribute("class", "card-header");


    var eventCardHeadText = document.createElement("H3");
    var eventCardHeadTextName = document.createTextNode(eventName);


    var eventCardBlock = document.createElement("DIV");
    eventCardBlock.setAttribute("class", "card-block");


    var eventContent = document.createElement("P");
    eventContent.setAttribute("class", "lead text-center");
    var eventContentText = document.createTextNode(eventDescription);


    var eventBy = document.createElement("P");
    eventBy.setAttribute("class", "lead text-right");
    var eventByText = document.createTextNode("By : " + by);


    var onDate = document.createElement("DIV");
    onDate.setAttribute("class", "lead text-left small");
    var onDateText = document.createTextNode("On : " + eventDate);
        
    

    var notGoing = document.createElement("DIV");
    var notGoingText = document.createTextNode("I changed my mind and won't be going");
    notGoing.setAttribute("class", "btn btn-danger d-inline-block mt-2");
    notGoing.onclick = function(){
        notGoingAction(eventObj);
    }
  
 
    
    eventCardHeadText.appendChild(eventCardHeadTextName);
    eventCardHead.appendChild(eventCardHeadText);


    eventContent.appendChild(eventContentText);
    eventBy.appendChild(eventByText);
    notGoing.appendChild(notGoingText);

    onDate.appendChild(onDateText);
    

    eventCardBlock.appendChild(eventContent);
    eventCardBlock.appendChild(eventBy);
    eventCardBlock.appendChild(onDate);

    
    eventCardBlock.appendChild(notGoing);

  
    eventCard.appendChild(eventCardHead);
    eventCard.appendChild(eventCardBlock);
    

    eventColumn.appendChild(eventCard);
    renderDiv.appendChild(eventColumn);

    firebase.database().ref('/status/' + userID + "/" + eventObj.id).on('value', function(snapshot) {
        var obj = snapshot.val();
        if(obj === null){
            eventColumn.setAttribute("class", "d-none");
        }

        else if(obj.display === false){
            eventColumn.setAttribute("class", "d-none");
        }
    });

}



