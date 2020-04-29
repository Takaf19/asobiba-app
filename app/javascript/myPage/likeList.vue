<template>
  <div class="likeList">
    <h1>お気に入り一覧</h1>
    <div class="likeList-main">
      <div class="likeList-main__nothing-contents"  v-if="bookmarks.length == 0">
        <div class="likeList-main__nothing-contents--content">
          <div class="text--item">
            <i class="fas fa-sad-tear"></i>
            <p>お気に入りがまだありません</p>
          </div>
        </div>
      </div>

      <div class="likeList-main__contents" v-else 
          v-for="like in bookmarks" :key="like.id">
        <div class="likeList-main__contents--content">
          <div class="likeImage">
            <div class="likeImage__item">
              <video :src="like.recimage.url" 
                    autobuffer controls 
                    class="likeImage__item--preview" 
                    v-if="like.recimageType == '動画'" />
              <img :src="like.recimage.url" class="likeImage__item--preview" v-else />
            </div>
            <div class="likeImage--updateDate">{{like.updated_at}}</div>
          </div>
          <div class="likeComment">
            <div class="likeComment--title">{{like.recname}}</div>
            <div class="likeComment--status">
              <p>必要人数:{{like.requirednumber}}</p>
              <p>必要時間:{{like.rectime}}</p>
            </div>
            <div class="likeComment--text">{{like.recComment}}</div>
          </div>
          <a v-bind:href="'/recreations/' + like.id" >
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="likeList--count">お気に入り数: {{ bookmarks.length }}件</div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: ['bookmarks'],
    methods: {
    },
  };

</script>