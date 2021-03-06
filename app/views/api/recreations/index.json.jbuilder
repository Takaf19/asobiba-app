json.set! :user do
  if user_signed_in?
    json.id current_user.id
  else
    json.id 0
  end
end

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

json.set! :populars do
  json.array! @popular do |popular|
    json.id popular.id
    json.recname popular.recname
    json.recimage popular.recimage
    json.recimageType popular.recimageType
    json.recComment popular.recComment.truncate(120, omission: '...')
    json.requirednumber popular.requirednumber.name
    json.rectime popular.rectime.item
    json.updated_at popular.updated_at.to_s
    json.bookmark popular.bookmarks.length
  end
end