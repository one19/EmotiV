class AddThreadIdsToContacts < ActiveRecord::Migration
  def change
    add_column :contacts, :threadIds, :text
  end
end
