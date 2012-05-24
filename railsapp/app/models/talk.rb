class Talk < ActiveRecord::Base
  belongs_to :user

  def author
  	{
  		:username => user.full_name,
  		:gravatar => user.gravatar_url(32)
  	}
  end

  def as_json(options={})
    super(:methods => [:author])
  end

end
