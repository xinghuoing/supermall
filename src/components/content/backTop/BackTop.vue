<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 18px;
    bottom: 60px;
  }
  .back-top img {
    width: 45px;
    height: 45px;
  }
</style>
