
App.Views.LoginView = Backbone.View.extend({
	template : JST["backbone/templates/login"],

	events: {
		"submit #login-form": "login"
	},

	initialize : function() {
		this.model = new App.Models.Credentials();
		this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.$("form").backboneLink(this.model);
		return this;
	},

	login: function(e) {
		e.preventDefault();
		e.stopPropagation();
		var view = this;
		this.model.save(this.model.toJSON(), {
			success: function(authentication) {
				view.trigger('loggedin', authentication);
			},
			error: function() {
				App.Modal.shake();
			}
		});
	}

});