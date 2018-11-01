import React from 'react';
import './css/form.css';

class form extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { created: true };
 	}

	render() {
    	return (
		    <form action='./index.html'>
		      <p><input id="eventName" placeholder="Event Name"></p>
		      <p id='pic-upload'>Add an image<input type="file" name="eventPic"></p>
		      <p>Date: <input type="date" placeholder="MM/DD/YYYY">  Time: <input id="appt-time" type="time" name="appt-time"> </p>
		      <p><textarea id="description" placeholder="Give your event a catchy description"></textarea></p>
		      <p><textarea id="long-description" placeholder="Full Event Details"></textarea></p>
		      <p><textarea id="tags" placeholder="Event Tags. Try #food #dance #networking"></textarea></p>
		      <p><input type="submit" value="Create Event"></p>
		    </form>

    	);
	}
}

ReactDOM.render(form, document.getElementById('form'));			
