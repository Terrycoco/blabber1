class TokensController < ApplicationController

  def request_token
    request_token = TWITTER.get_request_token(oauth_callback: ENV['OAUTH_CALLBACK'])
    Oauth.create(token: request_token.token, secret: request_token.secret)
    redirect_to request_token.authorize_url(oauth_callback: ENV['OAUTH_CALLBACK'])
  end

  def access_token
    oauth = Oauth.find_by(token: params[:oauth_token])
    if oauth.present?
      request_token = OAuth::RequestToken.new(TWITTER, oauth.token, oauth.secret)
      access_token = request_token.get_access_token(oauth_verifier: params[:oauth_verifier])
      user = User.find_or_create_by(uid: access_token.params[:user_id]) { |u| u.handle = access_token.params[:screen_name] }
      jwt = JWT.encode({uid: user.uid, exp: 1.day.from_now.to_i}, Rails.application.secrets.secret_key_base)
      redirect_to ENV['ORIGIN'] + "?jwt=#{jwt}"
    else
      redirect_to ENV['ORIGIN']
    end
  end
end
# class TokensController < ApplicationController
# #handles request to twitter
#
#
#   def request_token
#     #request a token from twitter
#     request_token = TWITTER.get_request_token(oauth_callback: ENV['OAUTH_CALLBACK'])
#     #store token returned into db
#     Oauth.create(token: request_token.token, secret: request_token.secret)
#     #go to callback that we set up on Twitter app which is access_token action below
#     redirect_to request_token.authorize_url(oauth_callback: ENV['OAUTH_CALLBACK'])
#   end
#
#   #called from twitter
#   def access_token
#     #find prev stored twitter request token
#     oauth = Oauth.find_by(token: params[:oauth_token])
#
#     if oauth.present?
#       #get our request token again from twitter
#       request_token = OAuth::RequestToken.new(TWITTER, oauth.token, oauth.secret)
#       #upgrate request token to access token
#       access_token = request_token.get_access_token(oauth_verifier: params[:oauth_verifier])
#       #access token delivers user id so fetch from db (or create if not there)
#       user = User.find_or_create_by(uid: access_token.params[:user_id])
#       #encode uid as payload of jwt
#       jwt = JWT.encode({uid: user.uid, exp: 1.day.from_now.to_i}, Rails.application.secrets.secret_key_base)
#       #send back to user to origin url with encoded jwt parameter
#       redirect_to ENV['ORIGIN'] + "?jwt=#{jwt}"
#     else
#       redirect_to ENV['ORIGIN']
#     end
#
#   end
# end
