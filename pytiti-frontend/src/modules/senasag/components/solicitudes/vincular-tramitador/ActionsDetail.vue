<template>
  <div class="d-flex flex-wrap gap-2">
    <a
      v-if="requestAttachProcessor.estado == 'SOLICITADO'"
      @click="$emit('show:approve-modal')"
      class="btn btn-success btn-icon"
      v-b-tooltip.hover
      title="Aprobar"
    >
      <i class="bx bx-check" style="font-size: 20px"></i>
    </a>
    <a
      v-if="requestAttachProcessor.estado == 'SOLICITADO'"
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
    requestAttachProcessor: {
      type: Object,
    },
  },
  methods: {},
};
</script>
