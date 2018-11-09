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


var searchterms = function() {
	var organization = $( "#Organization option:selected" ).val();
	localStorage.setItem('search', organization);
}

$(window).load(function() {
	$('#searchbar').submit(searchterms);
});

/*  Method for populating myEvents Page with only events from the organization */
$(window).load(function() {
	allEvents.once('value',function(snapshot) 
	{
		var x = ' ';	
		var i = 0;
		snapshot.forEach(function(snapshot) {	
			var obj = snapshot.val();
			if(obj.organization === "Latin Club") {
					x = x + 
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + obj.date + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div 'col-sm-2 share'>" +
				         	 	"<a href='./createEvent.html'><button>Edit Event</button></a>" +
				         	 	"<a href='./share.html'><button>" + "<i class='fa fa-share-alt' style='font-size:24px'></i></button></a>" +
				       		 "</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
			        	 	"<p> <strong>Location:</strong> " + obj.location + "</p>" +
			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
			        	 	"<p id='longBoi" + i + "' class='dontshow'> <strong> Details: </strong>" + obj.longDes + "</p>" +


			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
			            	"<p><button>see more</button></p>" +
			              "</div>" +
				       
				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
				          	"<p><button>see less</button></p>" +
            			  "</div>" +
			              "</div>" +
		              "</div> <br><br><br>";
	            }
		 	if (document.getElementById('myEventContent') == null) return;
		 	document.getElementById('myEventContent').innerHTML = x;
		 	i = i + 1;
		});
	});
});


$(window).load(function() {
	if(localStorage.getItem('search') == null) {
		allEvents.once('value',function(snapshot) 
		{
			var x = ' ';	
			var i = 0;
			snapshot.forEach(function(snapshot) {	
				var obj = snapshot.val();
					x = x + 
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + obj.date + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div 'col-sm-2 share'>" +
				         	 	"<a href='./createEvent.html'><button>Edit Event</button></a>" +
				         	 	"<a href='./share.html'><button>" + "<i class='fa fa-share-alt' style='font-size:24px'></i></button></a>" +
				       		 "</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
			        	 	"<p> <strong>Location:</strong> " + obj.location + "</p>" +
			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
			        	 	"<p id='longBoi" + i + "' class='dontshow'> <strong> Details: </strong>" + obj.longDes + "</p>" +


			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
			            	"<p><button>see more</button></p>" +
			              "</div>" +
				       
				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
				          	"<p><button>see less</button></p>" +
            			  "</div>" +
			              "</div>" +
		              "</div> <br><br><br>";
			 	if (document.getElementById('allEventContent') == null) return;
			 	document.getElementById('allEventContent').innerHTML = x;
			 	i = i + 1;
			});
		});
	}
});

$(window).load(function() {
	if(localStorage.getItem('search') != null) {

		var toSearch = localStorage.getItem('search');

		allEvents.orderByChild('organization').equalTo(toSearch).once('value',function(snapshot) 
		{
			var x = ' ';
			var i = 0;	
			snapshot.forEach(function(snapshot) {	
				var obj = snapshot.val();
					x = x + 
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + obj.date + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div 'col-sm-2 share'>" +
				         	 	"<a href='./createEvent.html'><button>Edit Event</button></a>" +
				         	 	"<a href='./share.html'><button>" + "<i class='fa fa-share-alt' style='font-size:24px'></i></button></a>" +
				       		 "</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
			        	 	"<p> <strong>Location:</strong> " + obj.location + "</p>" +
			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
			        	 	"<p id='longBoi" + i + "' class='dontshow'> <strong> Details: </strong>" + obj.longDes + "</p>" +


			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
			            	"<p><button>see more</button></p>" +
			              "</div>" +
				       
				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
				          	"<p><button>see less</button></p>" +
            			  "</div>" +
			              "</div>" +
		              "</div> <br><br><br>";

			 	if (document.getElementById('allEventContent') == null) return;
			 	document.getElementById('allEventContent').innerHTML = x;
			    i = i + 1;
			});
		});
		localStorage.removeItem('search');
	}
});
