# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Singlepage::Application.initialize!

require 'openid'
OpenID.fetcher = OpenID.fetcher_use_env_http_proxy
