<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
       :is-active="isAllSelect" 
       @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      <!-- {{ this.cartList[0].checked }} -->
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import { mapGetters } from 'vuex';

export default {
  name: 'CartBottomBar',
  data() {
    return {
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList', 'cartListLength']),   
    totalPrice() {
      return '¥' + this.cartList.filter(item => {
        // 筛选checked为true的item商品
        return item.checked
      }).reduce((preValue, item) => {
        // checked为true的item商品进行累加
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      // 计算check为true的商品的个数
      return this.cartList.filter(item => item.checked).length
    },
    isAllSelect() {
      if(this.cartList.length === 0) return false
      // 找到符合条件的元素就直接返回这个元素， !10 = false
      return !this.cartList.find(item => !item.checked)
      // return !(this.cartList.filter(item => !item.checked).length)
      
    }
  },
  methods: {
    checkClick() {
      if(this.isAllSelect) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //部分或全部没选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      // if(this.checkLength === 0) {\
        if(!this.isAllSelect) { 
        this.$toast.show('购物车为空')
      }
    }
  }
}

</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 6px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: pink;
    text-align: center;
  }
</style>
