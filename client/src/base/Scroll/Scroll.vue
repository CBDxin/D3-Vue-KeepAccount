<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <!--<div>下拉刷新</div>
      <div>加载成功</div>-->
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh&&threshold < 10000000000">
        <div class=" box" v-if="beforePullDown">下拉刷新</div>
        <div v-else>
          <div v-if="isPullingDown&&threshold < 10000000000" class="loading">
            <Loading></Loading>
          </div>
          <div class="box" v-else><span>加载成功</span></div>
        </div>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Loading from '../../base/Loading/Loading'

  export default {
    components:{
      Loading
    },
    data(){
      return{
        isPullingDown:false,
        beforePullDown:true,
        pullDownRefresh:true,
        pullDownStyle:{}
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      threshold: {
        type: Number,
        default: 10000000000
      },
      stop: {
        type: Number,
        default: 45
      },
      toBottom: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          bounce: {
            top: true,
            bottom: true,
            left: true,
            right: true
          },
          pullDownRefresh: {
            threshold: this.threshold,
            stop: this.stop
          }
        });
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scrolling', pos.y);
          })
        }
        /*if (this.threshold < 10000000000) {
          let me = this;
          let flag = false;
          this.scroll.on('scroll', (pos) => {
            if (pos.y > this.threshold) {
              flag = true;
              this.$emit('change')
            }
            if (flag && pos.y == this.stop) {
              this.$emit('refresh')
            }
          })
        }*/
        if (this.threshold < 10000000000) {
          this.scroll.on('pullingDown', () => {
            this.beforePullDown = false
            this.isPullingDown = true
            this.$emit('pullingDown')
          })
          this.scroll.on('scroll', (pos) => {
            if (this.beforePullDown) {
              this.pullDownStyle = `top:${Math.min( -48 + pos.y, -38)}px`
            }
          })
        }
      },
      finishPullDown(){
        this.isPullingDown = false
        setTimeout(()=>{
          this.scroll.finishPullDown()
          this.refresh()
        },1000)
        setTimeout(()=>{
          this.beforePullDown = true
        },1500)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
        this.refresh()
      },
      toTop() {
        this.scroll.scrollTo(0, 0, 500)
      },
      _toBottom(t) {
        if (this.scroll){
          if (!t){
            this.scroll.scrollTo(0, this.scroll.maxScrollY, 500)
          }else {
            this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
          }
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
        this.toBottom && this._toBottom()
      }
    },
    watch: {
      data() {
        let _this = this
        this.$nextTick(() => {
          _this.refresh()
        })

      }
    }
  }
</script>

<style lang="less" scoped>
.wrapper{
  /*position: relative;*/
/*  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;*/
  .pulldown-wrapper{
    position: fixed;
    width: 100%;
    top: -48px;
    text-align: center;
    .box{
      height: 38px;
      line-height: 38px;
      color: #696969;
      font-size: 14px;
    }
  }

}
</style>
