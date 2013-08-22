$(document).delegate("#listView", "pageinit", function() {
	// render fetchedData
	console.log('listview loaded');
	$.each(fetchedData, function(i, v) {
		$('#forClone')
		.clone()
		.attr('id', 'v' + i)
		.appendTo('.ui-listview');
		$('#v'+i).find('#nodeTitle').html(v.name);
		$('#v'+i).find('#nodeAddress').html(v.address);
		$('#v'+i).find('#nodeAuthor').html(v.author);
		$('#v'+i).click(function() {
			currData = i;
		});
	});
	// remove for clone
	$('#forClone').remove();
	// stop vimeo
});