Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"
  #change before pushing to production
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

      get "posts/index", to: "posts#index"
      post "posts/create", to: 'posts#create'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
