(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for time display
var $digitalValue=1;
$("input[name=digital]").change(function () {
 $digitalValue = parseInt(this.value);
});

// Radio control for inverting colors
var $invertValue=0;
$("input[name=invert]").change(function () {
 $invertValue = parseInt(this.value);
});


function loadOptions() {
if (localStorage.digital) {
  $digitalValue = localStorage.digital;
  console.log('localStorage.digital: ' + $digitalValue);
  // setting radio' value
 } else {
  $digitalValue = 1;
  console.log('localStorage.digital was undefined, now set to: ' + $digitalValue);
 }
 $("input[name=digital][value='" + $digitalValue + "']").attr('checked', 'checked');

if (localStorage.invert) {
  $invertValue = localStorage.invert;
  console.log('localStorage.invert: ' + $invertValue);
  // setting radio' value
 } else {
  $invertValue = 0;
  console.log('localStorage.invert was undefined, now set to: ' + $invertValue);
 }
 $("input[name=invert][value='" + $invertValue + "']").attr('checked', 'checked');
 
} 
 
 
 
function getAndStoreConfigData() {
 console.log('digital value: ' + $digitalValue);
 console.log('invert value: ' + $invertValue);

 var options = {
  digital: $digitalValue,
  invert: $invertValue
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.digital = $digitalValue;
 localStorage.invert  = $invertValue;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
