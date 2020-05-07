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