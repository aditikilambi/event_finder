
function logIn() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log('hello');
	var combos = [ ['latinclub', 'ucsd'], ['ucsd', 'latinclub'], ['fiat', 'lux',]]
	for(i = 0; i<combos.length; i++){
		if(combos[i][0] === username && combos[i][1] === password) return true;
	}
	window.alert("Incorrect username/password combination, try again");
	return false;

}