class SessionController < ApplicationController
  def new
  end

  def create
    user = User.find_by :username => params[:username]
    if user.present? && user.authenticate(params[:password]) #present is rails, any is ruby. Any is only for collections, present works on things like strings
      session[:user] = user.id #because otherwise all their data is being stored in the server while they're logged in, possibly bogging everything down as fuckkkkkk

      #session[:start] = Time.now --you could use this as a backbone for something elsewhere to stop someone from making changes after a certain amount of time. session timeout
      redirect_to root_path
    else
      flash[:notice] = "Invalid login, please try again"
      #flash is a mayfly variable, it only lasts a single page woooohooooooooo
      redirect_to root_path
    end
  end

  def destroy
    session[:user] = nil
    redirect_to root_path
  end
end
