class CreateSplits < ActiveRecord::Migration[5.2]
  def change
    create_table :splits do |t|
      t.float :amount, null: false
      t.integer :expense_id, null: false
      t.integer :recipient_id, null: false
      t.boolean :paid_status, null: false
      t.timestamps
    end

    add_index :splits, :expense_id
    add_index :splits, :recipient_id
  end
end
