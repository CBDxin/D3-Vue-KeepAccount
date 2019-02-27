<template>
  <div id="tree-map">
    <svg></svg>
  </div>
</template>

<script>
  import TreeMap from '../../common/js/TreeMap'
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState([
        'kinds'
      ])
    },
    created(){
      for (let key in this.kinds){
        this.data.children.push({
          name:key,
          value:this.kinds[key]
        })
      }
    },
    data() {
      return {
        /*data: [['小米', 40.7], ['小5米', 48.7],['小1米', 74.7],
          ['华为',52.1], ['金立', 49.7], ['联想', 35.6], ['1联想', 39.6],
          ['联2想', 45.6], ['兴联', 70]]*/
        data:{
          'name': '支出',
          'children':[]
        },
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
        let width = document.getElementById('tree-map').clientWidth
        this.config.width = width
        this.config.height = width*0.55
        if (this.kinds){
          let treemap = new TreeMap('#tree-map',this.config)
          treemap.draw(this.data)
        }

      })
    }
  }
</script>

<style scoped lang="less">
  #tree-map{
    width: 100%;
  }

</style>
