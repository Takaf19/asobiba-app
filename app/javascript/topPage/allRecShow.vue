<template>
  <div class="allRecShow">
    <div class="allRecShow__tab">
      <div class="allRecShow__tab--new tab-item"
           @click = "selectPage(0)" v-bind:class="{'tabitem-active': pages[0] }" >
        <p>新着順</p>
      </div>
      <div class="allRecShow__tab--popular tab-item" 
           @click = "selectPage(1)" v-bind:class="{'tabitem-active': pages[1] }">
        <p>人気順</p>
      </div>
    </div>
    <transition mode="out-in" name="fade">
      <allrecTab v-if="pages[0]" :recreations="recreations"></allrecTab>
      <allrecTab v-else-if="pages[1]" :recreations="populars"></allrecTab>
    </transition>
  </div>
</template>

<script>
 import axios from "axios";
 import AllrecTab from "./allRecTab.vue";

  export default {
    components: {
      allrecTab: AllrecTab,
    },
    data: function() {
      return {
        recreations: [],
        populars: [],
        pages: [true,false],
      };
    },
    created: function() {
      this.fetchallRecreations();
    },
    // updated() {
    //   this.rotationAnimationLoop();
    // },
    methods: {
      fetchallRecreations() {
        axios.get("/api/recreations/allNewRec").then(
          res => {
            for (let i = 0; i < res.data.recreations.length; i++) {
              this.recreations.push(res.data.recreations[i]);
            };
            for (let i = 0; i < res.data.populars.length; i++) {
              this.populars.push(res.data.populars[i]);
            };
          },
          error => {
            console.log(error);
          }
        );
      },
      // タブの処理
      selectPage: function(id) {
        for (let i = 0; i < this.pages.length; i++) {
          if( i == id) {
            this.pages.splice(i, 1, true);
            this.current = i
          } else if(this.pages[i] === true) {
            this.pages.splice(i, 1, false);
          }
        }
      }
    },
  };
</script>

<style scoped>
.allRecShow {
  padding: 0 10px;
}

.allRecShow__tab {
  display: flex;
  margin-bottom: 5px;
  padding: 0 20px;
}

.tab-item { 
  padding: 3px;
  margin-top: 10px;
  width:150px; 
  border-bottom: 1px solid rgba(125, 125, 126, 0.8);
  text-align: center;
  cursor: pointer;
  background-color: rgba(245, 250, 250, 0.8); 
  transform:skewX(30deg);
  position: relative;
  transition-duration: 0.3s;
}

.tab-item > p { 
  transform:skewX(-30deg);
}

.tabitem-active {
  background-color: rgba(95, 158, 160, 0.9); 
  color: white;
}

.tab-item:hover {
  box-shadow: inset 0px 0px 2px 1px palevioletred;
}




</style>