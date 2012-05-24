//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

var App = {
	Data: {},
	Models: {},
	Modal: {},
    Views: {},
    Routers: {},
    Collections: {},
    init: function() {
        new App.Routers.TalksRouter();
        new App.Routers.UsersRouter();
        new App.Routers.MenuRouter();
        Backbone.history.start();
    }
};

App.Modal.show = function() {
	var b = $(document.body);
	var height = Math.max(b.height(), $(window).height());
	$("#grayLayer").width(b.width()).height(height).show();
	var m = $("#modal");
	m.css("left",  ($(window).width()-m.width()) /2 )
		.css("top",  ($(window).height()-m.height()) /2 )
		.show();
}
App.Modal.hide = function() {
	$("#grayLayer").hide();
	$("#modal").hide();
}
App.Modal.shake = function() {
	var m = $("#modal");
	var left = m.offset().left;
	var speed = 50;
	var deviation = 10;
	m.animate({ left: left - deviation }, speed).animate({ left: left + deviation }, speed)
		.animate({ left: left - deviation }, speed).animate({ left: left + deviation }, speed)
			.animate({ left: left - deviation }, speed).animate({ left: left + deviation }, speed)
				.animate({left: left}, speed);
	
}
