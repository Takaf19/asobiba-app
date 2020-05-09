<template>
  <div class="accountDeletion">
    <h1>退会</h1>
    <div class="accountDeletion__main">
      <div class="accountDeletion__main--attention">
        <p>今まで投稿した内容は削除されませんが、</p>
        <p>退会したユーザー情報は<span>再登録できません。</span></p>
        <div class="accountDeletion-btn" @click="culc">退会する</div>
      </div>

    </div>
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