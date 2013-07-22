$(document).delegate("#menu", "pageinit", function() {
	if (navigator.onLine) {} else {
		$('.links').html('you need an internet connection to continue');
		$('.clickForMap').hide();
	}
});
$('#flip-mini').bind('change', function(event, ui) {
	if ($('#flip-mini').val() == 'on') {
		alert('triggered explore mode');
	} else {
		alert('disable');
	}
});
var map, myPos, newLatLng;

function init() {
	// initiate leaflet map
	map = new L.Map('cartodb-map', {
		center: [40.732161, -73.97832],
		minZoom: 14,
		zoom: 16,
		zoomControl: false
	});
	// set map bound
/*
map.setMaxBounds([
		[40.726316, -73.994808],
		[40.742445, -73.960047]
	]);
*/
	L.tileLayer('http://a.tiles.mapbox.com/v3/michaelisanerd.map-2s73eo1z/{z}/{x}/{y}.png').addTo(map);
	var layerUrl = 'http://motf.cartodb.com/api/v2/viz/050cf1ba-f0d6-11e2-b18a-0d7bf43d6c28/viz.json';
	console.log('cartoDB layer has been loaded');
	cartodb.createLayer(map, layerUrl).addTo(map).on('done', function(layer) {
		// change the query for the first layer
		var sublayer = layer.getSubLayer(0);
		sublayer.infowindow.set('template', $('#infowindow_template').html());
		detectUserLocation();
		map.invalidateSize();
	}).on('error', function() {
		//log the error
	});
	myPos = new L.circleMarker([0, 0], {
		stroke: false,
		fillColor: '#3399ff',
		fillOpacity: 1,
		radius: 8
	}).bindPopup('This is YOU').addTo(map);
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
$(document).delegate("#mapView", "pageinit", function() {
	$('#locatingBox').css({
		'left': window.innerWidth / 2 - $('#locatingBox').width() / 2
	});
	init();
	$('#cartodb-map').css({
		'height': window.innerHeight - 42
	});
	$('#clientLocate').click(function() {
		mapHalfOpacity();
		$('#locatingBox').fadeIn();
		clientLocate();
	});
});

function mapHalfOpacity() {
	$('#cartodb-map').animate({
		'opacity': 0.5
	});
}

function mapFullOpacity() {
	$('#cartodb-map').animate({
		'opacity': 1
	});
}