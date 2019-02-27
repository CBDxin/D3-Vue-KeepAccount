<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
    created(){
      this.$router.currentRoute.path != '/' && this.$router.push('/home')
    },
  computed:{
    ...mapState([
      'userInfo'
    ])
  }
}
</script>

<style lang="less">
  .scroll{
    height: 100%;
    position: absolute;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 45px;
    overflow: hidden;
  }
</style>
