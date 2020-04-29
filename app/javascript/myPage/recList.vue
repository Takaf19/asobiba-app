<template>
  <div class="recList">
    <h1>投稿一覧</h1>
    <div class="recList-main">
      <div class="recList-main__nothing-contents"  v-if="recreations.length == 0">
        <div class="recList-main__nothing-contents--content">
          <div class="text--item">
            <i class="fas fa-sad-tear"></i>
            <p>投稿がありません</p>
          </div>
        </div>
      </div>

      <div class="recList-main__contents" v-else 
          v-for="rec in recreations" :key="rec.id">
        <div class="recList-main__contents--content">
          <div class="recImage">
            <div class="recImage__item">
              <video :src="rec.recimage.url" 
                    autobuffer controls 
                    class="recImage__item--preview" 
                    v-if="rec.recimageType == '動画'" />
              <img :src="rec.recimage.url" class="recImage__item--preview" v-else />
            </div>
            <div class="recImage--updateDate">{{rec.updated_at}}</div>
            <div class="recImage--bookmark"><i class="fas fa-star"></i>{{rec.bookmark}}</div>

          </div>
          <div class="recComment">
            <div class="recComment--title">{{rec.recname}}</div>
            <div class="recComment--status">
              <p><i class="fas fa-user-circle"></i>{{rec.requirednumber}}</p>
              <p><i class="fas fa-clock"></i>{{rec.rectime}}</p>
            </div>
            <div class="recComment--text">{{rec.recComment}}</div>
          </div>
          <a v-bind:href="'/recreations/' + rec.id" >
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="recList--count" >投稿数: {{ recreations.length }}件</div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: ['recreations'],
    methods: {
    },
  };

</script>