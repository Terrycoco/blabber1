Rails.application.routes.draw do
  #any request with OPTIONS method send to preflight code
  match '*all', to: 'application#preflight', via: [:options]


  get 'current_user', to: 'application#current_user'
  get 'request_token', to: 'tokens#request_token'
  get 'access_token', to: 'tokens#access_token'  #our route that twitter will callback

  # blabs#index  /blabs
  resources :blabs, only: [:index]

end
