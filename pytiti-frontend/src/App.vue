<template>
  <loader
    v-if="loader"
    object="#158463"
    color1="#158463"
    color2="#158463"
    size="5"
    speed="2"
    bg="#343a40"
    objectbg="#999793"
    opacity="80"
    name="circular"
  ></loader>
  <Spinner :loading="loading">
    <div id="appd">
      <RouterView />
      <notifications position="bottom right" />
    </div>
  </Spinner>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Spinner from "./components/widgets/spinner.vue";
export default {
  name: "App",
  components: { Spinner },
  methods: {
    ...mapActions("tablasBase", ["fetchCitiesProvincesAndTowns"]),
    ...mapMutations("loader", ["SET_START_DATA"]),
  },
  computed: {
    ...mapState("tablasBase", ["loading"]),
    ...mapState("loader", ["loader"]),
  },
  mounted() {
    this.fetchCitiesProvincesAndTowns();
  },
};
</script>
