<template>
  <div class="d-flex flex-wrap gap-2">
    <a
      v-if="branchAccountRequest.estado_solicitud == 'SOLICITADO'"
      @click="$emit('show:approve-modal')"
      class="btn btn-success btn-icon"
      v-b-tooltip.hover
      title="Aprobar"
    >
      <i class="bx bx-check" style="font-size: 20px"></i>
    </a>
    <a
      v-if="branchAccountRequest.estado_solicitud == 'APROBADO'"
      @click="$emit('show:resend-email-modal')"
      class="btn btn-info btn-icon"
      v-b-tooltip.hover
      title="Restablecer Contraseña"
    >
      <i class="ri-mail-send-line align-middle"></i>
    </a>
    <a
      v-if="branchAccountRequest.estado_solicitud == 'SOLICITADO'"
      @click="$emit('show:reject-modal')"
      class="btn btn-danger btn-icon"
      v-b-tooltip.hover
      title="Rechazar"
    >
      <i class="bx bx-x align-middle"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "ActionsDetail",
  props: {
    branchAccountRequest: {
      type: Object,
    },
  },
  methods: {},
};
</script>
