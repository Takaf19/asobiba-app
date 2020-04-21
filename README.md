![Readme](https://user-images.githubusercontent.com/60683608/79546633-b4e85f00-80cd-11ea-9f5b-b76bcc4d5884.png)

## 💬 概要
本アプリは、様々なあそびをユーザーが投稿し共有することを目的としています。

#### ＜現時点で行える機能＞
* ユーザー登録機能
* あそびの投稿機能
* 投稿されたあそびの閲覧


## 🌐 App URL

### **https://asobiba-app.herokuapp.com/** 

ログイン画面で、下記の情報を入力してください。
#### ＜テストアカウント＞
* mail : test@test
* Pass : test@test


## 🌐GitHub

### **https://github.com/Takaf19/asobiba-app** 


## 💬 制作理由
きっかけとしては、介護業界で働く母から「職場で利用者の方と行うレクイエーションを探すのが大変」と言う話を聞いたことです。
実際に自分でも探してみると、レクイエーションを集めたような場は少なく、情報集めが大変だと感じました。
既存のSNSサービスのように、ユーザーが気軽にあそびを共有できるような場があれば面白いと思い、制作に至りました。


## 🌐アプリデモ
* トップページ
**https://gyazo.com/719c91113dbd0168c436098cc3df08dd** 


* あそび投稿（ログイン時のみ可能）
**https://gyazo.com/eca585be69edbf5cfdb40922ef1ad477**

## 💬 工夫したポイント
Javascriptを使用し、ユーザーが使いやすく、動きのあるフロント実装を試みました。
* 例）あそびの新規登録時には、指定した画像が即座に表示される。
また、テキストボックスを動的に追加/削除できる。
**https://gyazo.com/c5d23939c3d95f793f621fa2aa411531**


## 💬 使用技術(開発環境)
* Ruby on Rails
* Visual Studio Code
* Javascript
* Vue.js

## 💬今後実装したい機能
* お気に入り機能
* マイページ機能
* 投稿したあそびの編集機能
* コメント機能
* 検索機能

## 💬現時点での課題
* スムーズなページ切り替えのためVue.jsを導入しましたが、知識が足りず技術を活かしきれていないない。今後、利用箇所を増やしていきたい。
* ユーザーが入力する際のバリデーションを細かく設定する必要がある。
* あそびの投稿について、もう少し詳細な情報を登録できるようにする必要がある。

## 💬DB設計

# usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false, default: ""|
|user_image|text|null: false|

### Association
- has_many :recreations, dependent: :destroy
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