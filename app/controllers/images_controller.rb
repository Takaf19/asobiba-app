class ImagesController < ApplicationController

  def create
    uploadImage = Image.new(image_params)
    uploadImage.imgtype = typeCheck(uploadImage.imgurl.content_type)

    if uploadImage.save
      redirect_to root_path
    end
  end

  private
  def image_params
    params.require(:image).permit(:imgurl).merge(recreation_id: 1)
  end

  def typeCheck(target)
    if target.include?("image/")
      imageType = "image"
    else
      imageType = "video"
    end
  end

end
