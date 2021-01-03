<template>
  <div id="login">
    <button type="primary" class="m-auto btn btn-primary" @click="eventBriteLogin">
      Login with eventbrite
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { InAppBrowser } from "@ionic-native/in-app-browser";

export default {
  name: "App",
  methods: {
    ...mapActions(["login"]),
    async eventBriteLogin() {
      const key = `XLWH5W77EUSX4G6OF3`;
      const url = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${key}&redirect_uri=http://localhost:8080/oauth`;
      const browser = InAppBrowser.create(url, "_blank", { location: "yes" });
      browser.on("loadstop").subscribe(async (event) => {
        console.log(`event is ${event}`);
        console.log(`url is ${event.url}`);
        if (event.url.indexOf("&access_token=") !== -1) {
          let token = event.url.slice(
            event.url.indexOf("&access_token=") + "?access_token=".length
          );
          await this.login({ token });
          this.$router.replace({ name: "events" });
          browser.close();
        }
      });
    },
  },
};
</script>
