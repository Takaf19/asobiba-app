<template>
  <div id="mainContents">
    <div id="recIndex">
      <div class="topHedder">
        <div class="topHedder__imgBox" id="top-imgBox1">
          <img src="assets/asobiba-hedder.jpg" class="topHedder__imgBox--backImage" />
          <img src="assets/asobiba-logo.png" class="topHedder__imgBox--logo" />
          <p class="top-imgBox1--title">— みんなの”あそび”を集めよう —</p>
        </div>
        <div class="topHedder__imgBox" id="top-imgBox2true"  v-if="randomMath(recreations.length)">
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
          @click = "setTabControl(0)" 
          v-bind:class="{'tabActive': pages[0] }">
          新着順
        </div>
        <div class="tab" id="tabs-popular" 
          @click = "setTabControl(1)"
          v-bind:class="{'tabActive': pages[1] }">
          人気順
        </div>
      </div>

      <div id="tabContents">
        <transition mode="out-in" name="slide">
          <div v-bind:is="component" :recreations="recreations" :populars="populars"></div>
        </transition>
      </div>
      
      <router-link to='/recreations/allNewRecreasions' id="allNewRecbtn" class="allRec" >
        あそびを全件表示
      </router-link>
    </div>
  </div>
</template>

<script>
import NewTab from "./topPage/newTab.vue";
import PopuTab from "./topPage/popularTab.vue";
import axios from "axios";

export default {
  name: "topPage",
  components: {
    newTab: NewTab,
    popuTab: PopuTab,
  },
  data: function() {
    return {
      recreations: [],
      populars: [],
      imgType: [],
      pages: [true,false],
      componentTypes: ["newTab", "popuTab"],
      current: 0,
      tabNew: true,
      tabPopular: false,
      i: 0,
      index: 0
    };
  },
  computed: {
    component: function() {
      // 一致しているコンポーネント名を返す
      return this.componentTypes[this.current];
    }
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
      for (let i = 0; i < this.pages.length; i++) {
        if( i == id) {
          this.pages.splice(i, 1, true);
          this.current = i
        } else if(this.pages[i] === true) {
          this.pages.splice(i, 1, false);
        }
      }
    },
    setImageType: function(image) {
      if (image == "画像") {
        return false;
      } else {
        return true;
      }
    },
    randomMath(max) {
      if (max == 0) {
        return false
      } else {
        this.index = Math.floor( Math.random() * max );
        return true
      }
    }
  }
};
</script>

<style scoped>
  .allRec {
    display: block;
    margin: 20px auto;
    text-align: center;
    width: 95%;
    padding: 10px;
    text-decoration: none;
    font-weight: bold;
    background-color: rgba(95, 158, 160, 0.9);
    color: white;
  }
</style>