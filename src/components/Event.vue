<template>
  <div class="container d-flex flex-column">
    <el-button @click="onBack" type="primary"> Back </el-button>
    <h2>{{ event.name.text }}</h2>
    <div class="pb-2 fs-5 text-primary">{{ eventCreated(event) }}</div>
    <p class="pb-2 lead">
      {{ event.summary }}
    </p>
    <div class="pb-2 fs-4">
      <span class="text-primary fas fa-clock"></span>{{ eventTime(event) }}
    </div>

    <div class="pb-2 fs-4">
      <span class="text-primary fas fa-globe-europe"></span>{{ event.url }}
    </div>

    <div class="pb-2 fs-4" v-if="event.venue">
      <div class="pb-2">
        <span class="text-primary fas fa-map-marker"></span
        >{{ formatAddress(venue.address) }}
      </div>
    </div>

    <div class="pb-2 fs-4" v-else>
      <span class="text-primary fas fa-map-marker"></span>No address listed.
    </div>
    <h3>Tickets</h3>
    <button @click="newClass" class="btn btn-primary">New</button>
    <div v-for="ticket in event.ticket_classes" :key="ticket.id">
      <h4>{{ ticket.name }}</h4>

      <div class="d-flex">
        <div>Capacity: {{ ticket.quantity_total }}</div>
        <div>Sold: {{ ticket.quantity_sold }}</div>
        <div>Price: {{ ticket.cost.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { eventTime, eventCreated } from "../helpers";

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
    newClass(){
      this.$router.push("./class");
    }
  },
};
</script>

<style>
</style>