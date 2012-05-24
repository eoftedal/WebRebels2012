App.Views.Talks = App.Views.Talks || {};

App.Views.Talks.EditView = Backbone.View.extend({
	template : JST["backbone/templates/talks/edit"],

	events: {
		"submit #edit-talk": "save"
	},

	initialize : function() {
		this.model = this.options.talk;
	    this.render();
	},

	render: function() {
		$(this.el).html(this.template({ talk : this.model }));
		this.$("form").backboneLink(this.model);
		return this;
	},

	save: function(e) {
		e.preventDefault();
		e.stopPropagation();

		this.model.unset("errors");
		var model = this.model;
	    this.model.save(this.model.toJSON(), {
	     	success: function(talk) {
	        	window.location.hash = "/talks/" + talk.id;
	       	},
	      	error: function(talk, jqXHR) {
	        	model.set({errors: $.parseJSON(jqXHR.responseText) });
	        }
	    });
	}
});