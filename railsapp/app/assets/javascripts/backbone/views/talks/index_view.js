App.Views.Talks = App.Views.Talks || {};

App.Views.Talks.IndexView = Backbone.View.extend({
	template : JST["backbone/templates/talks/index"],

	initialize : function() {
		this.talks = this.options.talks;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template( { talks: this.talks }));
		return this;
	}

});