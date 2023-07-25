<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";
import { mapMutations } from "vuex";

export default {
  name: "Empresa",
  components: {
    Layout,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("tablasBase", ["SET_START_DATA"]),
  },
  mounted() {},
};
</script>
