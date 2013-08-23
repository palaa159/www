console.log('detailview loaded');
$(document).delegate("#detailView", "pageshow", function() {
	// for vimeo player
	$('#backToList').click(function() {
	console.log('back to list');
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
	
	$('#detailSeqNum').html('[' + fetchedData[currData].ID + '/' + fetchedData.length + ']');
	$('#detailNodeDesc').html(fetchedData[currData].desc);
});