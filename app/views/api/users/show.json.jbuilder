# attributesと記述すると、オブジェクトの中身のすべての値を返すことができます。
json.set! :user do
  json.merge! @user.attributes
end

# 投稿したあそび
json.set! :recreations do
  json.array! @recreations do |rec|
    json.id rec.id
    json.recname rec.recname
    json.recimage rec.recimage
    json.recimageType rec.recimageType
    json.recComment rec.recComment.truncate(120, omission: '...')
    json.requirednumber rec.requirednumber.name
    json.rectime rec.rectime.item
    json.updated_at rec.updated_at.to_s
    json.bookmark rec.bookmarks.length
  end
end

# ブックマーク
json.set! :bookmarks do
  json.array! @user.bookmarks do |book|
    json.id book.recreation.id
    json.recname book.recreation.recname
    json.recimage book.recreation.recimage
    json.recimageType book.recreation.recimageType
    json.recComment book.recreation.recComment.truncate(120, omission: '...')
    json.requirednumber book.recreation.requirednumber.name
    json.rectime book.recreation.rectime.item
    json.updated_at book.recreation.updated_at.to_s
    json.bookmark book.recreation.bookmarks.length
  end
end