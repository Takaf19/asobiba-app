class RecreationsController < ApplicationController

  def index
    @user = current_user
    @image = Image.new
    @images = Image.all
  end
end
