<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";

export default {
  name: "TramitesListado",
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "MÓDULO DE CREACIÓN Y MODIFICACIÓN DE FORMULARIOS",
      items: [
        {
          text: "Senasag",
          href: "/",
        },
        {
          text: "Proof of Concept",
          active: true,
        },
      ],
    };
  },
};
</script>
