class RecreationsController < ApplicationController

  def index
    @user = current_user
    @recreation = Recreation.new
    @explanations = Explanation.new
    @recreation.explanations.build
    @image = Image.new
    @images = Image.all
  end

  def new
  end

  def create
    # 親要素を保存かけてあげることで自動で子要素も保存される！
    recreation = Recreation.new(rec_params)
    binding.pry
    recreation.save
    redirect_to root_path
  end

  private 
  def rec_params
      # 子要素のstrong parameterを書くことで、自動で子要素に親要素のidもふられる。explanatinテーブルにあるrecreation_idに親要素のidがふられます。
      params.require(:recreation).permit(:recname, :recimage, :required_number, :time, explanations_attributes: [:text]).merge(user_id: current_user.id)
  end

end
