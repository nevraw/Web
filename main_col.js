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
var $digitalValue;
$("input[name=digital]").change(function () {
 $digitalValue = parseInt(this.value);
});

function loadOptions() {
 if (localStorage.digital) {
  $digitalValue = localStorage.digital;
//  console.log('localStorage.digital: ' + $digitalValue);
  // setting radio' value
 } else {
  $digitalValue = 1;
//  console.log('localStorage.digital was undefined, now set to: ' + $digitalValue);
 }
 $("input[name=digital][value='" + $digitalValue + "']").attr('checked', 'checked');

 var $numColorPicker = $('#numColorPicker');

 if (localStorage.numColor) {
  $numColorPicker[0].value = localStorage.numColor;
 }
} 

function getAndStoreConfigData() {
 var $numColorPicker = $('#numColorPicker');

// console.log('digital value: ' + $digitalValue);

 var options = {
  digital: $digitalValue,
  numColor: $numColorPicker.val()
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.digital = $digitalValue;
 localStorage.numColor = options.numColor;

 console.log('Got options: ' + JSON.stringify(options));
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
