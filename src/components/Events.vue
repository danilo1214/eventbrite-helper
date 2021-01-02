<template>
  <div class="container">
    <input v-model="keywords" class="form-control" />
    <div
      class="card"
      style="width: 18rem"
      :key="event.id"
      v-for="event in eventsFiltered"
    >
      <div class="card-body">
        <h5 class="card-title">{{ event.name.text }}</h5>

        <div class="d-flex">
          <div class="txt-left">{{ eventTime(event) }}</div>
          <div class="ml-auto txt-right">{{ eventCreated(event) }}</div>
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
    <el-button id="newEventButton" type="primary" circle small @click="addNew">
      <span class="fas fa-plus"></span>
    </el-button>
  </div>
</template>

<script>
import { eventTime, eventCreated, soldTickets } from "../helpers";
import { mapGetters } from "vuex";
export default {
  name: "Events",
  data() {
    return {
      keywords: ""
    };
  },
  computed: {
    ...mapGetters(["events"]),
    eventsFiltered() {
      const { keywords, events } = this;
      if(!!events && keywords.length){
        return this.filterData(keywords, events)
      }
      return events;
    },
  },
  methods: {
    eventTime,
    eventCreated,
    soldTickets,
    filterData(searchField, data) {
      const keywords = String(searchField).toLowerCase().split(" ");

      return data.filter((item) => {
        for (let j = 0; j < keywords.length; j++) {
          const key = keywords[j];
          if (
            key.length &&
            String(item.name.text).toLowerCase().includes(key)
          ) {
            return true;
          }
        }
        return false;
      });
    },
    addNew() {
      this.$router.replace({ name: "new-event" });
    },
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