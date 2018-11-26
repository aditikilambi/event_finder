function clickIt(i){
  document.getElementById('seemore' + i).className = "dontShow";
  document.getElementById('seeless' + i).className = "displayIt";
  document.getElementById('longBoi' + i).className = "displayIt";
  document.getElementById('org' + i).className = "displayIt orgbutton";
}

function clickItBack(i){
  document.getElementById('seemore' + i).className = "displayIt";
  document.getElementById('seeless' + i).className = "dontShow";
  document.getElementById('longBoi' + i).className = "dontShow";
  document.getElementById('org' + i).className = "dontShow";

}

