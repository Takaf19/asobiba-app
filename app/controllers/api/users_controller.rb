class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:bookmarks).find(params[:id])
    @recreations = Recreation.where(user_id: @user.id).order("updated_at DESC")
    render 'show', formats: 'json', handlers: 'jbuilder'
  end
end
