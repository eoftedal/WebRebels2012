
App.Views.HomeView = Backbone.View.extend({
	template : JST["backbone/templates/home"],

	initialize : function() {
		this.render();
	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	}

});