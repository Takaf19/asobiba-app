class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  def login_check
    # ログインしていない場合ログイン画面に遷移させtrueを返す、ログインしている場合falseを返す
    return redirect_to new_user_session_path  unless user_signed_in?
  end
end
