Rails.application.routes.draw do
  namespace :api do
    get 'users/show'
  end
  devise_for :users
  root 'recreations#index'

  # 呼び出し元のページを見にいくよう設定することでルーティングエラーを回避
  get 'recreations/allNewRecreasions', to: 'recreations#index'

  resources :users, only: :show do
    resources :recreations, only: [ :new ]
  end

  resources :recreations do
    resource :bookmarks, only:[:create, :destroy]
    collection do
      get :allNewRecreasions
      get :allPopularRecreasions
    end
  end
  
  resources :images, only: [ :create ]

  namespace :api do
    resources :recreations, only:[:index] do
      collection do
        get :allNewRec
      end
    end
    resources :users, only:[:show, :update, :destroy] do
      member do
        patch :accountDeletion
      end
    end
  end
end
