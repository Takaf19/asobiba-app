Rails.application.routes.draw do
  namespace :api do
    get 'users/show'
  end
  devise_for :users
  root 'recreations#index'

  resources :users, only: :show do
    resources :recreations, only: [ :new ]
  end

  resources :recreations, only: [ :index, :show, :new, :create ]
  resources :images, only: [ :create ]

  namespace :api do
    resources :recreations, only:[:index, :new, :create]
    resources :users, only:[:show]
  end
end
