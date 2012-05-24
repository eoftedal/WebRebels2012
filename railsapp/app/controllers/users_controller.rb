class UsersController < ApplicationController

	def index
		respond_to do |format|
			format.json { render :json =>  User.all } 
		end
	end

	def show
		@user = User.find(params[:id])
		render :json => @user
	end

	def update
		@user = User.find(params[:id])
		if @user.update_attributes(params[:user])
			render :json => @user
		else
			render :json => @user.errors, :status => :unprocessable_entity
		end
	end

	def destroy
		@user = User.find(params[:id])
		@user.destroy
		head :ok
	end

end
