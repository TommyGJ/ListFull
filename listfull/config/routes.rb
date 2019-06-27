Rails.application.routes.draw do
  get 'welcome/index'
  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'

      resources :users, only: [:show, :create]  do
        resources :lists, only: [:index, :new, :create]
        resources :items, only: [:index, :new, :create]
      end

      resources :user_confirmation, only: [] do
        member do
          get :confirm_email
        end
      end
      
      resources :lists, only: [:destroy, :update, :edit, :show] do
        resources :items, only: [:destroy, :update, :edit, :show]
      end
    end
  end

  root :to => 'welcome#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
