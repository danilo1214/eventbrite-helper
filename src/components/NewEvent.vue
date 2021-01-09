<template>
  <div class="container">
    <div>
      <div class="mb-3">
        <label for="eventName" class="form-label">Event Name</label>
        <input v-model="event.name.html" class="form-control" id="eventName" />
      </div>
      <div class="mb-3">
        <label for="eventSummary" class="form-label">Summary</label>
        <input v-model="event.summary" class="form-control" id="eventSummary" />
      </div>
      <div class="mb-3">
        <label for="eventCap" class="form-label">Event Capacity</label>
        <input
          v-model="event.capacity"
          type="number"
          class="form-control"
          id="eventCap"
        />
      </div>
      <div class="mb-3">
        <el-date-picker
          label="Date From"
          v-model="fromDate"
          type="datetime"
          placeholder="Date From"
        >
        </el-date-picker>
      </div>

      <div class="mb-3">
        <el-date-picker
          label="Date To"
          v-model="toDate"
          type="datetime"
          placeholder="Date To"
        >
        </el-date-picker>
      </div>
      <div class="mb-3">
        <label for="cur" class="control-label"> Currency </label>
        <select id="cur" v-model="event.currency" class="form-select">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div class="form-check mb-3">
        <input
          v-model="event.listed"
          class="form-check-input"
          type="checkbox"
          value=""
          id="isListed"
          checked
          aria-describedby="listed-help"
        />
        <label class="form-check-label" for="isListed"> Listed </label>
        <div id="listed-help" class="form-text">
          Allows the Event to be publicly searchable on the Eventbrite website.
        </div>
      </div>

      <button @click="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fromDate: null,
      toDate: null,
      event: {
        name: {
          html: "",
        },
        summary: "",
        capacity: 2,
        listed: true,

        start: {
          timezone: "Europe/Ljubljana",
          utc: null,
        },
        end: {
          timezone: "Europe/Ljubljana",
          utc: null,
        },
      },
    };
  },
  methods: {
    ...mapActions(["createEvent", "updateEvent"]),
    error(message) {
      this.$message({
        showClose: true,
        message,
        type: "error",
      });
    },
    validate(event) {
      if(!event){
        return false;
      }
      if(!event.currency || event.currency.length === 0){
        this.error("Please select a currency");
        return false;
      }
      if(!event.name || !event.name.html || event.name.html.length === 0){
        this.error("Please enter a name for the event.");
        return false;
      }
      if(!event.start || !event.start.utc || event.start.utc.length === 0){
        this.error("Please enter a start date for the event.");
        return false;
      }
      if(!event.end || !event.end.utc || event.end.utc.length === 0){
        this.error("Please enter a end date for the event.");
        return false;
      }
     
      const startDate = event.start.utc;
      const endDate = event.end.utc;


      if(moment(endDate).isBefore(startDate)){
        this.error("The start date must be before the end date.");
        return false;
      }

      return true;
    },
    async submit() {
      const { event, id } = this;
      if (!this.validate(event)) {
        return;
      }
      if (id) {
        await this.updateEvent({ event, id })
          .then(this.$router.push("."))
          .catch((e) => {
            console.log(e);
          });
      } else {
        await this.createEvent({
          event,
        })
          .then((resp) => {
            console.log(resp, "successss");
            this.$router.replace({ name: "events" });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async init() {
      if (this.id) {
        const event = await this.getEvent(this.id);
        this.fromDate = event.start.utc;
        this.toDate = event.end.utc;
        this.event = {
          name: {
            html: event.name.html,
          },
          summary: event.summary,
          capacity: event.capacity,
          currency: event.currency,
          listed: event.listed,
          start: event.start,
          end: event.end,
        };
      }
    },
  },
  computed: {
    ...mapGetters(["getEvent"]),
    id() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route() {
      this.init();
    },
    "event.capacity": function (val) {
      this.event.capacity = Number(val);
    },
    toDate: function (val) {
      this.event.end.utc = moment(val).utc().format();
    },
    fromDate: function (val) {
      this.event.start.utc = moment(val).utc().format();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
</style>