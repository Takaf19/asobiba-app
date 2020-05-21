<template>
  <div id="hedder">
    <a href='/' id="allNewRecbtn" class="topHedder__logo" >
      <img src="/assets/asobiba-logo.png" height="50px" />
    </a>
    
    <div class="hedder__item">
      <!-- ログインしている場合 -->
      <div class="hedder__item--icons" v-if="userId > 0">
        <a v-bind:href="'/users/' + userId" class="hedderBtn" id="myPageBtn" >
          <i class="fas fa-user"></i>
        </a>
        <!-- <router-link v-bind:to="{ name:'mypage', params:{ id:userId }}" class="hedderBtn" id="myPageBtn" >
          <i class="fas fa-user"></i>
        </router-link> -->
        <a class="hedderBtn" id="recCreateBtn" href="/recreations/new">
          <i class="fas fa-lightbulb"></i>
        </a>
        <a class="hedderBtn" id="logOutBtn" rel="nofollow" data-method="delete" href="/users/sign_out">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
      <!-- していない場合 -->
      <div class="hedder__item--icons" v-else>
        <a class="hedderBtn" id="userNewtBtn" href="/users/sign_up">
          <i class="far fa-user-circle"></i>
        </a>
        <a class="hedderBtn" id="logInBtn" href="/users/sign_in">
          <i class="fas fa-sign-in-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from "axios";

  export default {
    data: function() {
      return {
        userId: 0,
      };
    },
    created: function() {
      this.getUserId();
    },
    methods: {
      getUserId() {
        axios.get("/api/recreations").then(
          res => {
            this.userId = res.data.user.id
          },
          error => {
            console.log(error);
          }
        );
      },
    }
  };
</script>