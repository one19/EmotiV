class PagesController < ApplicationController
  def app
    contacts = Contact.all
    contacts.each do |contact|
      if contact.lowFeel == 0 && contact.highFeel == 0
        contact.destroy
      end
    end
  end

  def signup
    @user = User.new
  end
end
