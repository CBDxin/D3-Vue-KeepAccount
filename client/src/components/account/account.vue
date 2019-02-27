<template>
    <div class="account">
      <div class="account-header">
        <div class="title">支出</div>
      </div>
      <Scroll ref="scroll" :threshold="60" @pullingDown="refresh" class="scroll">
        <div class="outer">
          <div @click="$router.push({path:'/detail',query:{kind:'餐饮'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">餐饮</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'交通'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">交通</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'娱乐'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">娱乐</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'服饰'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">服饰</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'学习'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">学习</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'旅行'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">旅行</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'数码'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">数码</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'医疗'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">医疗</span>
          </div>
          <div @click="$router.push({path:'/detail',query:{kind:'其他'}})" class="account-item">
            <span class="icon">&times;</span>
            <span class="text">其他</span>
          </div>
        </div>
      </Scroll>

      <Tab></Tab>
    </div>
</template>

<script>
  import Tab from '../../base/Tab/Tab'
  import Scroll from '../../base/Scroll/Scroll'
    export default {
      components:{
        Tab,
        Scroll,
      },
      methods:{
        refresh(){
          setTimeout(()=>{
            this.$refs.scroll.finishPullDown();
          },2000)
        }
      }
    }
</script>

<style scoped lang="less">
.account{
  .account-header{
    overflow: hidden;
    background-color: #fff53e;
    padding: 20px 0;
    height: 20px;
    .title{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .outer{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 120px white solid;//两倍
    .account-item{
      height: 65px;
      width: 24%;
      display: flex;
      flex-direction: column;
      text-align: center;
      .icon{
        height: 35px;
        line-height: 35px;
      }
      .text{
        height: 30px;
      }
    }
  }
}
</style>
