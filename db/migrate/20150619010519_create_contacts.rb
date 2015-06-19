class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.text :name
      t.string :email_address
      t.integer :user_id
      t.integer :weekFeel
      t.integer :currentFeel
      t.integer :highFeel
      t.integer :lowFeel

      t.timestamps null: false
    end
  end
end
