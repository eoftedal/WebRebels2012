
App.Models.Userinfo = Backbone.Model.extend({
	paramRoot: 'user',
	urlRoot: '/userinfo'
});


App.Collections.UserinfoCollection = Backbone.Collection.extend({
	model: App.Models.Userinfo,
	url: '/userinfo'
});