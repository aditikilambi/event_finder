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

var allEvents = myFirebase.child("allEvents").orderByChild("date");

var addEvents = function () {
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

function addTagFood(){
	document.getElementById('tags').value+="food ";
}

function addTagFree(){
	document.getElementById('tags').value+="free ";
}

function addTagAcademic(){
	document.getElementById('tags').value+="academic ";
}

function addTagCultural(){
	document.getElementById('tags').value+="cultural ";
}

$(window).load(function() {
	$('#addEventForm').submit(addEvents);
});


var searchterms = function() {
	var organization = $( "#Organization option:selected" ).val();
	var eventTypeS = $( "#eventTypeSearch option:selected" ).val();
	localStorage.setItem('search', true);
	localStorage.setItem('orgSearch', organization);
	localStorage.setItem('type', eventTypeS);
}

$(window).load(function() {
	$('#searchbar').submit(searchterms);
});


function date(dateString){
	var month = dateString.substring(5,7);
	var returnMonth = '';
	if(month === "01")returnMonth = 'Jan';
	else if(month === "02")returnMonth = 'Feb';
	else if(month === "03")returnMonth = 'Mar';
	else if(month === "04")returnMonth = 'Apr';
	else if(month === "05")returnMonth = 'May';
	else if(month === "06")returnMonth = 'Jun';
	else if(month === "07")returnMonth = 'Jul';
	else if(month === "08")returnMonth = 'Aug';
	else if(month === "09")returnMonth = 'Sep';
	else if(month === "10")returnMonth = 'Oct';
	else if(month === "11")returnMonth = 'Nov';
	else if(month === "12")returnMonth = 'Dec';

	return returnMonth + '   ' + dateString.substring(8,10);
}


/*  Method for populating myEvents Page with only events from the organization */
$(window).load(function() {
	allEvents.once('value',function(snapshot) 
	{
		var x = ' ';	
		var i = 0;
		snapshot.forEach(function(snapshot) {	
			var obj = snapshot.val();
			var key = snapshot.key;
			if(obj.organization === "Latin Club") {	
					x = x + 
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + date(obj.date) + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div class='share' style='padding: 15px; text-align: center;'>" +
				         	 	"<a href='editEvent.html' id='" + key + "'onclick='editEvent(this.id);'><button class='edit'>Edit Event</button></a><br><br>" +
							"</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> <a data-toggle='modal' href='#clubModal'>" + obj.organization + "</a></p>" +
			        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
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

function editEvent(key){
	var keyRef = myFirebase.child('allEvents').child(key).once('value',function(snapshot) {
		var obj = snapshot.val();
		var toEdit = JSON.stringify({
			name: obj.name,
			date: obj.date,
			startTime: obj.startTime,
			endTime: obj.endTime,
			description: obj.description,
			longboi: obj.longDes,
			location: obj.location
		});
		localStorage.setItem('editEvent', toEdit);
	});
}


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
				       		 	"<p>" + date(obj.date) + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div class='share' style='padding: 15px; text-align: center;'>" +
				       		 "</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
			        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
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
	var cool = 'hello';

	if(localStorage.getItem('search')) {

		var orgToSearch = localStorage.getItem('orgSearch');
		var etypeToSearch = localStorage.getItem('type');
		
		var tempEvents= myFirebase.child("allEvents");
		
		if(orgToSearch != "" && etypeToSearch != ""){
			console.log("Entered here");
			var searchRef = querybase.ref(tempEvents, ['organization', 'eventTypes']).where({
					organization: orgToSearch,
					eventTypes: etypeToSearch,
			});
		}
		else if(orgToSearch != ""){
			var searchRef = querybase.ref(tempEvents, ['organization']).where({
					organization: orgToSearch,
			});
		}
		else if(etypeToSearch != ""){
			var searchRef = querybase.ref(tempEvents, ['eventTypes']).where({
					eventTypes: etypeToSearch,
			});
		}
		else {
			var searchRef = allEvents;
		}

		searchRef.once('value',function(snapshot) 
		{
			console.log(cool);
			var x = ' ';
			var i = 0;	
			snapshot.forEach(function(snapshot) {	
				var obj = snapshot.val();
					x = x + 
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + date(obj.date) + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div class='share' style='padding: 15px; text-align: center;'>" +
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
		// }	
		localStorage.removeItem('search');
		localStorage.removeItem('orgSearch');
		localStorage.removeItem('locationSearch');	
	}

});


// "<div class='container event'>" +
// 		          		"<div class='row'>" +
// 				            "<div class='col-sm-3 date'>" +
// 				       		 	"<p>" + date(obj.date) + "</p>" +
// 				       		 "</div>" +

// 				       		 "<div class='col-sm-8 title'>"+
// 				       		 	"<p>" + obj.name + "</p>" +
// 				       		 "</div>" +

// 							"<div class='share' style='padding: 15px; text-align: center;'>" +
// 				         	 	"<a href='editEvent.html' id='" + key + "'onclick='editEvent(this.id);'><button class='edit'>Edit Event</button></a><br><br>" +
// 								 "<button><a href='#' data-trigger='hover' data-toggle='popover' title='Share' data-html='true' data-placement='bottom' data-content=" + getContent() + "><i class='fa fa-share-alt' style='font-size:24px'></i></button></a>" +     		
// 							"</div>" +
// 		       		 	"</div>"+

// 			       		 "<div class='col-sm-3' id='eventimage'>" +
// 			          		"<img class='img-responsive' src='./images/500holder.png'/>" +
// 			        	 "</div>" +

// 			        	 "<div class='col-sm-9 description'>"+

// 			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
// 			        	 	"<p> <strong>Organization:</strong> <a data-toggle='modal' href='#clubModal'>" + obj.organization + "</a></p>" +
// 			        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
// 			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
// 			        	 	"<p id='longBoi" + i + "' class='dontshow'> <strong> Details: </strong>" + obj.longDes + "</p>" +


// 			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
// 			            	"<p><button>see more</button></p>" +
// 			              "</div>" +
				       
// 				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
// 				          	"<p><button>see less</button></p>" +
//             			  "</div>" +
// 			              "</div>" +
// 		              "</div> <br><br><br>";
