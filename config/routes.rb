Rails.application.routes.draw do

  # blabs#index  /blabs
  resources :blabs, only: [:index]

end
