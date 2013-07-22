$(document).delegate("#contribute", "pageinit", function() {
	// post to db
	$('.contributeAdd').click(function() {
		$.ajax({
		type: "POST",
		url: "http://motf.cartodb.com/api/v2/sql?q=INSERT INTO test01 (the_geom, name) VALUES (ST_GeomFromText('POINT(-71.060316 48.432044)', 4326), 'this is the third one')&api_key=cef683a3f00795b0350d2d99dea06276aabab854"
	})
	.done(function() {
		window.location.href="#mapView";
		init();
		alert('done');
	})
	.error(function() {
		window.location.href="#contribute";
		alert('error');
	});
	});

});