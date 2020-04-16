class Rectime < ActiveHash::Base
  self.data = [
      {id: 1, item: '1分以内'}, {id: 2, item: '5分以内'}, {id: 3, item: '10分以内'},
      {id: 4, item: '30分以内'}, {id: 5, item: '1時間以内'}, {id: 6, item: '1時間以上'}
  ]
end