
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSh-Q96IW45BqnABhWBh6e4kbT_M722Sg",
  authDomain: "my-trainscheduler.firebaseapp.com",
  databaseURL: "https://my-trainscheduler.firebaseio.com",
  projectId: "my-trainscheduler",
  storageBucket: "my-trainscheduler.appspot.com",
  messagingSenderId: "581549746591"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".form-field").on("keyup", function() {
  var traintemp = $("#train-name").val().trim();
  sessionStorage.setItem("train", traintemp); 
  var destinationtemp = $("#destination").val().trim();
  sessionStorage.setItem("city", destinationtemp);
  var firsttraintemp= $("#firstTrain").val().trim();
  sessionStorage.setItem("firsttrain", firsttraintemp);
  var freqencytemp = $("#freqency").val().trim();
  sessionStorage.setItem("timing", freqencytemp);
});
$("#train-name").val(sessionStorage.getItem("train"));
$("#destination").val(sessionStorage.getItem("city"));
$("#firstTrain").val(sessionStorage.getItem("firsttrain"));
$("#freqency").val(sessionStorage.getItem("timing"));
$("#submit").on("click", function(event) {
  event.preventDefault();
  {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firsttrainTime = $("#firstTrain").val().trim();
    freqency = $("#freqency").val().trim();
    $(".form-field").val("");
    database.ref().push({
      trainName: trainName, 
      destination: destination,
      freqency: freqency,    
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    sessionStorage.clear();
  }
});

database.ref().on("child_added", function(childSnapshot) {
  var newrow = $("<tr>");
  newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().freqency + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
  $("#train-table-rows").append(newrow);

});
