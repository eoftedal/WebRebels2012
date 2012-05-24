
App.Models.User = Backbone.Model.extend({
	paramRoot: 'user',
	urlRoot: '/users',
	fullname: function() {
		return this.get('first_name') + " " + this.get('last_name');
	}
});


App.Collections.UsersCollection = Backbone.Collection.extend({
	model: App.Models.User,
	url: '/users'
});