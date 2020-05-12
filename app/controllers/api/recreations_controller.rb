class Api::RecreationsController < ApplicationController

  def index
    @recreations = Recreation.includes(:bookmarks).all.order(updated_at: "DESC").limit(10)
    # ブックマーク数上位１０件の記事を降順に並び替え
    bookmark = Bookmark.joins(:recreation).includes(:recreation)
    @popular = Recreation.find(bookmark.group(:recreation_id, "recreations.updated_at").order("count(recreation_id) desc","recreations.updated_at DESC").limit(10).pluck(:recreation_id))
    render 'index', formats: 'json', handlers: 'jbuilder'
  end
  
  def allNewRec
    @recreations = Recreation.includes(:bookmarks).all.order(updated_at: "DESC")
    bookmark = Bookmark.joins(:recreation).includes(:recreation)
    @populars = Recreation.find(bookmark.group(:recreation_id, "recreations.updated_at").order("count(recreation_id) desc","recreations.updated_at DESC").pluck(:recreation_id))
    render 'allNewRec', formats: 'json', handlers: 'jbuilder'
  end

end
