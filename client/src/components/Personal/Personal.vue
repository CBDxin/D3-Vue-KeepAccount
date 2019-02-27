<template>
    <div class="personal">
      <div class="personal-header">
        <div class="avater"></div>
        <div class="username">{{userInfo?userInfo.username:'请登录'}}</div>
        <div class="header-footer">
          <div class="footer-item">
            <span class="num">2</span>
            <span class="text">记账总天数</span>
          </div>
          <div class="footer-item">
            <span class="num">2</span>
            <span class="text">记账总笔数</span>
          </div>
        </div>
      </div>
      <button @click="loginBtn" class="btn">{{userInfo?'退出登录':'登录'}}</button>
      <Tab></Tab>
    </div>
</template>

<script>
  import Tab from '../../base/Tab/Tab'
  import {mapState,mapMutations} from 'vuex'
  export default {
    components:{
      Tab
    },
    computed:{
      ...mapState([
        'userInfo'
      ])
    },
    methods:{
      ...mapMutations([
        'set_userInfo',
        'set_accountData'
      ]),
      loginBtn(){
        if (this.userInfo){
          this.axios.get('/user/logout').then((res)=>{
            this.set_userInfo(null)
            this.set_accountData([])
          })
        }else {
          this.$router.push({path:'/login'})
        }
      }
    }
  }
</script>

<style scoped lang="less">
.personal{
  .personal-header{
    background-color: #fff53e;
    padding: 20px;
    .avater{
      background-color: black;
      border-radius: 50%;
      margin: 0 auto;
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }
    .username{
      margin: 0 auto;
      text-align: center;
      margin-bottom: 20px;
    }
    .header-footer{
      display: flex;
      text-align: center;
      .footer-item{
        flex:1;
        display: flex;
        flex-direction: column;
        .num{
          height: 25px;
          line-height: 25px;
          font-size: 20px;
        }
        .text{
          height: 16px;
          line-height: 16px;
          font-size: 14px;
        }
      }
    }
  }
  .btn{
    display: block;
    margin: 0 auto;
    width: 72%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background-color: #fff53e;
    border-radius: 10px;
    margin-top: 100px;
  }
}

</style>
