class AddGidToSnippets < ActiveRecord::Migration
  def change
    add_column :snippets, :gid, :string
  end
end
