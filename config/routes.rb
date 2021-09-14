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
      get 'posts/show/:id', to: 'posts#show'
      patch 'posts/update/:id', to: 'posts#update'
      delete 'posts/destroy/:id', to: 'posts#destroy'

      get "comments/index", to: "comments#index"
      post "comments/create/:id", to: 'comments#create'
      patch 'comments/update/:id', to: 'comments#update'
      delete 'comments/destroy/:id', to: 'comments#destroy'

      get "boards/index", to: "boards#index"
      post "boards/create", to: 'boards#create'
      get 'boards/show/:id', to: 'boards#show'
      patch 'boards/update/:id', to: 'boards#update'
      delete 'boards/destroy/:id', to: 'boards#destroy'

      post "likes/create", to: 'likes#create'
      delete 'likes/destroy/:id', to: 'likes#destroy'

      get "replies/index", to: "replies#index"
      post "replies/create/:id", to: 'replies#create'
      patch 'replies/update/:id', to: 'replies#update'
      delete 'replies/destroy/:id', to: 'replies#destroy'
    end
  end
  root 'homepage#index'
  get "/create-post" => 'homepage#index'
  get "/create-board" => 'homepage#index'
  get "/" => 'homepage#index'
  get '/post/*path' => 'homepage#index'
  get '/user/*path' => 'homepage#index'
  get '/board/*path' => 'homepage#index'
  # get '/*path' => 'homepage#index'
end
