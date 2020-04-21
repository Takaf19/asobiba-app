<template>
  <div id="mainContents">
    <div id="recIndex">
      <div class="topHedder">
        <img src="assets/asobiba-hedder.jpg" class="topHedder--backImage" />
        <img src="assets/asobiba-logo.png" class="topHedder--logo" />
        <p>— みんなの”あそび”を集めよう —</p>
      </div>
      <div id="recTabs">
        <div class="tab" id="tabs-new" 
          @click = "setTabControl(1)" 
          v-bind:class="{'tabActive': tabNew }">
          新着順
        </div>
        <div class="tab" id="tabs-popular" 
          @click = "setTabControl(2)"
          v-bind:class="{'tabActive': tabPopular }">
          人気順
        </div>
      </div>

      <div id="tabContents">
        <transition mode="out-in" name="slide">
          <div v-show="tabNew">
            <div class="recContents"  v-if="recreations.length == 0">
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
                    <video :src="rec.recimage.url" autobuffer controls class="item--preview" v-if="setImageType(rec.recimageType)" />
                    <img :src="rec.recimage.url" class="item--preview" v-else />
                  </div>
                  <div class="recImage--updateDate">{{rec.updated_at}}</div>
                </div>
      
                <div class="recComment">
                  <div class="recComment--title">{{rec.recname}}</div>
                  <div class="recComment--status">
                      <p>必要人数:{{rec.requirednumber}}</p>
                      <p>必要時間:{{rec.rectime}}</p>
                  </div>
                  <div class="recComment--title"></div>
                  <div class="recComment--text">{{rec.recComment}}</div>
                </div>
                <a v-bind:href="'/recreations/' + rec.id" >
                  <i class="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </transition>
        <transition mode="out-in" name="slide">
          <div v-show="tabPopular">
            <div class="recContents"  v-if="recreations.length == 0">
              <div class="recContents__nothing">
                <div class="text">
                  <div class="text--item">
                    <i class="fas fa-sad-tear"></i>
                    <p>投稿がまだありません</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="recContents"  v-else>
              <div class="recContents__nothing">
                <div class="text">
                  <div class="text--item">
                    <i class="fas fa-sad-tear"></i>
                    <p>これからやります</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "topPage",
  data: function() {
    return {
      recreations: [],
      imgType: [],
      tabNew: true,
      tabPopular: false,
      tabCreate: false,
      i: 0
    };
  },
  created: function() {
    this.fetchRecreations();
  },
  methods: {
    fetchRecreations() {
      axios.get("/api/recreations").then(
        res => {
          for (var i = 0; i < res.data.recreations.length; i++) {
            this.recreations.push(res.data.recreations[i]);
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    setTabControl: function(id) {
      if (id == 1) {
        this.tabNew = true;
        this.tabPopular = false;
        this.tabCreate = false;
      } else if (id == 2) {
        this.tabNew = false;
        this.tabPopular = true;
        this.tabCreate = false;
      } else {
        this.tabNew = true;
        this.tabPopular = false;
        this.tabCreate = false;
      }
    },
    setImageType: function(image) {
      if (image == 0) {
        return false;
      } else {
        return true;
      }
    },
  }
};
</script>

<style scoped>

  /* アニメーション中のスタイル */
/* 開始時 */
.slide-enter {
  transform: translate(-300px, 0);
  opacity: 0;
}
/* 終了時 */
.slide-enter-to {
  opacity: 1;
}
/* アニメーション実行中 */
.slide-enter-active {
  transition: all .5s 0s ease;
}
.slide-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.slide-leave-to {
  transform: translate(300px, 0);
  opacity: 0;
}
.slide-leave-active {
  transition: all .3s 0s ease;
}

</style>