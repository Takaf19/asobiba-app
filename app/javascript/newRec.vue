<template>
  <div id="mainContents">
    <div id="recIndex">
      <div class="topHedder">
        <div class="topHedder__imgBox" id="top-imgBox1">
          <img src="assets/asobiba-hedder.jpg" class="topHedder__imgBox--backImage" />
          <img src="assets/asobiba-logo.png" class="topHedder__imgBox--logo" />
          <p class="top-imgBox1--title">— みんなの”あそび”を集めよう —</p>
        </div>
        <div class="topHedder__imgBox" id="top-imgBox2true"  v-if="randomMath()">
          <a v-bind:href="'/recreations/' + recreations[index].id" class="top-imgBox2--image" >
            <video :src="recreations[index].recimage.url" autobuffer class="topHedder__imgBox--backImage"  v-if="setImageType(recreations[index].recimageType)" />
            <img :src="recreations[index].recimage.url" class="topHedder__imgBox--backImage" v-else />
            <div class="top-recInfo">
              <p class="top-imgBox--rectitle">{{ recreations[index].recname }}</p>
              <div class="top-likeCount">
                <p><i class="fas fa-star"></i>{{ recreations[index].bookmark }}</p>
              </div>
            </div>
          </a>
        </div>
        <div class="topHedder__imgBox" id="top-imgBox2"  v-else >
          <img src="assets/asobi-click.png" class="topHedder__imgBox--backImage" />
        </div>
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
        </transition>
        <transition mode="out-in" name="slide">
          <div v-show="tabPopular">
            <div class="recContents"  v-if="populars.length == 0">
              <div class="recContents__nothing">
                <div class="text">
                  <div class="text--item">
                    <i class="fas fa-sad-tear"></i>
                    <p>お気に入りされた'あそび'がありません</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="recContents" v-else v-for="poplar in populars" :key="poplar.id">
              <div class="recContent">
                <div class="recImage">
                  <div class="item">
                    <video :src="poplar.recimage.url" autobuffer controls class="item--preview" v-if="setImageType(poplar.recimageType)" />
                    <img :src="poplar.recimage.url" class="item--preview" v-else />
                  </div>
                  <div class="recImage--updateDate">{{poplar.updated_at}}</div>
                  <div class="recImage--bookmark"><i class="fas fa-star"></i>{{poplar.bookmark}}</div>
                </div>
      
                <div class="recComment">
                  <div class="recComment--title">{{poplar.recname}}</div>
                  <div class="recComment--status">
                      <p><i class="fas fa-user-circle"></i>{{poplar.requirednumber}}</p>
                      <p><i class="fas fa-clock"></i>{{poplar.rectime}}</p>
                  </div>
                  <div class="recComment--text">{{poplar.recComment}}</div>
                </div>
                <a v-bind:href="'/recreations/' + poplar.id" >
                  <i class="fas fa-chevron-right"></i>
                </a>
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
      populars: [],
      imgType: [],
      tabNew: true,
      tabPopular: false,
      tabCreate: false,
      i: 0,
      index: 0
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
          for (var i = 0; i < res.data.populars.length; i++) {
            this.populars.push(res.data.populars[i]);
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
      if (image == "画像") {
        return false;
      } else {
        return true;
      }
    },
    randomMath() {
      if (this.recreations.length == 0) {
        return false
      } else {
        this.index = Math.floor( Math.random() * this.recreations.length );
        return true
      }
    }
  }
};
</script>

<style scoped>



</style>