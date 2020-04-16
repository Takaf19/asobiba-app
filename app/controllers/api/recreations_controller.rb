class Api::RecreationsController < ApplicationController

  def index
    @recreations = Recreation.all.order(updated_at: "DESC")
    render 'index', formats: 'json', handlers: 'jbuilder'
  end

end
