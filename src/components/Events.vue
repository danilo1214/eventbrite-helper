<template>
  <div class="container">
    <div v-for="event in events" :key="event.id">{{ event }}</div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  name: "Events",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["events"]),
  },
};
</script>

<style>
</style>