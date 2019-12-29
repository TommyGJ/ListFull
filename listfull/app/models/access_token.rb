class AccessToken < JsonWebToken
  def self.encode(payload)
    expiration = 30.seconds.from_now.to_i
    JWT.encode(payload.merge(exp: expiration), Rails.application.secrets.secret_key_base)
  end
end
