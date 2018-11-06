		
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDHQWb-9NmoPuKRzAwt9Tja7FNEyYECQnU",
  authDomain: "eventfinder-1e474.firebaseapp.com",
  databaseURL: "https://eventfinder-1e474.firebaseio.com",
  projectId: "eventfinder-1e474",
  storageBucket: "eventfinder-1e474.appspot.com",
  messagingSenderId: "338849867147"
};

firebase.initializeApp(config);


var myFirebase = firebase.database().ref();

var allEvents = myFirebase.child("allEvents");

var addEvent = function () {
	var name = $("#eventName").val();
	var organization = "Latin Club";
	var pic = $("#pic-upload").val();
	var date = $("#date").val();
	var startTime = $("#start-time").val();
	var endTime = $("#end-time").val();
	var description = $("#description").val();
	var longd = $("#long-description").val();
	var tags = $("#tags").val().split(" ");

	allEvents.push({
		"name": name,
		"organization": organization,
		"picture": pic,
		"date": date,
		"start-time": startTime,
		"end-time": endTime,
		"description": description,
		"long-des": longd,
		"tags": tags,
	});
};

$(window).load(function() {
	$('#addEventForm').submit(addEvent);
});

console.log("Hello World");



