class BookmarksController < ApplicationController
  before_action :set_rec, only: [:create, :destroy]

  def create
    bookmark = current_user.bookmarks.build(recreation_id: params[:recreation_id])
    if bookmark.save
      respond_to do |format|
        format.html { redirect_to recreation_path(params[:recreation_id])}
        format.js
      end
    else
      redirect_to recreation_path(params[:recreation_id])
    end

  end

  def destroy
    bookmark = current_user.bookmarks.find_by(recreation_id: params[:recreation_id], user_id: current_user.id)
    if bookmark.destroy
      respond_to do |format|
        format.html { redirect_to recreation_path(params[:recreation_id])}
        format.js
      end
    else
      redirect_to recreation_path(params[:recreation_id])
    end
  end

  
  private
  def set_rec
    @recreation = Recreation.find(params[:recreation_id])
  end

end
