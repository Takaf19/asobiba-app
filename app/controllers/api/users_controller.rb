class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:bookmarks).find(params[:id])
    @recreations = Recreation.where(user_id: @user.id)
    render 'show', formats: 'json', handlers: 'jbuilder'
  end
end
