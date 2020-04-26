<template>
  <div id="myPageContents">
    <div class="side-bar">
      まだだよ！
    </div>
    <div id="myPage-Pages">
      <profile />
    </div>
  </div>
</template>

<script>
  import Profile from './myPage/profile.vue'
export default {
  components: {
    'profile': Profile,
  }
}
</script>