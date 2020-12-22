<template>
  <div id="app" v-loading="!isLoaded">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/events">Events</a>
        </li>
        <li class="nav-item" v-if="isLogged">
          <a class="nav-link active" aria-current="page" href="#/logout">Logout</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link active" aria-current="page" href="#/login">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <router-view />
    
  </div>
</template>

<script>
import {mapActions} from "vuex";


export default {
  name: 'App',
  data(){
    return {
      isLogged: true,
      isLoaded: true,
    }
  },
  methods:{
    ...mapActions(["login", "auth", "logout", "loadOrganization", "loadEvents"]),
    init(){
      this.authenticate();
    },
    async authenticate(){
      this.isLoaded = false;
      await this.auth().then(async ()=>{
        this.isLogged = true;
        await this.loadOrganization();
        await this.loadEvents();

        if(!this.$route.name){
          this.$router.replace({name: "events"});
        }
      }).catch(err=>{
        console.log(JSON.stringify(err));
        this.isLogged = false;
        this.$router.replace({name: "login"});
        this.logout();
      });
      this.isLoaded = true;
    }
  },
  watch: {
    async $route(route){
      //this.init();

      if(route.name === "logout"){
      await this.logout();
      this.$router.replace({name: "login"});
    }
    }
  },
  async created(){
    
    //this.init();
  }
}
</script>


