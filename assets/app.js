console.log("hello");

// Initialize Firebase

var config = {
    apiKey: "AIzaSyCM5ajTkCLkITFy6obB40K5JVJfID7w3BA",
    authDomain: "train-sched-176fe.firebaseapp.com",
    databaseURL: "https://train-sched-176fe.firebaseio.com",
    projectId: "train-sched-176fe",
    storageBucket: "",
    messagingSenderId: "868573763341"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

//   console.log(trainData)


trainData.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val())
    //   $(".train-holder").empty();

    var newTrain = $("<div>");
    newTrain.text(snapshot.val().trainName);



    // Based off snapshot.val().firstTrain and snapshot.val().frequency
    // For example: if we have a train that has a first train of 2:00 and a frequency of 30 min, and it is currently 2:45, we know
    // it will run again at 3:00 -> which would be our nextTrain variable and it is 15 minutes away -> which will be our minTilNexttrain variable

    var nextTrain = "Needs to be calculated";


    var minTilNextTrain = "Needs to be calculated"



    $("#train-table > tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>"

        + nextTrain + "</td><td>" + minTilNextTrain + "</td></tr>")

});


$("#train-submit-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(trainName, destination, frequency, firstTrain);

    var trainObject = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(trainObject)

    $("#train-name-input").val(" ");
    $("#destination-input").val(" ")
    $("#first-train-input").val(" ")
    $("#frequency-input").val(" ");


})

