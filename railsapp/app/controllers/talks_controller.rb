class TalksController < ApplicationController

	def index
		respond_to do |format|
			format.xml { render :xml => Talk.all }
			format.json { render :json =>  Talk.all }
		end
	end

	def show
		@talk = Talk.find(params[:id])
		render :json => @talk
	end

	def create
		ensure_signed_in
		@talk = Talk.new(params[:talk])
		@talk.user = current_user
		respond_to do |format| 
			if (@talk.save)
				format.xml { render :xml => @talk, :status => :created }
				format.json { render :json => @talk, :status => :created }
			else
		        format.xml 	 { render :xml => @talk.errors }
		        format.json  { render :json => @talk.errors, :status => :unprocessable_entity }
			end 
		end
	end

	def update
	    @talk = Talk.find(params[:id])

	    respond_to do |format|
	      if @talk.update_attributes(params[:talk])
	        format.xml   { render :xml => @talk }
	        format.json  { render :json => @talk }
	      else
	        format.xml 	 { render :xml => @talk.errors }
	        format.json  { render :json => @talk.errors, :status => :unprocessable_entity }
	      end
	    end
	end
end
