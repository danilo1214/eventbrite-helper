<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="eventName" class="form-label">Event Name</label>
        <input v-model="event.name" class="form-control" id="eventName" />
      </div>
      <div class="mb-3">
        <label for="eventSummary" class="form-label">Summary</label>
        <input v-model="event.summary" class="form-control" id="eventSummary" />
      </div>
      <div class="mb-3">
        <label for="eventCap" class="form-label">Event Capacity</label>
        <input v-model="event.capacity" type="number" class="form-control" id="eventCap" />
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
        <label class="form-check-label" for="isListed">
          Listed
        </label>
    <div id="listed-help" class="form-text">Allows the Event to be publicly searchable on the Eventbrite website.</div>
      </div>

      <button @click="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        name: "",
        summary: "",
        capacity: 2,
        listed: true,
        
        start: {
            timezone: "Europe/Ljubljana",
            utc: null
        },
        end: {
            timezone: "Europe/Ljubljana",
            utc: null
        }
      }
    }
  },
  methods: {
      submit(){
          console.log("xd");
      }
  },
  watch:{
      "event.capacity": function(val){
          this.event.capacity = Number(val);
      }
  }
};
</script>

<style>
</style>