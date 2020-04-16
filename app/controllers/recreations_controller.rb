class RecreationsController < ApplicationController

  def index
    @user = current_user
    @image = Image.new
    @images = Image.all
    @recreations = Recreation.all
    @recreation = Recreation.new
  end

  def show
    @recreation = Recreation.includes(:explanations, :user).find(params[:id])
  end

  def new
    @recreation = Recreation.new
    @recreation.explanations.build
  end

  def create
    # 親要素を保存かけてあげることで自動で子要素も保存される！
    recreation = Recreation.new(rec_params)
    recreation.save
    redirect_to root_path
  end

  private 
  def rec_params
      # 子要素のstrong parameterを書くことで、自動で子要素に親要素のidもふられる。explanatinテーブルにあるrecreation_idに親要素のidがふられます。
      params.require(:recreation).permit(:recname, :recimage, :recComment, :requirednumber_id, :rectime_id, explanations_attributes: [:recText]).merge(user_id: current_user.id)
  end

end
