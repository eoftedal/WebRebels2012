App.Views.Admin = App.Views.Admin || {};
App.Views.Admin.Users = App.Views.Admin.Users || {};

App.Views.Admin.Users.ShowView = Backbone.View.extend({
	template : JST["backbone/templates/admin/users/show"],

	initialize : function() {
		this.user = this.options.user;
		this.render();
	},

	render: function() {
		$(this.el).html(this.template({user: this.user}));
		return this;
	}

});