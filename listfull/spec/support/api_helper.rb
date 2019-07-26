module APIHelper
  def authentication_header(user)
    token = JsonWebToken.encode( sub: user.id, email: user.email )
    header = { 'Authorization': "Bearer " + token }
  end
end
