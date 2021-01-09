<template>
  <div class="container">
    <button class="btn btn-primary" @click="onBack"> Back </button>

    <div>
      <div class="mb-3">
        <label for="className" class="form-label">Ticket Name</label>
        <input
          v-model="ticket_class.name"
          class="form-control"
          id="className"
        />
      </div>
      <div class="mb-3">
        <label for="ticketCap" class="form-label">Ticket Quantity</label>
        <input
          v-model="ticket_class.quantity_total"
          type="number"
          class="form-control"
          id="ticketCap"
        />
      </div>

      <div class="mb-3">
        <label for="ticketCost" class="form-label">Ticket Cost</label>
        <input
          v-model="ticket_class.cost"
          type="number"
          class="form-control"
          id="ticketCost"
        />
      </div>

      <button @click="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NewTicketClass",
  data() {
    return {
      ticket_class: {
        name: "",
        quantity_total: 0,
        cost: 0,
      },
    };
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
    ...mapActions(["createTicketClass"]),
    async submit() {
      const { ticket_class, event } = this;
      await this.createTicketClass({
        ticket_class,
        event,
      })
        .then((resp) => {
          console.log(resp, "successss");
          this.$router.push(".");
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
        });
    },
    onBack() {
      this.$router.push(".");
    }
  },
  watch: {
    "ticket_class.quantity_total": function (val) {
      this.ticket_class.quantity_total = Number(val);
    },
    "ticket_class.cost": function (val) {
      this.ticket_class.cost = Number(val);
    },
  },
  created(){
    console.log("WHY CLOSINGGFGGg?gg?g?g?g?g?g?g?g?g?g?");
  }
};
</script>

<style>
</style>