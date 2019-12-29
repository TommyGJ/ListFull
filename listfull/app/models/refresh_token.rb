class RefreshToken < JsonWebToken
  def self.encode(payload)
    expiration = 60.days.from_now.to_i
    JWT.encode(payload.merge(exp: expiration), Rails.application.secrets.secret_key_base)
  end
end
