Rails.application.routes.draw do

  # blabs#index
  resources :blabs, only: [:index]

end
