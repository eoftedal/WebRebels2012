
App.Views.ProfileView = Backbone.View.extend({
	template : JST["backbone/templates/profile"],

	events: {
		"submit #profile-form": "save"
	},

	initialize : function(options) {
		this.authentication = options.authentication;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.authentication.toJSON()));
		this.$("form").backboneLink(this.authentication);
		return this;
	},

	save: function(e) {
		e.preventDefault();
		e.stopPropagation();
		var view = this;
		this.authentication.save(this.authentication.toJSON(), {
			success: function(authentication) {
				view.trigger('loggedin', authentication);
			},
			error: function() {
				
			}
		});
	}

});