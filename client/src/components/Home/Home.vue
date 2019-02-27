<template>
  <div class="home">
    <div class="home-header">
      <div class="title">傻瓜记帐</div>
      <div class="header-body">
        <div class="home-date">
          <div class="date-year">2019年</div>
          <div class="date-month">02月<span class="tri"></span></div>
        </div>
        <div class="home-output">
          <div class="text">支出(未完成)</div>
          <div class="output">
            <span class="zhenshu">0</span>.00
          </div>
        </div>
      </div>
    </div>
    <scroll ref="scroll" class="scroll">
      <div class="outer">
        <ul v-if="item.length>0" v-for="(item,index) in accountData" :key="index" class="op-lists">
          <li class="list-header">
            <span class="date">{{item[0].time.y}}年{{item[0].time.m}}月{{item[0].time.d}}日</span>
            <span class="op-total">支出 {{day[`${item[0].time.m}-${item[0].time.d}`]}}</span>
          </li>
          <li  v-for="subItem in item" class="item">
            <span class="icon">&nabla;</span>
            <span class="kind">{{subItem.kind}}</span>
            <span class="op-num">{{subItem.amount}}</span>
          </li>
        </ul>
      </div>
    </scroll>
    <tab></tab>
  </div>
</template>

<script>
  import Scroll from '../../base/Scroll/Scroll'
  import Tab from '../../base/Tab/Tab'
  import {mapMutations,mapState} from 'vuex'

  export default {
    created() {
      this.getAllData()
    },
    methods: {
      ...mapMutations([
        'set_userInfo',
        'set_accountData'
      ]),
      getAllData(){
        this.axios.get('/all').then((res)=>{
          if (res.data.userInfo){
            let userInfo = res.data.userInfo || ''
            this.set_userInfo(userInfo)
          }else {
            this.$router.push({path:'/login'})
          }
          if (res.data.AccountData){
            let accountData = res.data.AccountData
            this.set_accountData(accountData)
          }
        })
      }
    },
    components: {
      Tab,
      Scroll
    },
    computed:{
      ...mapState([
        'accountData',
        'day',
        'userInfo'
      ])
    }
  }
</script>

<style scoped lang="less">
  .home {
    .scroll {
      top: 120px;
    }
    .outer {
      border-bottom: 300px white solid;
    }
    .home-header {
      background-color: #fff53e;
      padding: 20px 0;
      height: 120px;
      box-sizing: border-box;
      .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .header-body {
        margin: 5px;
        display: flex;
        text-align: center;
        .home-date {
          flex: 1;
          .date-year {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .date-month {
            border-right: black 1px solid;
            font-size: 20px;
            font-weight: bold;
            .tri {
              display: inline-block;
              width: 0;
              height: 0;
              border-width: 10px 7px 7px 7px;
              border-style: solid;
              border-color: black transparent transparent; /*透明 透明  黄*/
              position: relative;
              top: 0.2rem;
            }
          }
        }
        .home-output {
          flex: 2;
          .text {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .output {
            .zhenshu {
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
    }
    .outer {
      .op-lists {
        li {
          padding: 10px 30px;
          border-bottom: #ececf3 1px solid;
        }
        li:nth-last-of-type(1) {
          border-bottom: none;
        }
        .list-header {
          color: grey;
          font-size: 14px;
          .date {

          }
          .op-total {
            float: right;

          }
        }
        .item {
          width: 85%;
          padding: 10px 0;
          margin: 0 auto;
          .op-num {
            float: right;
          }
        }
      }

    }

  }

</style>
