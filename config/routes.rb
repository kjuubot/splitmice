Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      collection do
        post 'addFriend'
        get 'showFriends'
        get 'searchFriends'
        get 'searchUsers'
      end
    end
    resource :session, only: [:create, :destroy]
    resources :friendships, only: [:create, :destroy, :index, :show]
    resources :expenses, only: [:create, :index, :destroy, :update] do
      collection do
        get 'getExpenses'
      end
    end
  end

  root 'static_pages#root'
end