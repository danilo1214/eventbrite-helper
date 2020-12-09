<template>
  <div id="app">
    <router-view v-loading="!isLogged"/>
    <template v-if="isLogged">
          <div  v-for ="event in events" :key="event.id">{{event}}</div>

    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  computed:{
    ...mapGetters(["events"])
  },
  data(){
    return {
      isLogged: true
    }
  },
  methods:{
    ...mapActions(["login", "auth", "logout", "loadOrganization", "loadEvents"]),
    init(){
      this.authenticate();
    },
    async authenticate(){
      this.isLogged = false;
      await this.auth().then(async ()=>{
        await this.loadOrganization();
        await this.loadEvents();
        this.$router.replace({name: "events"});
      }).catch(err=>{
        console.log("Not authenticated",err);
        this.$router.replace({name: "login"});
        this.logout();
      });
      this.isLogged = true;
    }
  },
  watch: {
    $route(){
      this.init();
    }
  },
  async created(){
    const {$route} = this;
    if($route.name === "oauth"){
      const {token} = $route.params;
      await this.login({token});
      this.$router.replace({name: "events"});
    }
    this.init();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
