<template>
  <div class="container">
    <div
      class="card"
      style="width: 18rem"
      :key="event.id"
      v-for="event in events"
    >
      <div class="card-body">
        <h5 class="card-title">{{ event.name.text }}</h5>

        <div class="d-flex">
          <div class="txt-left">{{eventTime(event)}}</div>
          <div class="ml-auto txt-right">{{eventCreated(event)}}</div>
        </div>
        <p class="card-text mt-3">
          {{ event.summary }}
        </p>
        <p class="card-text" v-if="event.capacity > 0">
          {{ soldTickets(event) }}/{{ event.capacity }}
        </p>
        <p class="card-text" v-else>No tickets listed</p>
        <a :href="`#/events/${event.id}`" class="btn btn-primary">Open</a>
      </div>
    </div>
  <el-button
        id="newEventButton"
        type="primary"
        circle
        small
        @click="addNew"
      >
        <span class="fas fa-plus"></span>
 </el-button>
  </div>
</template>

<script>
import {eventTime, eventCreated, soldTickets} from "../helpers";
import { mapGetters } from "vuex";
export default {
  name: "Events",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["events"]),
  },
  methods: {
    eventTime,
    eventCreated,
    soldTickets,
    addNew(){
      this.$router.replace({name: "new-event"});
    }
  },
};
</script>

<style>
#newEventButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}
</style>