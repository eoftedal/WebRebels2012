class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def new
    response.headers['WWW-Authenticate'] = Rack::OpenID.build_header(
        :identifier => "https://www.google.com/accounts/o8/id",
        :required => ["http://axschema.org/contact/email",
                      "http://axschema.org/namePerson/first",
                      "http://axschema.org/namePerson/last"],
        :return_to => session_url,
        :method => 'POST')
    head 401
  end
  
  def google 
    ensure_signed_in
  end



  def create
    if (params[:username] && params[:password]) 
      user = User.find_by_first_name(params[:username])
      if (user != NIL && params[:password] == user.password)
        session[:user_id] = user.id
        redirect_to(profiles_path())
      else
        head 403
      end
    else
      if openid = request.env[Rack::OpenID::RESPONSE]
        case openid.status
        when :success
          ax = OpenID::AX::FetchResponse.from_success_response(openid)
          user = User.where(:identifier_url => openid.display_identifier).first
          user ||= User.create!(:identifier_url => openid.display_identifier,
                                :email => ax.get_single('http://axschema.org/contact/email'),
                                :first_name => ax.get_single('http://axschema.org/namePerson/first'),
                                :last_name => ax.get_single('http://axschema.org/namePerson/last'))
          session[:user_id] = user.id
          user.save
          if user.first_name.blank? 
            redirect_to("/#/profile")
          else
            @r = session[:redirect_to]
            redirect_to("/#")
          end
        when :failure
            redirect_to("/#/openidfailed")
        end
      else
        redirect_to new_session_path
      end
    end
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end