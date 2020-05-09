![Readme](https://user-images.githubusercontent.com/60683608/79546633-b4e85f00-80cd-11ea-9f5b-b76bcc4d5884.png)

## 💬 概要
本アプリは、様々なあそびをユーザーが投稿し共有することを目的としています。

#### ＜現時点で行える機能＞
* ユーザー登録機能
* あそびの投稿機能
* 投稿されたあそびの閲覧
* お気に入り機能
* マイページ機能(一部未完成)


## 🌐 App URL

### **https://asobiba-app.herokuapp.com/** 

ログイン画面で、下記の情報を入力してください。
#### ＜テストアカウント＞
* mail : test@test
* Pass : test@test


## 🌐GitHub

### **https://github.com/Takaf19/asobiba-app** 


## 💬 制作理由
きっかけとしては、介護業界で働く母から
「職場で利用者の方と行うレクイエーションを探すのが大変」と言う話を聞いたことです。
実際に自分でも探してみると、レクイエーションを集めたような場は少なく、
情報集めが大変だと感じました。
既存のSNSサービスのように、ユーザーが気軽にあそびを共有できるような場があれば
面白いと思い、制作に至りました。


## 🌐アプリデモ
* トップページ
**https://gyazo.com/259a212fefb29118f19357cd6d84b4ca** 

* あそび投稿画面
**https://gyazo.com/69673d08efb864521f5cb3c0862bae62**

* マイページ
**https://gyazo.com/c4ae4fac6544aa3535dbd45191981b91**


## 💬 工夫したポイント
Javascriptやvue.jsを使用し、
ユーザーが使いやすく、動きのあるフロント実装を試みました。
また、全体的に透過色を利用し、圧迫感のない見た目を心がけました。

* ポイント１
動きのあるフロント実装を行なった。
例)あそびの新規登録時には、指定した画像が即座に表示される。
また、テキストボックス・イメージボックスを動的に追加/削除できる。
**https://gyazo.com/57675c20324c179d67fafd2591779d3d**

* ポイント2
Vue.jsのtransitionにより、スムーズなビューの切り替えが可能。
**https://gyazo.com/76768e83fbd4b0feb8804b980b68256d**

* ポイント3
Ruby on Rails側にデータ取得用のAPIを用意し、
Vue.jsにjson形式で渡すことで、非同期でのデータ表示を行うことができた。
例)あそびの全件表示画面
**https://gyazo.com/a86936fdcdae4e635e303def5bb4c2a2**


## 💬 使用技術(開発環境)
* Ruby on Rails
* Visual Studio Code
* Javascript
* JQuery
* Vue.js

## 💬今後実装したい機能
* 投稿したあそびの編集機能
* コメント機能
* 検索機能

## 💬現時点での課題
* Vue.jsを導入箇所を今後さらに利用箇所を増やしていきたい。
* ユーザーが入力する際のバリデーションを細かく設定する必要がある。
* あそびの投稿について、もう少し詳細な情報を登録できるようにする必要がある。


## 💬DB設計

# usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false, default: ""|
|user_image|text|null: false|
|is_deleted|boolean|null: false, default: false|

### Association
- has_many :recreations
- has_many :bookmarks, dependent: :destroy
- has_many :recreations, through: :bookmarks, source: :recreation_id


# recreationsテーブル
|Column|Type|Options|
|------|----|-------|
|recname|string|null: false|
|recimage|text|null: false|
|recimageType|integer|null: false|
|recComment|text|null: false|
|rectime_id|integer|null: false|
|requiredNumber_id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :explanations, dependent: :destroy
- has_many :images, dependent: :destroy
- has_many :bookmarks, dependent: :destroy
- has_many :users, through: :bookmarks, source: :user_id

# explanationsテーブル
|Column|Type|Options|
|------|----|-------|
|recText|text|null: false|
|recreation_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :recreation
- belongs_to :image

# bookmarksテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|recreation_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :recreation


# imagesテーブル
|Column|Type|Options|
|------|----|-------|
|imgurl|text|null: false|
|explanation_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :explanation