App.Views.Talks = App.Views.Talks || {};

App.Views.Talks.NotFoundView = Backbone.View.extend({
	template : JST["backbone/templates/talks/notfound"],

	initialize : function() {
		this.id = this.options.id;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template({id: this.id}));
		return this;
	}

});