<template>
    <div class="detail">
      <div class="detail-header">
        <div class="x" @click="$router.push({path:'/account'})">&times;</div>
        <div class="title">{{$route.query.kind}}</div>
      </div>
      <Scroll ref="scroll" class="scroll">
        <div class="outer">
          <input type="number" @blur="fix"  v-model="amount" placeholder="金额" class="blank-input"><br>
          <input v-model="information" type="text" placeholder="备注点什么" class="blank-input"><br>
          <button @click="put" class="btn">提交</button>
        </div>
      </Scroll>

    </div>
</template>

<script>
  import Scroll from '../../base/Scroll/Scroll'
  import {mapState} from  'vuex'
    export default {
      components:{
        Scroll,
      },
      methods:{
        fix(){
          this.amount = parseFloat(this.amount).toFixed(2)
        },
        put(){
          this.axios.put('/account',{
            kind:this.kind,
            amount:this.amount,
            information:this.information,
            user:this.userInfo._id
          }).then((res)=>{
            this.$router.push({path:'/account'})
          })
        }
      },
      data(){
        return{
          amount:'',
          information:'',
          kind:this.$route.query.kind
        }
      },
      computed:{
        ...mapState([
          'userInfo'
        ])
      }
    }
</script>

<style scoped lang="less">
.detail{
  .detail-header{
    overflow: hidden;
    background-color: #fff53e;
    padding: 20px 0;
    height: 20px;
    .x{
      width: 30px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      right: 5px;
      top: 0;
      display: inline-block;
      font-size: 25px;
      color: darkgrey;
      text-align: center;
    }
    .title{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .outer{
    margin: 0 auto;
    padding: 100px 0 50px 0;
    .blank-input{
      display: block;
      margin: 0 auto;
      border-bottom: gainsboro solid 1px;
      width: 70%;
      height: 20px;
      padding: 5px;
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
      margin-top: 20px;
    }
  }
}
</style>
