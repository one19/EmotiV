class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :name
      t.string :username
      t.string :password_digest
      t.string :email
      t.boolean :admin

      t.timestamps null: false
    end
  end
end
