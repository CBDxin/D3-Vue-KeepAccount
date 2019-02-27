<template>
  <div id="pie">
    <svg></svg>
  </div>
</template>

<script>
  import Pie from '../../common/js/Pie'
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
        let width = document.getElementById('pie').clientWidth
        this.config.width = width
        this.config.height = width*0.55
        if (this.kinds){
          let pie = new Pie('#pie',this.config)
          pie.draw(this.kinds)
        }

      })

    }
  }
</script>

<style scoped lang="less">


</style>
