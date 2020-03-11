class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.string :title, null: false
      t.float :amount, null: false
      t.date :date, null: false
      t.integer :num_people, null: false
      t.boolean :paid_status, null: false
      t.integer :creator_id, default: false
      t.timestamps
    end

    add_index(:expenses, :creator_id)
  end
end
