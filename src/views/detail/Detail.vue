<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-navbar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :baseInfo="goods"/>
    <detail-shop-info :shopInfo="shop"/>
    <detail-goods-info :goodsInfo="detailInfo" @goodsInfoImgLoad="imgLoad"/>
    <detail-goods-params ref="params" :goodsParams="goodsParams"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailGoodsParams from './childComps/DetailGoodsParams';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop'


import {debounce} from 'common/utils'
import {getDetail, Goods, Shop, getRecommend} from 'api/detail'


export default {
  name: 'Detail',
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    GoodsList,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow: false
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      // 获取轮播图图片数据
      this.topImages = data.itemInfo.topImages
      // 获取商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取商家信息
      this.shop = new Shop(data.shopInfo)
      // 获取商品详细信息
      this.detailInfo = data.detailInfo
      // 获取参数信息
      this.goodsParams = data.itemParams
      // 取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 对getThemeTopY的赋值操作进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    }, 50)
      // 等数据都渲染完了，再来回调这里面的函数
    //   this.$nextTick(() => {
    //     // 值不对
    //     // 目前获取的offsetTop里不包括图片的高度，图片没有加载完
    //     this.themeTopYs = []

    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //     console.log(this.themeTopYs);
    //   });
  
    // 推荐信息
    getRecommend().then(res => {
      this.recommend = res.data.list
      // console.log(res);
    })
  },
  methods:{
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    imgLoad() {
      this.$refs.scroll.refresh()
      // 在图片加载完才获取offsetTop
      this.getThemeTopY()
    },
    contentScroll(position) {
      const positionY = -position.y
      // console.log(positionY);
      let length  = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] 
        && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShow = (-position.y) > 1000
    },
    backClick() {
      // console.log('backClick');
      // 回到0,0位置，用时300ms
      // this.$refs.scroll拿到我们的scroll组件，ref在组件上定义了为scroll，然后调用scroll组件的方法
      this.$refs.scroll.scrollTo(0,0,300)
    },
    addToCart() {
      // console.log('---');
      // 1.获取购物车想要展示的数据
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // console.log(res);
        this.$toast.show(res)
        // console.log(this.$toast);
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
