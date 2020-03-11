class Friendship < ApplicationRecord
    validates :user_id, :friend_id, presence: true
    validates :user_id, uniqueness: { scope: :friend_id, message: "Friendship should only exist once" }

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: 'User'
    
    belongs_to :friend,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: 'User'
end