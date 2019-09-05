console.log(moment().format('HH:mm'));

//Variables for the Time and Date
var datetime = null,
  date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM D, YYYY,  HH:mm:ss'));
};

$(document).ready(function () {
  datetime = $('#current-time-div')
  update();
  setInterval(update, 1000);
});

//Variables to store trains and destinations users can select
var trains = ["Bill", "Ben", "Diesel", "Donald", "Douglas", "Duck", "Edward", "Emily", "Gordon", "Henry", "James", "Oliver", "Percy", "Rebecca", "Thomas", "Toby"];

var destinations = ["Abbey", "Arlesburgh - Bridge Street", "Arlesburgh West", "Arlesdale Green", "Arlesdale Road", "Ballahoo", "Barrow", "Brendam", "Bryreck", "Cronk", "Crosby", "Crosny Cuirn", "Crovan's Gate", "Culdee Fell Summit", "Devil's Back", "Dryaw", "Elsbridge", "Ffarquhar East", "Ffarquhar West", "Glennock", "Hackenbeck", "Harwick", "Haultraugh", "Kellsthorpe Road", "Kildane", "Kirk Machan", "Kirk Roran", "Knapford", "Lakeside", "Maron", "Marth Waite", "Norramby", "Peel Godred", "Rheneas", "Rolf's Castle", "Shiloh", "Skarloey", "Skarloey Road", "Suddery", "Tid Mouth", "Vicarstown", "Wellsworth"];

//Function that dynamically adds these options to the HTML <form>
for (i = 0; i < trains.length; i++) {
  trainOption = $("<option>").text(trains[i]);
  $("#train-name-input").append(trainOption);
};

for (i = 0; i < destinations.length; i++) {
  destinationOption = $("<option>").text(destinations[i]);
  $("#destination-input").append(destinationOption);
};

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAVb9JYY9gt4N4e8Ez7lL9D0g9NuMQfWaI",
  authDomain: "north-west-railway-8171e.firebaseapp.com",
  databaseURL: "https://north-west-railway-8171e.firebaseio.com",
  projectId: "north-west-railway-8171e",
  storageBucket: "",
  messagingSenderId: "241521170212",
  appId: "1:241521170212:web:9fbf84815e557b01"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Function to write to database new train schedules
$("#schedule-train-button").on("click", function (event) {
  event.preventDefault();

  //Select user inputs
  trainInput = $("#train-name-input").val().trim();
  destinationInput = $("#destination-input").val().trim();
  hoursInput = $("#hours-input").val().trim();
  minutesInput = $("#minutes-input").val().trim();
  frequencyInput = Math.floor($("#frequency-input").val().trim());

  //Concatenates first train time as HH:mm
  var startTime = hoursInput + ":" + minutesInput;

  //Function sourced from StackOverflow to populate an array with times at a specified interval
  var timelineLabels = (desiredStartTime, interval, period) => {
    var periodsInADay = moment.duration(1, 'day').as(period);

    var timeLabels = [];
    var startTimeMoment = moment(desiredStartTime, 'HH:mm');
    for (var i = 0; i <= periodsInADay; i += interval) {
      startTimeMoment.add(i === 0 ? 0 : interval, period);
      timeLabels.push(startTimeMoment.format('HH:mm'));
    }
    return timeLabels;
  };

  // Stores results array of function in a new variable
  var departureTimes = timelineLabels(startTime, frequencyInput, 'minutes');


  //Create new object
  newTrain = {
    name: trainInput,
    destination: destinationInput,
    first_train: startTime,
    departure_times: departureTimes,
    frequency: frequencyInput
  };

  //Writes new trip object to the database
  database.ref().push(newTrain);

});

//Function to read train schedules and display in the HTML table whenever a new one is added

database.ref().on("child_added", function (snapshot) {

  //Store snapshot properties in variables
  var snapshotName = snapshot.val().name;
  var snapshotDestination = snapshot.val().destination;
  var snapshotDepartureTimes = snapshot.val().departure_times;
  var snapshotFrequency = snapshot.val().frequency;

  //Function to determine time of the next train
  console.log(snapshotDepartureTimes);
  var currentTime = moment().format('HH:mm');

  console.log(currentTime);

  for (var i = 0; i < snapshotDepartureTimes; i++) {
    if (currentTime.isBefore(moment(snapshotDepartureTimes[i]).format('HH:mm'))) {
      console.log(snapshotDepartureTimes[i] + " is before the current time")
    } else {
      console.log("LOL whatever");
    };
  };


  //Create new row on the timetable
  var newRow = $("<tr>").append(
    $("<td>").text(snapshotName),
    $("<td>").text(snapshotDestination),
    $("<td>").text(snapshotFrequency),
    $("<td>").text("#####"),
    $("<td>").text("#####"),
  );

  $("#time-table > tbody").append(newRow);

});
