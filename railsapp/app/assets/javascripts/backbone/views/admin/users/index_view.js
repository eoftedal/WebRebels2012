App.Views.Admin = App.Views.Admin || {};
App.Views.Admin.Users = App.Views.Admin.Users || {};

App.Views.Admin.Users.IndexView = Backbone.View.extend({
	template : JST["backbone/templates/admin/users/index"],

	initialize : function() {
		this.users = this.options.users;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template( { users: this.users }));
		return this;
	}

});