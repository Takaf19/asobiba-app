<template>
  <div>
    <div class="recContents" v-if="recreations.length == 0">
      <div class="recContents__nothing">
        <div class="text">
          <div class="text--item">
            <i class="fas fa-sad-tear"></i>
            <p>投稿がまだありません</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recContents" v-else v-for="rec in recreations" :key="rec.id">
      <div class="recContent">
        <div class="recImage">
          <div class="item">
            <video
              :src="rec.recimage.url"
              autobuffer
              class="item--preview"
              v-if="setImageType(rec.recimageType)"
            />
            <img :src="rec.recimage.url" class="item--preview" v-else />
          </div>
          <div class="recImage--updateDate">{{rec.updated_at}}</div>
          <div class="recImage--bookmark">
            <i class="fas fa-star"></i>
            {{rec.bookmark}}
          </div>
        </div>

        <div class="recComment">
          <div class="recComment--title">{{rec.recname}}</div>
          <div class="recComment--status">
            <p>
              <i class="fas fa-user-circle"></i>
              {{rec.requirednumber}}
            </p>
            <p>
              <i class="fas fa-clock"></i>
              {{rec.rectime}}
            </p>
          </div>
          <div class="recComment--text">{{rec.recComment}}</div>
        </div>
        <a v-bind:href="'/recreations/' + rec.id">
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: ['recreations'],
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


<style scoped>
</style>