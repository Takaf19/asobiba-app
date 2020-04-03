# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

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
|required_number|integer|null: false|
|time|integer|null: false|
|user_id|integer|null: false|

### Association
- belongs_to :user
- has_many :explanations, dependent: :destroy
- has_many :images, dependent: :destroy
- has_many :bookmarks, dependent: :destroy
- has_many :users, through: :bookmarks, source: :user_id


# bookmarksテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|recreation_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :recreation


# explanationsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|recreation_id|integer|null: false|

### Association
- belongs_to :recreation


# imagesテーブル
|Column|Type|Options|
|------|----|-------|
|url|text|null: false|
|recreation_id|integer|null: false|

### Association
- belongs_to :recreation