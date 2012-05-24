class UserinfoController < ApplicationController

	def index
		respond_to do |format|
			format.xml { render :xml => User.all.map{ |u| toJSON(u) } }
			format.json { render :json =>  User.all.map{ |u| toJSON(u) } }
		end
	end

	def show
		@user = User.find(params[:id])
		render :json => toJSON(@user)
	end

	def toJSON(user)
		{:id => user.id, :full_name => user.full_name, :gravatar => user.gravatar_url(32) }
	end

end
