$(document).delegate("#menu", "pageinit", function() {
	if (navigator.onLine) {} else {
		$('.links').html('you need an internet connection to continue');
		$('.clickForMap').hide();
	}
});
$(document).delegate("#mapView", "pageinit", function() {
	map = new L.Map('map', {
		center: [40.732161, -73.97832],
		zoom: 16,
		zoomControl: false
	});
	L.tileLayer('http://a.tiles.mapbox.com/v3/michaelisanerd.map-2s73eo1z/{z}/{x}/{y}.png').addTo(map);
	var layerUrl = 'http://motf.cartodb.com/api/v2/viz/050cf1ba-f0d6-11e2-b18a-0d7bf43d6c28/viz.json';
	cartodb.createLayer(map, layerUrl).addTo(map).on('done', function(layer) {
		// change the query for the first layer
		var sublayer = layer.getSubLayer(0);
		sublayer.infowindow.set('template', $('#infowindow_template').html());
	}).on('error', function() {
		//log the error
	});
});

$('#flip-mini').bind('change', function(event, ui) {
	if ($('#flip-mini').val() == 'on') {
		alert('triggered explore mode');
	} else {
		alert('disable');
	}
});