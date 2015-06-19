class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate
  # before_action authenticate would run once, immediately

  private
  def authenticate
    # session[:user] = nil
    # raise 'hello'
    @current_user = User.find_by_id session[:user] if session[:user]
  end

end
