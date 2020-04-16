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
        <div v-if="tabNew">
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
          <div class="recContents" v-for="rec in recreations" :key="rec.id">
            <a v-bind:href="'/recreations/' + rec.id">
              <div class="recImage">
                <div class="item">
                  <img :src="rec.recimage.url" />
                </div>
                <div class="recImage--updateDate">{{rec.updated_at}}</div>
              </div>

              <div class="recComment">
                <div class="recComment--title">{{rec.recname}}</div>
                <div class="recComment--status">
                    必要人数:{{rec.requirednumber}}
                    必要時間:{{rec.rectime}}
                </div>
                <div class="recComment--title"></div>
                <div class="recComment--text">{{rec.recComment}}</div>
              </div>
            </a>
          </div>
        </div>
        <div v-else-if="tabPopular">
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
      tabNew: true,
      tabPopular: false,
      tabCreate: false
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
    }
  }
};
</script>
