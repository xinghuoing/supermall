<template>
    <div class="tab-bar-item" @click="btnClick">
    <!-- 两个插槽插入item中需要的图标和文本 -->
    
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
      <!-- <img src="../../assets/img/tabbar/home.png" alt="">
      <div>首页</div> -->
    </div>

</template>

<script>
export default {
  name: 'TabBarItem',
  // 父组件访问子组件，将父组件的path值传进来，用于修改跳转的路径
  props: {
    path: String
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // 判断活跃的路径是否和点击的路径一致
      return this.$route.path.indexOf(this.path) != -1
    }
  },
  methods: {
    // 通过点击实现路由的跳转
    btnClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }

  .active {
    color: red
  }
</style>
