<template>
  <div id="tab-bar">
    <!-- 插槽插入item小组件 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
    z-index: 9;
  }

</style>
