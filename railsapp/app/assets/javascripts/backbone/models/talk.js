
App.Models.Talk = Backbone.Model.extend({
	paramRoot: 'talk',
	urlRoot: '/talks',
	defaults: {
		title: "",
		description: ""
	},
	toJSON: function() {
		var obj = JSON.parse(JSON.stringify(this.attributes));
		delete obj.author;
		delete obj.created_at;
		delete obj.updated_at;
		delete obj.user_id;
		delete obj.id;
		return obj;
	},
	longId: function() {
		return this.get("title").replace(/[^0-9A-ZÆØÅ\-.,_:;]/gi, "-").toLowerCase();
	}
});


App.Collections.TalksCollection = Backbone.Collection.extend({
	model: App.Models.Talk,
	url: '/talks',
	loaded: false,

	fetchSingle: function(id, options) {
		if (!this.loaded) {
			this.loaded = true;
			this.fetch({
				success: function(collection, response) {
					collection.fetchSingle(id, options);
				},
				error: function(collection, response) {
					if (options.error) {
						options.error(collection, response);
					}
				}
			});
		} else {
			if (options.success) {
				var result = this.get(id);
				if (result == null) {
					result = this.find(function(t) { return t.longId() == id; });
				} 
				if (result == null) {
					options.notfound();
				} else {
					options.success(result);
				}
			}
		}
	}
});