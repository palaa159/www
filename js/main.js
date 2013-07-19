$(document).delegate("#menu", "pageinit", function() {
	if (navigator.onLine) {} else {
		$('.links').html('you need an internet connection to continue');
		$('.clickForMap').hide();
	}
});
$(document).delegate("#mapView", "pageinit", function() {
	var map = L.map('map', {
		center: [-73.9790415732083, 40.73271062189632],
		zoom: 2,
		zoomControl: false
	});
	var myPos = L.circle([44, 33], 10, {
		color: '#0080ff',
		fillOpacity: 0.9
	}).bindPopup('You are here').addTo(map);
	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
		minZoom: 14,
		maxZoom: 18
	}).addTo(map);
	// carto DB
	var cartoURL = 'http://motf.cartodb.com/api/v2/viz/e5b060c6-f02c-11e2-b3a8-4b78298282b3/viz.json';
	cartodb.createLayer(map, cartoURL).addTo(map);
	// init locate

	function findLocation() {
		map.locate({
			watch: true,
			setView: true,
			minZoom: 14,
			maxZoom: 18,
			enableHighAccuracy: true,
			maximumAge: 10000,
			timeout: 10000
		});
	}

	function onLocationFound(e) {
		var lat = (e.latlng.lat);
		var lng = (e.latlng.lng);
		var newLatLng = new L.LatLng(lat, lng);
		myPos.setLatLng(newLatLng);
	}
	map.on('locationfound', onLocationFound);

	function onLocationError(e) {
		alert(e.message);
	}
	map.on('locationerror', onLocationError);
	$('#clientLocate').click(function() {
		findLocation();
	});
	findLocation();
	// fix map height
	$('#map').css({
		'position': 'fixed',
		'top': 0,
		'left': 0,
		'width': window.innerWidth,
		'height': window.innerHeight
	});
});
$('#flip-mini').bind('change', function(event, ui) {
	if ($('#flip-mini').val() == 'on') {
		alert('triggered explore mode');
	} else {
		alert('disable');
	}
});