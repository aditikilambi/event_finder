//enabling popover function
//taken from w3schools

$(document).ready(function(){
    $('[data-toggle="popover"]').popover({content: "<a href='https://facebook.com'><img src='images/fb512.png' alt='share with Facebook' width='42'/><a/>&emsp;&emsp;<a href='https://gmail.com'><img src='images/gmail.png' alt='share through Gmail' width='42'/>"});
});
