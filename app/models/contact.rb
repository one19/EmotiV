# == Schema Information
#
# Table name: contacts
#
#  id            :integer          not null, primary key
#  name          :text
#  email_address :string
#  user_id       :integer
#  weekFeel      :integer
#  currentFeel   :integer
#  highFeel      :integer
#  lowFeel       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Contact < ActiveRecord::Base
  belongs_to :user

  has_many :snippets
end
