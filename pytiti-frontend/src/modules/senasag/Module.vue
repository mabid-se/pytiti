<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";

export default {
  name: "Senasag",
  components: {
    Layout,
  },
};
</script>
