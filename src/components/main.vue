<template>
  <div>
    <!--<h2>{{searchName}}</h2>-->
    <h2 v-show="firstView">请输入名字查询</h2>
    <h2 v-show="loading">正在拼命加载中......</h2>
    <h2 v-show="errMsg">{{errMsg}}</h2>
    <div class="row" v-show="users">
      <div class="card" v-for="user in users">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.login}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['searchName'],
    data(){
       return{
         firstView:true,
         loading:false,
         users:null,
         errMsg:null
       }
    },
    watch:{
      searchName(newValue,oldValue){
          //发送中，更新状态
        this.firstView = false
        this.loading = true
        this.users = null
        this.errorMsg = null
        var url = `https://api.github.com/search/users?q=${this.searchName}`
        axios.get(url)
          .then(response =>{
            var result = response.data
            this.loading = false
            this.users = result.items.map((item)=>{
                return{
                  html_url: item.html_url,
                  avatar_url: item.avatar_url,
                  login: item.login

                }
            })
          })
          .catch(err =>{
            this.loading = false
            this.errMsg = '糟糕！网络出问题了'
          })
      }
    }
}

</script>

<style>

</style>
