<template>
  <div>
    <tab-bar>
      <!-- TabBar组件里的一个插槽 -->
      <tab-bar-item path="/home">
        <!-- TabBarItem组件里的两个插槽 -->
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category-active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/buy">
        <img slot="item-icon" src="~assets/img/tabbar/buy.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/buy-active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div> 
</template>

<script>

// 引用直接使用组件
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  data() {
    return {
    }
  },
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
