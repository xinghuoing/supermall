<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
    <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <!-- 左边是自定义事件的名称，右边是这里定义的方法 -->
    <tab-control  :titles="['流行','新款','精选']"
    ref="tabControl"
    @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShow"/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'api/home';
import { debounce } from 'common/utils';



// import  Swiper from '@/components/common/swiper/Swiper';
// import  SwiperItem from '@/components/common/swiper/SwiperItem';



export default {
  name: 'Home',
   components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },

  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false,
      saveY: 0
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // 3.监听item中图片是否加载完成，调用refresh函数刷新，接收来自goodslistitem的自定义事件


  },
  mounted() {

    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // tabcontrol距离上方的位置
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    // 父组件接收来自子组件的点击事件
    tabClick(index) {
      switch(index){
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
    // this.result = res
    // console.log(res);
    this.banners = res.data.banner.list;
    this.recommends = res.data.recommend.list
      })
    },
    // type是看一下是不是pop或new或sell,与网络请求的相对应
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // 将服务器的数据加到data里的goods里面去
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    // 监听滚动位置
    contentScroll(position) {
    this.isShow = (-position.y) > 1000
    },
    // 监听上拉事件
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    backClick() {
      // console.log('backClick');
      // 回到0,0位置，用时500ms
      // this.$refs.scroll拿到我们的scroll组件，ref在组件上定义了为scroll，然后调用scroll组件的方法
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}
  
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
