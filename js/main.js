$(document).delegate("#mapView", "pageinit", function() {
	var map = L.map('map', {
		zoomControl: false
	});
	var myPos = L.circle([44, 33], 10, {
		color: '#0080ff',
		fillOpacity: 0.9
	}).bindPopup('You are here').addTo(map);
	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
		minZoom: 10,
		maxZoom: 18
	}).addTo(map);
	// init locate

	function findLocation() {
		map.locate({
			watch: true,
			setView: true,
			minZoom: 10,
			maxZoom: 16
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
	if($('#flip-mini').val() == 'on') {
		alert('triggered explore mode');
	} else {
		alert('disable');
	}
});