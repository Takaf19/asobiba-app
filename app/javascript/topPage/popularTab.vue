<template>
  <div>
    <div class="recContents" v-if="populars.length == 0">
      <div class="recContents__nothing">
        <div class="text">
          <div class="text--item">
            <i class="fas fa-sad-tear"></i>
            <p>お気に入りされた'あそび'がありません</p>
          </div>
        </div>
      </div>
    </div>

    <div class="recContents" v-else v-for="popular in populars" :key="popular.id">
      <div class="recContent">
        <div class="recImage">
          <div class="item">
            <video
              :src="popular.recimage.url"
              autobuffer
              controls
              class="item--preview" 
              v-if="setImageType(popular.recimageType)"
            />
            <img :src="popular.recimage.url" class="item--preview" v-else />
          </div>
          <div class="recImage--updateDate">{{popular.updated_at}}</div>
          <div class="recImage--bookmark">
            <i class="fas fa-star"></i>
            {{popular.bookmark}}
          </div>
        </div>

        <div class="recComment">
          <div class="recComment--title">{{popular.recname}}</div>
          <div class="recComment--status">
            <p>
              <i class="fas fa-user-circle"></i>
              {{popular.requirednumber}}
            </p>
            <p>
              <i class="fas fa-clock"></i>
              {{popular.rectime}}
            </p>
          </div>
          <div class="recComment--text">{{popular.recComment}}</div>
        </div>
        <a v-bind:href="'/recreations/' + popular.id">
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from "axios";
  export default {
    props: ['populars'],
    methods: {
      setImageType: function(image) {
        if (image == "画像") {
          return false;
        } else {
          return true;
        }
      },
    },
  };

</script>