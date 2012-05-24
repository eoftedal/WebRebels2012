App.Routers.TalksRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.talks = new App.Collections.TalksCollection();
	},

	routes: {
		"talks/new" : "newTalk",
		"talks/:id/edit" : "editTalk",
		"talks/:id" : "showTalk",
		"talks/.*"  : "index"
	},

	showTalk: function(id) {
		this.talks.fetchSingle(id, {
			success: function(talk) {
				var view = new App.Views.Talks.ShowView({ talk: talk });
				$("#main").html(view.render().el);
				$(".editButton").click(function() {
					window.location.hash = "talks/" + talk.longId() + "/edit";
				});
				$(".approveButton").click(function() {
					talk.set("approved", !talk.get("approved"));
				    talk.save(talk.toJSON(), {
				     	success: function(talk) {
				        	Backbone.history.loadUrl(Backbone.history.fragment);
				       	},
				      	error: function(talk, jqXHR) {
				        	model.set({errors: $.parseJSON(jqXHR.responseText) });
				        }
				    });

				});
			},
			notfound: function() {
				var view = new App.Views.Talks.NotFoundView({ id: id });
				$("#main").html(view.render().el);				
			}			
		});
	},

	editTalk: function(id) {
		this.talks.fetchSingle(id, {
			success: function(talk) {
				var view = new App.Views.Talks.EditView({ talk: talk });
				$("#main").html(view.render().el);
			},
			notfound: function() {
				var view = new App.Views.Talks.NotFoundView({ id: id });
				$("#main").html(view.render().el);				
			}			
		});
	},

	index: function() {
		this.talks.fetch({
			success: function(talks) {
				var view = new App.Views.Talks.IndexView({ talks: talks });
				$("#main").html(view.render().el);
			}
		});
	},
	
	newTalk: function() {
		var view = new App.Views.Talks.NewView({collection: this.talks});
		$("#main").html(view.render().el);
	}

});