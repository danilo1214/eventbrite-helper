<template>
  <div class="container d-flex flex-column pl-1">
    <button @click="onBack" class="btn btn-primary">Back</button>
    <button @click="onDelete" class="btn btn-danger">Delete</button>

    <a :href="`#/events/${id}/edit`" class="btn btn-primary">Edit</a>

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
    <a :href="`#/events/${id}/class`" class="btn btn-primary">New Ticket</a>
    <div v-for="ticket in event.ticket_classes" :key="ticket.id">
      <h4>{{ ticket.name }}</h4>

      <div class="d-flex justify-content-around">
        <div>Capacity: {{ ticket.quantity_total }}</div>
        <div>Sold: {{ ticket.quantity_sold }}</div>
        <div>Price: {{ ticket.cost.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions(["deleteEvent"]),
    async onDelete() {
      const { id } = this;
      await this.deleteEvent({ id });
      this.$message({
        showClose: true,
        message: "Successfuly deleted event.",
        type: "success",
      });
      this.$router.replace({ name: "events" });
    },
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