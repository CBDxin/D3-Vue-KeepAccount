<template>
    <div ref="slider" id="slider">
      <div ref="side" class="side">
        <div class="side-header">
          <span class="back" @click="hide"> < back</span>
          <div class="title">图表样式</div>
        </div>
        <div class="option">
          <div :class="{active:isActive == 'area'}"
               @click="push('area')" class="item">区域图</div>
          <div :class="{active:isActive == 'pie'}"
               @click="push('pie')" class="item">饼图</div>
          <div :class="{active:isActive == 'tmap'}"
               @click="push('tmap')" class="item">矩阵树图</div>
          <div :class="{active:isActive == 'bar'}"
               @click="push('bar')" class="item">直方图</div>
        </div>
      </div>
      <div ref="mask" class="mask" @click="hide"></div>
    </div>
</template>

<script>
    export default {
      mounted(){
        this.width = document.getElementById('slider').clientWidth
        this.sliderWidth = this.width*0.4
      },
      data(){
        return{
          width: 0,
          sliderWidth: 0,
          isActive:'area'
        }
      },
      props:{
        isShow:{
          default:false,
          type:Boolean
        }
      },
      watch:{
        isShow(){
          if (this.isShow){
            this.show()
          }else {
            this.hide()
          }
        }
      },
      methods:{
        hide(){
          this.$refs.slider.style.width = '40%'
          this.$refs.slider.style.left = -this.width + 'px'
          this.$refs.mask.style.opacity = 0
          this.$emit('hide')
          this.$refs.mask.style.width = '100%'
        },
        show(){
          this.$refs.slider.style.left = 0
          this.$refs.slider.style.width = '100%'
        },
        push(chart) {
          this.$router.push({path: `/chart/${chart}`})
          this.hide()
          this.isActive = chart
        }
      }
    }
</script>

<style scoped lang="less">
#slider{
  width: 40%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: -40%;
  right: 0;
  transition: all 1s;
  .back{
    display: inline-block;
    padding: 10px;
    margin-bottom: 30px;
  }
  .side{
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    z-index: 999;
    background-color: white;
    .side-header{
      background-color:  #fff53e;
      padding-bottom: 30px;
    }
    .title{
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      font-weight: bold;
    }
    .option{
      .item{
        margin: 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: gainsboro 1px solid;
      }
    }
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    opacity: 0.6;
  }
  .active{
    color: #fff53e;
    font-weight: bold;
  }
}

</style>
