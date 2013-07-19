$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    /* $.mobile.defaultPageTransition = 'none'; */
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.mobile.allowCrossDomainPages = true;
    
	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = true;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
});