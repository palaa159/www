console.log('detailview loaded');
$(document).delegate("#detailView", "pageshow", function() {
	// for vimeo player
	var iframe = $('#vimeo-player')[0];
	var player = $f(iframe);
	$('#backToList').click(function() {
	console.log('back to list');
	player.api('pause');
	// clear detailview
	$('#vimeo-player').attr('src', '');
	$('#detailNodeTitle').html('');
	$('#detailNodeAddress').html('');
	$('#detailNodeDesc').html('');
	$('#detailSeqNum').html('');
	});
	console.log('detailview refreshed');
	var WIDTH = sW - 32;
	$('#detailNodeTitle').html(fetchedData[currData].name);
	$('#detailNodeAddress').html(fetchedData[currData].address);
	$('#vimeo-player').attr({
		'width': WIDTH,
		'height': WIDTH*9/16,
		'src': 'http://player.vimeo.com/video/' + fetchedData[currData].url + '?api=1'
	});
	$('#detailSeqNum').html('[' + fetchedData[currData].ID + '/' + fetchedData.length + ']');
	$('#detailNodeDesc').html(fetchedData[currData].desc);

	window.addEventListener('orientationchange', function(evt) {
		$('body').html(evt.orientation);
	});
});