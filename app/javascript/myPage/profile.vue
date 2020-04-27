<template>
  <div class="profile">
    <div class="profile__image">
      <img v-if="userImage(user.user_image)" src="/assets/NoImage.png" class="image" />
      <img v-else :src="rec.recimage.url" class="image" />
      <p>{{ user.nickname }}</p>
      <div class="profile__image--items">
      </div>
    </div>
    <div class="user-counts">
      <span>
        {{ recreations.length }}
        <div class="icon">
          <i class="fas fa-pencil-alt"></i>
          <span>投稿した数</span>
        </div>
      </span>
      <span>
        {{ bookmarks.length }}
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
          <span class="user-item">{{ user.nickname }}</span>
        </div>
        <div class="profile__contents--item profile__contents--mail">
          <p>Mail</p>
          <span class="sankaku">▶︎</span>
          <span class="user-item">{{ user.email }}</span>
        </div>
        <a href="#" class="profile__contents--editPass">
          <div class="editPass-text">
            <p>Passwordの編集</p>
          </div>
        </a>
      </div>
      <div class="profile__contents--edit">
        <a href="#" class="edit-text">
          <p>情報の編集</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: ['user', 'recreations', 'bookmarks'],
    methods: {
      userImage(target) {
        if (target == null) {
          return true
        } else {
          return false
        }
      },
    },
  };

</script>