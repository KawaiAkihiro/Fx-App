module Api
  module Private
    module Auth
      class Api::Private::Auth::SessionsController < ApplicationController
        def index
          if current_api_private_user
            render json: { is_login: true, data: current_api_private_user }
          else
            render json: { is_login: false, message: "ユーザーが存在しません" }
          end
        end
      end
    end
  end
end
