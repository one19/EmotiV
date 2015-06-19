# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :text
#  username        :string
#  password_digest :string
#  email           :string
#  admin           :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  has_many :contacts
  has_many :snippets, through: :contacts

  has_secure_password
  
  ##error handling for things like "no blank names"
  validates :name, :presence => true
  validates :name, :uniqueness => true #case-sensative
end
