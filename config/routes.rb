Rails.application.routes.draw do
  #any request with OPTIONS method send to preflight code
  match '*all', to: 'application#preflight', via: [:options]

  # blabs#index  /blabs
  resources :blabs, only: [:index]

end
