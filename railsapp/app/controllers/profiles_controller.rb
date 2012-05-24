class ProfilesController < ApplicationController

  def show
    @result = {
        :authenticated => signed_in?, 
        :id => (signed_in? ? current_user.id : ""),
        :username => (signed_in? ? current_user.full_name : ""),
        :gravatar => (signed_in? ? current_user.gravatar_url(32) : ""),
        :first_name => (signed_in? ? current_user.first_name : ""),
        :last_name => (signed_in? ? current_user.last_name : ""),
        :email => (signed_in? ? current_user.email : ""),
        :role => (signed_in? ? current_user.role : "anonymous")
      }
    render :json => @result
  end
  
  def user_params 
  	params.slice(:first_name, :last_name, :time_zone, :email)
  end

  def update
    ensure_signed_in

    @user = User.find(session[:user_id])
    if @user.update_attributes(user_params)
      render :json => @user
    else
      render :json => @user.errors 
    end
  end
  
end