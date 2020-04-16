class Requirednumber < ActiveHash::Base
  self.data = [
      {id: 1, name: '1人'}, {id: 2, name: '2人'}, {id: 3, name: '3人'},
      {id: 4, name: '4人'}, {id: 5, name: '5人'}, {id: 6, name: '5 ~ 10人'},
      {id: 7, name: '無制限'}
  ]
end