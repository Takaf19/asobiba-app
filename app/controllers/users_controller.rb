class UsersController < ApplicationController
  before_action :login_check, only: [:show]
  def show
  end
end
