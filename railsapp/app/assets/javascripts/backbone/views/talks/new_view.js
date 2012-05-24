App.Views.Talks = App.Views.Talks || {};

App.Views.Talks.NewView = Backbone.View.extend({
	template : JST["backbone/templates/talks/new"],

	events: {
		"click #new-talk button" : "saveDraft",
		"submit #new-talk"       : "save"
	},

	initialize : function() {
	    if (localStorage.draft) {
	    	this.model = new this.collection.model(JSON.parse(localStorage.draft));
	    } else {
	    	this.model = new this.collection.model();
	    }
	    this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.$("form").backboneLink(this.model);
		return this;
	},

	saveDraft: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.model.unset("errors");
		var model = this.model;
		localStorage.draft = JSON.stringify(model.toJSON());
	},

	save: function(e) {
		e.preventDefault();
		e.stopPropagation();

		this.model.unset("errors");
		var model = this.model;
	    this.collection.create(this.model.toJSON(), {
	     	success: function(talk) {
	     		delete localStorage.draft;
	        	window.location.hash = "/talks/" + talk.id;
	       	},
	      	error: function(talk, jqXHR) {
	        	model.set({errors: $.parseJSON(jqXHR.responseText) });
	        }
	    });
	}
});