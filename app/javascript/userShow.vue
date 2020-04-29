<template>
  <div id="myPageContents">
    <div class="side-bar">
      <div class="side-bar--link" @click = "selectPage(0)" v-bind:class="{'active': pages[0] }"  >
        <p>ユーザー情報</p>
      </div>
      <div class="side-bar--link" @click = "selectPage(1)" v-bind:class="{'active': pages[1] }" >
        <p>お気に入り一覧</p>
      </div>
      <div class="side-bar--link" @click = "selectPage(2)" v-bind:class="{'active': pages[2]}" >
        <p>投稿一覧</p>
      </div>
    </div>
    <div id="myPage-Pages">
      <!-- <profile /> -->
      <div v-bind:is="component" :user="user" :recreations="recreations" :bookmarks="bookmarks"></div>
    </div>
  </div>
</template>

<script>
import Profile from "./myPage/profile.vue";
import LikeList from "./myPage/likeList.vue";
import RecList from "./myPage/recList.vue";
import axios from "axios";
export default {
  components: {
    profile: Profile,
    likeList: LikeList,
    recList: RecList,
  },
  data: function() {
    return {
    componentTypes: ["profile", "likeList","recList"],
    current: 0,
    pages: [true,false,false],
    user: Object,
    recreations:[],
    bookmarks: [],
    };
  },
  computed: {
    component: function() {
      // 一致しているコンポーネント名を返す
      return this.componentTypes[this.current];
    }
  },
    created: function() {
      this.userInfo();
    },
    methods: {
      userInfo() {
        axios.get(`/api/users/${this.$route.params['id']}`).then(
          res => {
            let i = 0
            // ユーザー情報
            this.user = res.data.user
            // 投稿情報
            for (i = 0; i < res.data.recreations.length; i++) {
              this.recreations.push(res.data.recreations[i]);
            }
            // ブックマーク
            for (i = 0; i < res.data.bookmarks.length; i++) {
              this.bookmarks.push(res.data.bookmarks[i]);
            }
          },
          error => {
            console.log(error);
          }
        );
      },
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