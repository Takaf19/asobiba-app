class RecreationsController < ApplicationController
  before_action :login_check, only: [:new, :allNewRecreasions]

  def show
    @recreation = Recreation.includes(:explanations, :user, :bookmarks).find(params[:id])
  end

  def new
    @recreation = Recreation.new
    explanation = @recreation.explanations.build

  end

  def create
    # 親要素を保存かけてあげることで自動で子要素も保存される！
    recreation = Recreation.new(rec_params)
    recreation.recimageType = imageType(recreation)
    recreation.save
    redirect_to root_path
  end

  def edit
    @recreation = Recreation.find_by(id: params[:id])
  end

  def update
    @recreation = Recreation.find_by(id: params[:id])
    if @recreation.update(rec_params)
      textareaItem_delete()
      respond_to do |format|
        format.html { render :show }
        format.json { render :update }
      end
    else
      render :edit
    end
  end

  def destroy
    rec = Recreation.find_by(params[:id])
    if rec.destroy
      flash[:notice] = "あそびの削除が完了しました。"
      redirect_to root_path
    else
      @recreation = Recreation.includes(:explanations, :user, :bookmarks).find(params[:id])
      flash.now[:alert] = 'あそびの削除に失敗しました。'
      render :show
    end
  end

  private 
  def rec_params
      # 子要素のstrong parameterを書くことで、自動で子要素に親要素のidもふられる。explanatinテーブルにあるrecreation_idに親要素のidがふられます。
      params.require(:recreation).permit(:id, :recname, :recimage, :recComment, :requirednumber_id, :rectime_id, explanations_attributes: [ :id, :recText, :imgurl, :_destroy ]).merge(user_id: current_user.id)
  end

  def imageType(target)
    if target.recimage.content_type.include?("image/")
      return "画像"
    else
      return "動画"
    end
  end

  def textareaItem_delete
    delete_images = params[:delete_images].split(",")
    delete_textarea = params[:delete_textarea].split(",")
    # イメージ削除の処理
    for delImg in delete_images do
      unless delete_textarea.include?(delImg)
        @recreation.explanations.find_by('id = ?', delImg).update(imgurl: nil)
      end
    end

    # テキストエリアグループの削除(explanationsの削除)
    for deltext in delete_textarea do
      @recreation.explanations.find_by('id = ?', deltext).destroy
    end
  end

end
