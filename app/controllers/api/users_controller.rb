class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:bookmarks).find(params[:id])
    @recreations = Recreation.where(user_id: @user.id).order("updated_at DESC")
    render 'show', formats: 'json', handlers: 'jbuilder'
  end

  def accountDeletion
    @user = User.find(params[:id])
    #is_deletedカラムにフラグを立てる(defaultはfalse)
    @user.update(is_deleted: true)
    #退会したユーザーをログアウトさせる
    reset_session
    flash[:notice] = "ありがとうございました。またのご利用を心よりお待ちしております。"
  end

end
