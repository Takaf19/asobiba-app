Rails.application.routes.draw do
  namespace :api do
    get 'users/show'
  end
  devise_for :users
  root 'recreations#index'

  # 呼び出し元のページを見にいくよう設定することでルーティングエラーを回避
  get 'recreations/allNewRecreasions', to: 'recreations#index'
  get 'recreations/allPopularRecreasions', to: 'recreations#index'

  resources :users, only: :show do
    resources :recreations, only: [ :new ]
  end

  resources :recreations, only: [ :index, :show, :new, :create ] do
    resource :bookmarks, only:[:create, :destroy]
    collection do
      get :allNewRecreasions
      get :allPopularRecreasions
    end
  end
  
  resources :images, only: [ :create ]

  namespace :api do
    resources :recreations, only:[:index, :new, :create] do
      collection do
        get :allNewRec
      end
    end
    resources :users, only:[:show]
  end
end
