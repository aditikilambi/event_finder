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
	var location = $("#location").val();
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
		"location": location,
		"startTime": startTime,
		"endTime": endTime,
		"description": description,
		"longDes": longd,
		"tags": tags,
	});
};

$(window).load(function() {
	$('#addEventForm').submit(addEvent);
});

$(window).load(function() {
	allEvents.once('value',function(snapshot) 
	{
		var x = ' ';	
		snapshot.forEach(function(snapshot) {	
			var obj = snapshot.val();
			x = x + 
			"<div id='share'>" +
         	 	"<a href='./createEvent.html'><button>Edit Event</button></a>" +
         	 	"<a href='./share.html'><button>" + "<i class='fa fa-share-alt' style='font-size:24px'></i></button></a>" +
       		 "</div>" +
       		 "<div class='date'>" +
       		 	"<p>" + obj.date + "</p>" +
       		 "</div>" +
       		 "<div class='title'>" +
       		 	"<p>" + obj.name + "</p>" +
       		 "</div>" +
       		 " <div class='image'>" +
          		"<img />" +
        	 "</div>" +
        	 "<div class='time'>" +
        	 	"<p>" + obj.startTime + " - " + obj.endTime +
        	 "</div>" ;

        	 x = x + "<div class='organization'>" +
        	 	"<p> Organization: " + obj.organization + "</p>" +
        	 "</div>" +
        	 "<div class='location'>" +
        	 	"<p>Location: " + obj.location + "</p>" +
        	 "</div>" +
        	 "<div class='Description'>" +
        	 	"<p>" + obj.description + "</p>" +
        	 "</div>" +
        	 "<p style='text-align:right;padding-right:15px;''>" +
            	"<a href='./seemore.html'>see more</a>" +
        	 "</p>";

		 	if (document.getElementById('pgContent') == null) return;
		 	document.getElementById('pgContent').innerHTML = x
		});
	});
});



