<template>
  <div id="app">
    <router-view/>
    <div class="global-loading" v-show="isShowLoading">
        <Spin size="large"></Spin>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isShowLoading: false
    }
  }
}
</script>


<style lang="stylus">
#app
  height 100%
/* loading */
.global-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255,255,255,.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
