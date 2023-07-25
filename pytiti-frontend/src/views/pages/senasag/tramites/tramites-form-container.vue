<template>
  <div class="row">
    <div class="col-lg col-xxl">
      <KLoader v-if="loading"></KLoader>
      <KCard v-else>
        <template v-slot:title>
          <h4 class="card-title mb-0 flex-grow-1">Crear nuevo trámite</h4>
        </template>
        <TramiteForm :areas="areas"></TramiteForm>
      </KCard>
    </div>
  </div>
</template>

<script>
import TramiteForm from "@/components/tramites/forms/tramite-form.vue";

import KCard from "@/components/widgets/card";
import KLoader from "@/components/widgets/loader.vue";

import NotificationHelper from "@/helpers/notification";

import { getAreas } from "@/services/creador-tramites/areas";

export default {
  name: "TramitesListado",
  components: {
    KCard,
    KLoader,
    TramiteForm,
  },
  data() {
    return {
      loading: true,
      areas: [],
    };
  },
  mounted() {
    Promise.all([getAreas()]).then(([{ ok, data }]) => {
      if (!ok) return NotificationHelper.error("Errores al cargar areas");
      this.areas = data;
      this.loading = false;
    });
  },
};
</script>
