const mutations = {
  set_userInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  set_accountData(state, accountData) {
    let formatTime =(date)=>{
      date = new Date(date)
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return{
        y,m,d, h, minute,second
      }
    }
    accountData.forEach((item,index)=>{
      let sum = 0
      item.forEach((data)=>{
        data.time = formatTime(data.time)
        sum += data.amount
        if (state.kinds.hasOwnProperty(data.kind)){
          state.kinds[data.kind] += data.amount
        }else {
          state.kinds[data.kind] = data.amount
        }
      })
      if (item.length>0){
        state.day[`${item[0].time.m}-${item[0].time.d}`] = sum
      }else {

      }
    })
    state.accountData = accountData;
  }
}

export default mutations
