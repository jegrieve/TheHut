Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'registrations/index'
      post 'registrations/create'

      get 'sessions/index'
      post 'sessions/create'
      delete 'sessions/destroy/:id', to: 'sessions#destroy'

      get 'users/show/:id', to: 'users#show'
      delete 'users/destroy/:id', to: 'users#destroy'
      patch 'users/update/:id', to: 'users#update'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
