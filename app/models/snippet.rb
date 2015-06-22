# == Schema Information
#
# Table name: snippets
#
#  id         :integer          not null, primary key
#  inbound    :boolean
#  contact_id :integer
#  context    :text
#  date       :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  gid        :string
#

class Snippet < ActiveRecord::Base
  belongs_to :user
end
