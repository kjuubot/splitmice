class User < ApplicationRecord
    validates :session_token, :username, uniqueness: true, presence: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }
    after_initialize :ensure_session_token

    attr_reader :password

    has_many :friendships,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: 'Friendship'

    has_many :friends,
        through: :friendships,
        source: :friend

    has_many :expenses,
        primary_key: :id,
        foreign_key: :creator_id,
        class_name: 'Expense'

    has_many :splits_received,
        class_name: 'Split',
        foreign_key: :recipient_id,
        primary_key: :id

    has_many :expenses_received,
        through: :received_splits,
        source: :expense

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)    
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(64)
    end
    
end
