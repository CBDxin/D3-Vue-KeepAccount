<template>
  <div id="bar">
    <svg></svg>
  </div>
</template>

<script>
  import Bar from '../../common/js/Bar'
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState([
        'kinds'
      ])
    },
    data() {
      return {
        config: {
          width: 400,
          height: 200,
          padding: {
            left: 30,
            right: 30,
            top: 20,
            bottom: 20
          }
        }
      }
    },
    mounted() {
      this.$nextTick(()=>{
        let width = document.getElementById('bar').clientWidth
        this.config.width = width
        this.config.height = width*0.55
        if (this.kinds){
          let bar = new Bar('#bar',this.config)
          bar.draw(this.kinds)
        }

      })

    }
  }
</script>

<style scoped lang="less">
  #bar{
    width: 100%;
  }

</style>
