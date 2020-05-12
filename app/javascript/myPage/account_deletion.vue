<template>
  <div class="accountDeletion">
    <h1>退会</h1>
    <div class="accountDeletion__main">
      <div class="main-items">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="attention">ATTENTION!!</p>
        <div class="accountDeletion__main--attention">
          <p>退会を実行したメールアドレスは<span>再登録することができません。</span></p>
          <p>再登録の場合は、新しいメールアドレスでご登録をお願いいたします。</p>
          <p>また、退会をしてもお客様が投稿したあそびは削除される事はありません。</p>
        </div>
      </div>
      <div class="accountDeletion-btn" @click="culc">退会する</div>
    </div>
    <div class="accountDeletion--footer"></div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: ['user'],
    methods: {
      culc() {
        if(confirm('退会処理を実行します。')){
          axios.patch(`/api/users/${this.$route.params['id']}/accountDeletion`,{}).then((res) => {
            window.location.href = "/";
          }, (error) => {
            console.log(error);
          });
        };
      },
    },
  };

</script>

<style scoped>
  .accountDeletion {
  }

  h1 {
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    line-height: 80px;
    font-size: 1.3em;
    text-align: center;
    position: relative;
    background-color: rgba(90, 91, 94, 0.8);
    letter-spacing: 2px;
    z-index: 1;
  }

  h1::after {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    content: '';
    border-bottom: solid 2px rgba(255, 255, 255, 0.7);
  }

  .accountDeletion__main {
    height: 400px;
    padding: 30px;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.8);
    position: relative;
  }

  .main-items {
    position: relative;
    text-align: right;
  }

  .main-items > i {
    font-size: 13em;
    color: rgba(255, 218, 6, 0.305);
  }

  .attention {
    position: absolute;
       top: 10px;
       left: 0px;
    z-index: 1;
    font-size: 5em;
    text-shadow:2px -3px 1px rgba(90, 91, 94, 0.8);
    color: rgba(252, 5, 5, 0.301);
  }

   .accountDeletion__main--attention {
     position: absolute;
       bottom: 15px;
       left: 0;
     z-index: 1;
     text-align: left;
     color: rgb(87, 86, 86);
     font-size: 0.9em;
   }
  .accountDeletion__main--attention span {
    color: red;
  }

  .accountDeletion-btn {
    cursor: pointer;
    position: absolute;
      bottom: 20px;
      left: 30px;
      right: 30px;
    background-color: cadetblue;
    color: white;
    text-align: center;
    padding: 10px;
  }

  .accountDeletion--footer {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(90, 91, 94, 0.8);
    height: 80px;
    text-align: right;
    padding: 0 20px;
    position: relative;
  }
  .accountDeletion--footer::after {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    content: '';
    border-top: solid 2px rgba(255, 255, 255, 0.8);
  }

</style>