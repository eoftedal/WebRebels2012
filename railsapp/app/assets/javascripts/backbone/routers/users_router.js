App.Routers.UsersRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.users = new App.Collections.UsersCollection();
	},

	routes: {
		"admin/users/:id/edit" 	: "editUser",
		"admin/users/:id" 		: "showUser",
		"admin/users/.*"  		: "index"
	},

	showUser: function(id) {
		var user = this.users.get(id);
		var view = new App.Views.Admin.Users.ShowView({ user: user });
		$("#main").html(view.render().el);
		$(".editButton").click(function() {
			window.location.hash = "admin/users/" + user.id + "/edit";
		});
	},

	editUser: function(id) {
		var user = this.users.get(id);
		var view = new App.Views.Admin.Users.EditView({ user: user });
		$("#main").html(view.render().el);
	},

	index: function() {
		this.users.fetch({
			success: function(users) {
				var view = new App.Views.Admin.Users.IndexView({ users: users });
				$("#main").html(view.render().el);
			}
		});
	}

});