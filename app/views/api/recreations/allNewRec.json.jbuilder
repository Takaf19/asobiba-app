json.set! :recreations do
  json.array! @recreations do |rec|
    json.id rec.id
    json.recname rec.recname
    json.recimage rec.recimage
    json.recimageType rec.recimageType.truncate(11, omission: '...')
    json.recComment rec.recComment.truncate(100, omission: '...')
    json.requirednumber rec.requirednumber.name
    json.rectime rec.rectime.item
    json.updated_at rec.updated_at.to_s
    json.bookmark rec.bookmarks.length
  end
end

json.set! :populars do
  json.array! @populars do |popular|
    json.id popular.id
    json.recname popular.recname
    json.recimage popular.recimage
    json.recimageType popular.recimageType.truncate(11, omission: '...')
    json.recComment popular.recComment.truncate(100, omission: '...')
    json.requirednumber popular.requirednumber.name
    json.rectime popular.rectime.item
    json.updated_at popular.updated_at.to_s
    json.bookmark popular.bookmarks.length
  end
end