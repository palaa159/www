$(document).bind("mobileinit", function() {
	// Make your jQuery Mobile framework configuration changes here!
	$.mobile.defaultPageTransition = 'none'; 
	$.mobile.buttonMarkup.hoverDelay = 0;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = true;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
});

var sW, sH, fetchedData, currData;
sW = window.innerWidth;
sH = window.innerHeight;
console.log('appinit loaded');

$(document).delegate("#fetch", "pageinit", function() {
	centerObj('#fetching');
	// TEST IF CONNECT TO INTERNET
	// Retrieve data from Parse
	Parse.initialize("LcwUW1mhSbxh25gcPfHKFENrbt6YegsB8bxF5VJZ", "lewWw2HFlo1kk9qnJy1y1OrWfZGVNjSTjAfqRF8e");
	var Data = Parse.Object.extend("firstPhase");
	var rawData = new Data();
	rawData.fetch({
		success: function(object) {
			// console.log(object);
			fetchedData = sortByKey(object._serverData.results, 'ID');
			// console.warn(fetchedData);
			$.mobile.navigate('#listView');
		},
		error: function(model, error) {
			centerObj('#fetching');
			$('#fetching').html('This app requires internet connection');
		}
	});
});

$(document).delegate("#menu", "pageinit", function() {
});

// functions
function centerObj(a) {
	$(a).css({
		'top': sH/2 - $(a).height()/2 - 56,
		'left': sW/2 - $(a).width()/2 - 56
	});
}
function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
function preventOrientation() {
	$(window).bind("orientationchange", function(){
		var orientation = window.orientation;
		var new_orientation = (orientation) ? 0 : 180 + orientation;
		$('body').css({
			"-webkit-transform": "rotate(" + new_orientation + "deg)"
		});
	});
}