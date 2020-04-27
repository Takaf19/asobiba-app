<template>
  <div id="myPageContents">
    <div class="side-bar">
      <div class="side-ber--link" v-bind:class="{ 'active': page0 }" @click="current=0" >
        <p>ユーザー情報</p>
      </div>
      <div class="side-ber--link" v-bind:class="{ 'active': page1 }" @click="current=1" >
        <p>お気に入り一覧</p>
      </div>
      <div class="side-ber--link" v-bind:class="{ 'active': page2 }" @click="current=2" >
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
import LikePage from "./myPage/likePage.vue";
import UserRec from "./myPage/userRec.vue";
import axios from "axios";
export default {
  components: {
    profile: Profile,
    likePage: LikePage,
    userRec: UserRec,
  },
  data: function() {
    return {
    componentTypes: ["profile", "likePage","userRec"],
    current: 0,
    i : 0,
    page0: true,
    page1: false,
    page2: false,
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
            // ユーザー情報
            this.user = res.data.user
            // 投稿情報
            for (var i = 0; i < res.data.recreations.length; i++) {
              this.recreations.push(res.data.recreations[i]);
            }
            // ブックマーク
            for (var i = 0; i < res.data.bookmarks.length; i++) {
              this.bookmarks.push(res.data.bookmarks[i]);
            }
          },
          error => {
            console.log(error);
          }
        );
      },
    },
};

</script>