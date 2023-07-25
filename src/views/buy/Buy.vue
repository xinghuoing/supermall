<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import cartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

export default {
  name: 'Buy',
  data() {
    return {
    }
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    }
  },
  components: {
    NavBar,
    cartList,
    CartBottomBar
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
