class UserMailer < ApplicationMailer
  default :from => "account_registration@listr.com"

  def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
  end
end
