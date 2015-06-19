class PagesController < ApplicationController
  def app
  end

  def signup
    @user = User.new
  end
end
