console.log('mapinit loaded');
var map, myPos, newLatLng;

$(document).delegate("#mapView", "pageinit", function() {
	$('#locatingBox').css({
		'left': sW / 2 - $('#locatingBox').width() / 2
	});
	init();
	detectUserLocation();
	$('#map').css({
		'height': sH - 42
	});
	$('#clientLocate').click(function() {
		mapHalfOpacity();
		$('#locatingBox').fadeIn();
		clientLocate();
	});
});

function init() {
	// initiate leaflet map
	map = new L.Map('map', {
		center: [40.732161, -73.97832],
		minZoom: 14,
		zoom: 16,
		zoomControl: false
	});
	// set map bound

	// map.setMaxBounds([
	// 	[40.726316, -73.994808],
	// 	[40.742445, -73.960047]
	// ]);

	// user

	L.tileLayer('http://a.tiles.mapbox.com/v3/michaelisanerd.map-2s73eo1z/{z}/{x}/{y}.png').addTo(map);
	myPos = new L.circleMarker([0, 0], {
		stroke: false,
		fillColor: '#3399ff',
		fillOpacity: 1,
		radius: 8
	}).bindPopup('This is YOU').addTo(map);

	// nodes
	// query data
	var nodes = [];
	$.each(fetchedData, function(i, v) {
		nodes[i] = L.marker(v.geoData)
		.addTo(map)
		.bindPopup('<a onclick="setCurrData(' + i + ');" href="#detailView"><div class="contextualView">' + v.address +'<br>' + v.author +'</div></a>');
	});

}

function setCurrData(a) {
	currData = a;
}

function detectUserLocation() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		navigator.geolocation.watchPosition(
		mapToPosition, alertError, {
			enableHighAccuracy: true,
			timeout: timeoutVal,
			maximumAge: 0
		});
	} else {
		alert("Geolocation is not supported by this browser");
	}

	function alertError(error) {
		var errors = {
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
		};
		alert("Error: " + errors[error.code]);
	}
}

function mapToPosition(position) {
	lng = position.coords.longitude;
	lat = position.coords.latitude;
	newLatLng = new L.LatLng(lat, lng);
	myPos.setLatLng(newLatLng);
	$('#locatingBox').fadeOut();
	mapFullOpacity();
	map.invalidateSize();
}

function clientLocate() {
	map.setView(newLatLng, 16);
	$('#locatingBox').fadeOut();
	mapFullOpacity();
}

function mapHalfOpacity() {
	$('#map').animate({
		'opacity': 0.5
	});
}

function mapFullOpacity() {
	$('#map').animate({
		'opacity': 1
	});
}