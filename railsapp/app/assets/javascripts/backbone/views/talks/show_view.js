App.Views.Talks = App.Views.Talks || {};

App.Views.Talks.ShowView = Backbone.View.extend({
	template : JST["backbone/templates/talks/show"],

	initialize : function() {
		this.talk = this.options.talk;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template({talk: this.talk}));
		
		return this;
	}

});