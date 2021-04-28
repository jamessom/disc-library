Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :artists
      resources :records
    end
  end

  post   'refresh', controller: :refresh, action: :create
  post   'signin',  controller: :refresh, action: :create
  post   'signup',  controller: :refresh, action: :create
  delete 'signin',  controller: :refresh, action: :destroy
end
