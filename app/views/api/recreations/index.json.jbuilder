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
  end
end