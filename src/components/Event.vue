<template>
  <div class="container d-flex flex-column">
    <el-button @click="onBack" type="primary"> Back </el-button>
      <h1>{{ event.name }}</h1>
      <div>
        {{ event.summary }}
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    onBack() {
      this.$router.push(".");
    },
  },
};
</script>

<style>
</style>