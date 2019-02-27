<template>
    <div class="login">
      <div class="x" @click="$router.push({path:'/home'})">&times;</div>
      <div class="title">傻瓜记帐</div>
      <div class="form">
        <input v-model="username" type="text" placeholder="请输入用户名" class="blank-input"><br>
        <input v-model="password" type="password" placeholder="请输入密码" class="blank-input"><br>
        <div ref="tip" class="tip"></div>
        <button @click="login" class="login-btn">登录</button>
      </div>
      <span @click="$router.push({path:'/register'})" class="register-tip">注册</span>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
    export default {
      data(){
        return{
          username:'测试',
          password:'123'
        }
      },
      methods:{
        ...mapMutations([
          'set_userInfo',
          'set_accountData'
        ]),
        getAllData(){
          this.axios.get('/all').then((res)=>{
            let userInfo = res.data.userInfo
            let accountData = res.data.AccountData
            this.set_userInfo(userInfo)
            this.set_accountData(accountData)
          })
        },
        login(){
          this.axios.post('/user/login',{
            username:this.username,
            password:this.password
          }).then((res)=>{
            this.$refs.tip.innerHTML = res.data.msg
            if (res.data.code){
              this.$refs.tip.style.color = '#ffd80f'
            }else {
              this.$refs.tip.style.color ='#3ec231'
              setTimeout(()=>{
                this.getAllData()
              },500)
              setTimeout(()=>{
                this.$router.push({path:'/home'})
              },1000)
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
.login{
  .title{
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    height: 150px;
    line-height: 150px;
  }
  .x{
    width: 30px;
    height: 30px;
    line-height: 30px;
    float: right;
    display: inline-block;
    font-size: 25px;
    color: darkgrey;
    text-align: center;
  }
  .form{
    margin: 0 auto;
    padding: 0 0 50px 0;
    .blank-input{
      display: block;
      margin: 0 auto;
      border-bottom: gainsboro solid 1px;
      width: 70%;
      height: 20px;
      padding: 5px;
    }
    .tip{
      text-align: center;
      min-height: 16px;
    }
    .login-btn{
      display: block;
      margin: 0 auto;
      width: 72%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      background-color: #fff53e;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
  .register-tip{
    float: right;
    margin-right: 20%;
    margin-top: -25px;
    color: grey;
    font-size: 14px;
  }
}
</style>
