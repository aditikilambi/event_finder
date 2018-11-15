function clickIt(i){
  document.getElementById('seemore' + i).className = "dontShow";
  document.getElementById('seeless' + i).className = "displayIt";
  document.getElementById('longBoi' + i).className = "displayIt";
}

function clickItBack(i){
  document.getElementById('seemore' + i).className = "displayIt";
  document.getElementById('seeless' + i).className = "dontShow";
  document.getElementById('longBoi' + i).className = "dontShow";
}

