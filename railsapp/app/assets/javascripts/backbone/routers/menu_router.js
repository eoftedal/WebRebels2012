App.Routers.MenuRouter = Backbone.Router.extend({

	initialize: function(options) {
		App.Data.authentication = new App.Models.Authentication();
		this.authentication = App.Data.authentication;
		this.updateAuthentication();
	},

	routes: {
		"login"   : "login",
		"logout"  : "logout",
		"profile" : "profile",
		"openid"  : "openid",
		"" 		  : "index"
	},
	index: function() {
		App.Modal.hide();
		var view = new App.Views.HomeView();
		$("#main").html(view.render().el);				
	},

	login: function(id) {
		var view = new App.Views.LoginView();
		view.on('loggedin', this.loggedin, this);
		$("#modal").html(view.render().el);
		App.Modal.show();
		$("button#googleLogin").click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			window.location = "/session/google";
		});
	},

	logout: function() {
		var view = this;
		$.ajax({ type : "DELETE", url: "/session" })
			.done(function() {
				with(view) {
					App.Data.authentication = new App.Models.Authentication();
					updateView(App.Data.authentication);
				}
				window.history.back();
			});
	},
	
	profile: function() {
		var view = new App.Views.ProfileView({ authentication: this.authentication });
		$("#main").html(view.render().el);
	},

	updateAuthentication: function() {
        this.authentication = new App.Models.Authentication();
        var view = this.updateView;
        this.authentication.fetch({ success: function(auth) { view(auth) }});
	},

	loggedin: function(auth) {
		App.Modal.hide();
		window.history.back();
		this.updateView(auth);
	},

	updateView: function(auth) {
		this.authentication = auth;
		App.Data.authentication = auth;
		var view = new App.Views.MenuView({ authentication: auth });
		$("#menu").html(view.render().el);		
	}

});