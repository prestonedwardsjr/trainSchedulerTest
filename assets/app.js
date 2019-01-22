
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

$(".form-field").on("keyup", function () {
  // Input From User saved as variable
var traintemp = $("#train-name").val().trim();
sessionStorage.setItem("train", traintemp);
});
$("#train-name").val(sessionStorage.getItem("train"));
$("submit").on("click", function (event) {
  event.preventDefault();
  {
 trainName= $("#train-name").val().trim();
$(".form-field").val("");
database.ref().push({
  trainName: trainName,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
});
  sessionStorage.clear();
}
});
database.ref().on("child_added", function(childSnapshot) {
  var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minToArrival = childSnapshot.val().frequency - timeRemain;
  var nextTrain = moment().add(minToArrival, "minutes");
var key = childSnapshot.key;
var newrow = $("<tr>");
newrow.append($("<td>" + childSnapshot.val().train-name + "</td>"));
$("#train-table-rows").append(newrow);
// var destination = $("#destination").val().trim();
// var frequency = $("#frequency").val().trim();
// var nextArrival = $("#nextArrival").val().trim();
// var minutesAway = $("#minutesAway").val().trim();
// Test for variables entered
console.log(trainName);
// console.log(destination);
// console.log(frequency);
// console.log(nextArrival);
// console.log(minutesAway);

// database.ref().push({
  // trainName: trainName,
  // destination: destination,
  // frequency: frequency,
  // nextArrival: nextArrival,
  // minutesAway: minutesAway,
  
		
});
