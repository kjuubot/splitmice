class Split < ApplicationRecord
    validates :expense_id, :recipient_id, presence: true
    
    belongs_to :expense,
        primary_key: :id,
        foreign_key: :expense_id,
        class_name: 'Expense'

    belongs_to :recipient,
        primary_key: :id,
        foreign_key: :recipient_id,
        class_name: 'User'

    has_one :creator,
        through: :expense,
        source: :creator

end