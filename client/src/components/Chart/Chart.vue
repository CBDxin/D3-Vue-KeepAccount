<template>
    <div class="chart">
      <div ref="mask" class="mask"></div>
      <div ref="header" class="chart-header">
        <div class="title">
          支出
        </div>
        <div class="kind" @click="isShow = true">kind</div>
        <div class="tab">
          <span class="item week active">周</span>
          <span class="item month">月</span>
          <span class="item year">年</span>
        </div>
      </div>
      <router-view ref="chart"></router-view>
      <div ref="top" class="top">
        <div class="title">支出排行榜</div>
        <scroll ref="scroll" :threshold="60" @pullingDown="refresh" v-if="kinds" class="scroll">
          <div>
            <div v-for="(value, key, index) in kinds" :key="key" class="top-item">
              <div class="icon">&nscr;</div>
              <div class="top-content">
                <div class="text">{{key}}</div>
                <div :style="{width: value/max*100+'%'}" class="bar"></div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <Tab></Tab>
      <Slider style="z-index: 100" :isShow="isShow" @hide="isShow = false"></Slider>
    </div>
</template>

<script>
  import Scroll from '../../base/Scroll/Scroll'
  import Tab from '../../base/Tab/Tab'
  import Area from '../../common/js/Area'
  import Pie from '../../common/js/Pie'
  import Slider from '../../base/Slider/Slider'
  import {mapState} from 'vuex'

  export default {
    mounted(){
      this.$nextTick(()=>{
        let headerHeight = this.$refs.header.clientHeight
        let chartHeight = document.querySelector('svg').clientHeight
        this.$refs.top.style.top = parseInt(headerHeight) + chartHeight + 20 + 'px'
      })
    },
    created(){
      this._max()
    },
    methods:{
      _max(){
        for(let key in this.kinds){
          if (this.kinds[key]>this.max){
            this.max = this.kinds[key]
            console.log(this.max)
          }
        }
      },
      refresh(){
        setTimeout(()=>{
          this.$refs.scroll.finishPullDown();
        },2000)
      }
    },
    watch:{
      isShow(){
        if (this.isShow){
          this.$refs.mask.style.display = 'inline-block'
          let _this = this
          setTimeout(()=>{
            _this.$refs.mask.style.opacity = '0.6'
          },200)
        }else {
          this.$refs.mask.style.opacity = 0
          let _this = this
          setTimeout(()=>{
            _this.$refs.mask.style.display = 'none'
          },1000)
        }
      }
    },
    data() {
      return {
        isShow:false,
        max:0
      }
    },
    components:{
      Tab,
      Slider,
      Scroll
    },
    computed:{
      ...mapState([
       'kinds'
      ])
    }
  }
</script>

<style scoped lang="less">
  .scroll{
    height: 100%;
    position: absolute;
    left: 0;
    top: 20px;
    right: 0;
    bottom: 45px;
    overflow: hidden;
  }
.chart{
  .top{
    border-top: gainsboro 1px solid;
    position: absolute;
    top: 320px;
    bottom: 75px;
    left: 0;
    right: 0;

    .title{
      font-size: 14px;
      padding: 5px;
    }
    .top-item{
      display: flex;
      height: 55px;
      width: 100%;
      .icon{
        width: 15%;
        text-align: center;
        line-height: 55px;
      }
      .top-content{
        padding: 10px;
        flex: 1;
        width: 80%;
        border-bottom: gainsboro 1px solid;
        .text{
          height: 20px;
          line-height: 20px;
          font-size: 12px;
        }
        .bar{
          background-color: #fff53e;
          height:7px;
          margin: 4px 0;
          border-radius: 5px;
        }
      }
    }
  }
  .mask{
    display: none;
    transition: all 1s;
    opacity: 0;
    background-color: black;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  #area-chart{
    width: 100%;
  }
  .chart-header{
    background-color: #fff53e;
    padding: 20px;
    .title{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .kind{
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 10px;
    }
    .tab{
      display: flex;
      text-align: center;
      .item{
        height: 25px;
        line-height: 25px;
        flex: 1;
        display: inline-block;
        /*border-top:1px black solid;
        border-bottom:1px black solid;*/
        border:1px black solid ;
      }
      .week{
        border-radius: 5px 0 0 5px;
      }
      .month{
        border-left: 0px transparent solid;
        border-right: 0px transparent solid;
      }
      .year{
        border-radius:0 5px 5px 0;
      }
      .active{
        color: #fff53e;
        background-color: black;
      }
    }

  }
}

</style>
