
App.Models.Authentication = Backbone.Model.extend({
	url: '/profiles',
	defaults: {
		username: "",
		first_name : "",
		last_name : "",
		email : "",
		authenticated: false
	}
});
App.Models.Credentials = Backbone.Model.extend({
	url: '/session',
	defaults: {
		username: "",
		password: "",
		authenticated: false
	}
});