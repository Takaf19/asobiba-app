<template>
  <div class="profile">
    <div class="profile__image">
      <img src="/assets/NoImage.png" class="image" />
      <p>名前</p>
      <div class="profile__image--items">
      </div>
    </div>
    <div class="user-counts">
      <span>
        10
        <div class="icon">
          <i class="fas fa-pencil-alt"></i>
          <span>投稿した数</span>
        </div>
      </span>
      <span>
        10
        <div class="icon">
          <i class="fas fa-star"></i>
          <span>お気に入りした数</span>
        </div>
      </span>
    </div>
    <div class="profile__contents">
      <div class="user-info">
        <div class="profile__contents--item profile__contents--name">
          <p>Name</p>
          <span class="sankaku">▶︎</span>
          <span class="user-item">なまえ</span>
        </div>
        <div class="profile__contents--item profile__contents--mail">
          <p>Mail</p>
          <span class="sankaku">▶︎</span>
          <span class="user-item">mail</span>
        </div>
        <div class="profile__contents--editPass">
          <div class="editPass-text">
            <p>Passwordの編集</p>
          </div>
        </div>
      </div>
      <div class="profile__contents--edit">
        <div class="edit-text">
          <p>情報の編集</p>
        </div>
      </div>
    </div>
  </div>
</template>