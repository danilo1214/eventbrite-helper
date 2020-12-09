<template>
  <div id="login">
    <el-button type="primary" @click="eventBriteLogin">Login</el-button>

  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    eventBriteLogin(){
      const key = `XLWH5W77EUSX4G6OF3`;
      window.location = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${key}&redirect_uri=http://localhost:8080/oauth`;
    }
  }
}
</script>
