Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post 'authenticate' => 'user_authentication#authenticate'

      get 'me', to: 'users#show'
      post 'new_account', to: 'users#create'

      resources :lists do
        resources :items
      end
    end
  end

  resources :users do
    member do
      get :activate
    end
  end
end
