Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'private' do
      resources :posts

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        users: 'api/private/auth/users'
      }

      namespace :auth do
        resources :sessions , only: %i[index]
      end
    end
  end
end
