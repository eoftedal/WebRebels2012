App.Views.Admin = App.Views.Admin || {};
App.Views.Admin.Users = App.Views.Admin.Users || {};

App.Views.Admin.Users.EditView = Backbone.View.extend({
	template : JST["backbone/templates/admin/users/edit"],

	events: {
		"submit #edit-user": "save"
	},

	initialize : function() {
		this.model = this.options.user;
	    this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.$("form").backboneLink(this.model);
		return this;
	},

	save: function(e) {
		e.preventDefault();
		e.stopPropagation();

		this.model.unset("errors");
		var model = this.model;
	    this.model.save(this.model.toJSON(), {
	     	success: function(user) {
	        	window.location.hash = "/admin/users/" + user.id;
	       	},
	      	error: function(user, jqXHR) {
	        	model.set({errors: $.parseJSON(jqXHR.responseText) });
	        }
	    });
	}
});