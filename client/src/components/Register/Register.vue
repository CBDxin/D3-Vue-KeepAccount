<template>
  <div class="register">
    <div class="x" @click="$router.push({path:'/login'})">&times;</div>
    <div class="title">傻瓜记帐</div>
    <div class="form">
      <input v-model="username" type="text"  placeholder="请输入用户名" class="blank-input"><br>
      <input v-model="password" type="password" placeholder="请输入密码" class="blank-input"><br>
      <input v-model="repassword" type="password" placeholder="请再次确认密码" class="blank-input"><br>
      <div class="tip" ref="tip"></div>
      <button class="register-btn" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        username:'',
        password:'',
        repassword:''
      }
    },
    methods:{
      register(){
        this.axios.post('/user/register',{
          username:this.username,
          password:this.password,
          repassword:this.repassword
        }).then((res)=>{
          this.$refs.tip.innerHTML = res.data.msg
          if (res.data.code){
            this.$refs.tip.style.color = '#ffd80f'
          }else {
            this.$refs.tip.style.color = '#3ec231'
            setTimeout(()=>{
              this.$router.push({path:'/login'})
            },500)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .register{
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
      .register-btn{
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
  }
</style>

