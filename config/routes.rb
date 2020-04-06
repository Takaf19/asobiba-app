Rails.application.routes.draw do
  devise_for :users
  root 'recreations#index'
  resources :recreations, only: [ :index, :new, :create ]
  resources :images, only: [ :create ]
end
