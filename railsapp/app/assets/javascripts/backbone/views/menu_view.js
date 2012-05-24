
App.Views.MenuView = Backbone.View.extend({
	template : JST["backbone/templates/menu"],

	initialize : function() {
		this.authentication = this.options.authentication;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template( { authentication: this.authentication }));
		return this;
	}

});