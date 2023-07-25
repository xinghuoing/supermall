<template>
  <div class="cart-list">
    <scroll class="content">
      <!-- <li v-for="item in cartList">{{ item }}</li> -->
      <cart-list-item v-for="(item, index) in cartList"
      :key="index"
      :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './CartListItem'
import { mapGetters } from 'vuex';

export default {
  name: 'CartList',
  data() {
    return {
      // cartList: []
    }
  },
  computed: {
    // 直接将getters里的东西拿过来用
        ...mapGetters(['cartList', 'cartListLength']),   
    },
  components: {
    Scroll,
    cartListItem
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
