(function() {
 loadOptions();
 submitHandler();
})();

function submitHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 $cancelButton.on('click', function() {
  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

function loadOptions() {
 var $timeColorPicker = $('#timeColorPicker');

 if (localStorage.timeColor) {
  $timeColorPicker[0].value = localStorage.timeColor;
 }
} 

function getAndStoreConfigData() {
 var $timeColorPicker = $('#timeColorPicker');

 var options = {
  timeColor: $timeColorPicker.val()
 };
 
 localStorage.timeColor = options.timeColor;

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
