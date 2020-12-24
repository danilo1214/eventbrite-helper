<template>
  <div class="container d-flex flex-column">
    <el-button @click="onBack" type="primary"> Back </el-button>
    <h2>{{ event.name.text }}</div>
    <div class="pb-2 fs-5 text-primary">{{eventCreated(event)}}</div>
    <p class="pb-2 lead">
      {{ event.summary }}
    </p>
    <div class="pb-2 fs-4">
      <span class="text-primary fas fa-clock"></span>{{eventTime(event)}}
    </div>

    <div class="pb-2 fs-4">
      <span class="text-primary fas fa-globe-europe"></span>{{event.url}}
    </div>

    <div class="pb-2 fs-4" v-if="event.venue">
      <div class="pb-2">
        <span class="text-primary fas fa-map-marker"></span>{{formatAddress(venue.address)}}
      </div>
    </div>

    <div class="pb-2 fs-4" v-else>
      <span class="text-primary fas fa-map-marker"></span>No address listed.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {eventTime, eventCreated} from "../helpers";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getEvent"]),
    id() {
      return this.$route.params.id;
    },
    event() {
      const { id } = this;
      return this.getEvent(id);
    },
  },
  methods: {
    eventTime,
    eventCreated,
    onBack() {
      this.$router.push(".");
    },
  },
};
</script>

<style>
</style>