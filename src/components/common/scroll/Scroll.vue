<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"> 
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
    type: Number,
    default() {
      return 0
    }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  mounted() {

    // 使用后会有个点击跳转路由失效问题 
    // better-scroll 默认会阻止浏览器的原生click事件, 在mounted方法中定义click
    const options = {
              probeType: this.probeType,
              pullUpLoad: this.pullUpLoad,
              click:true
            }

    this.scroll = new BScroll(this.$refs.wrapper, options),{
      
    }

    // 实现监听滚动
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)

    })

    // 监听上拉事件
   if(this.pullUpLoad) {
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
   }
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
    this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('.....');
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
