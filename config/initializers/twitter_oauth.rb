TWITTER = OAuth::Consumer.new(
  Rails.application.secrets.twitter_consumer_key,
  Rails.application.secrets.twitter_consumer_secret,
  authorize_path: '/oauth/authorize',
  site: 'https://api.twitter.com'
)
