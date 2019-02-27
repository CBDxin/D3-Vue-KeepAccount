<template>
  <div id="area">
    <svg></svg>
  </div>
</template>

<script>
  import Area from '../../common/js/Area'
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
        let width = document.getElementById('area').clientWidth
        this.config.width = width
        this.config.height = width*0.55
        if (this.kinds){
          let area = new Area('#area',this.config)
          area.draw(this.kinds)
        }

      })

    }
  }
</script>

<style scoped lang="less">
  #area{
    width: 100%;
  }

</style>
