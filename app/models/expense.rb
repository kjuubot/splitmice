class Expense < ApplicationRecord
    validates :amount, :description, :bill_date, :author_id, presence: true

    has_many :splits,
        primary_key: :id
        foreign_key: :expense_id,
        class_name: 'Split',
    
    belongs_to :creator,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: 'User'

    has_many :expense_splitters,
        through: :splits,
        source: :recipient

end