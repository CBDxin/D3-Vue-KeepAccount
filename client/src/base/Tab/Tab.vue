<template>
    <div class="tab">
      <router-link tag="div" to="/home" class="tab-item">
        <span class="icon">&times;</span>
        <span class="text">明细</span>
      </router-link>
      <router-link tag="div" to="/chart" class="tab-item" >
        <div class="icon">&nabla;</div>
        <div class="text">图表</div>
      </router-link>
      <router-link class="tab-item" tag="div" to="/account">
        <div class="icon">&range;</div>
        <div class="text">记账</div>
      </router-link>
      <router-link class="tab-item" tag="div" to="/personal">
        <div class="icon">&jcy;</div>
        <div class="text">我的</div>
      </router-link>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="less">
.tab{
  background-color: #fdfdfd;
  padding: 5px;
  border-top: 1px #efeff3 solid;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  .actived{
    .icon{
      color: #fff040;
    }
  }
  .tab-item{
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    .icon{
      height: 25px;
      line-height: 25px;
    }
    .text{
      height: 20px;
    }
  }
}

</style>
