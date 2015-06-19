class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.boolean :inbound
      t.integer :contact_id
      t.text :context
      t.datetime :date

      t.timestamps null: false
    end
  end
end
