Rails.application.routes.draw do
  root 'recreations#index'
  resources :recreations, only: [ :index ]

end
