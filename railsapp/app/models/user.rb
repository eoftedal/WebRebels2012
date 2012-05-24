require 'digest/md5'

class User < ActiveRecord::Base
	def full_name
		first_name + " " + last_name
	end

	def gravatar_url(size = 60)
		if (email)
			"http://www.gravatar.com/avatar/" + Digest::MD5.hexdigest(email.strip.downcase) + "?s=" + size.to_s
		else 
			""
		end
	end

	def is_admin?
		role == "admin"
	end

	def as_json(options={})
    	super(:only => [:id, :first_name, :last_name, :email, :role])
  	end
end
