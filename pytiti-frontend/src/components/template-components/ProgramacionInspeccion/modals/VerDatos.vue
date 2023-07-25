<template>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0"><strong>Código de tasa</strong></p>
      <p class="text-muted mb-0">
        {{ requestProcedure.fid_tramite.fid_servicio }}
      </p>
    </div>
  </div>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0"><strong>Trámite</strong></p>
      <p class="text-muted mb-0">
        {{ requestProcedure.fid_tramite.titulo }}
      </p>
    </div>
  </div>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0">
        <strong>Nombre o Razón Social</strong>
      </p>
      <p class="text-muted mb-0">
        {{ requestProcedure.fid_empresa.razon_social }}
      </p>
    </div>
  </div>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0">
        <strong>Dirección completa de la inspeccion</strong>
      </p>
      <p class="text-muted mb-0">{{ inspection.direccion_inspeccion }}</p>
    </div>
  </div>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0">
        <strong>Nombre del Responsable en la empresa</strong>
      </p>
      <p class="text-muted mb-0">
        {{ requestProcedure.fid_tecnico?.cargo }} -
        {{ requestProcedure.fid_tecnico?.apellido_paterno }}
        {{ requestProcedure.fid_tecnico?.apellido_materno }}
        {{ requestProcedure.fid_tecnico?.nombres }}
      </p>
    </div>
  </div>
  <div class="mb-3">
    <div class="flex-grow-1 ms-2">
      <p class="text-muted mb-0"><strong>Teléfono / Celular</strong></p>
      <p class="text-muted mb-0">
        {{ requestProcedure.fid_tecnico?.telefonos }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inspection: {
      type: Object,
      required: true,
    },
    requestProcedure: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },

  methods: {},
  watch: {},
};
</script>
