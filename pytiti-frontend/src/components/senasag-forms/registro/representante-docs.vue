<template>
  <div :class="className">
    <h5 class="mb-3">DOCUMENTOS DEL REPRESENTANTE LEGAL</h5>
    <div class="mb-3">
      <label for="copia_cartapoder" class="form-label required"
        >Copia poder de representante legal (adjunto)</label
      >
      <input
        @change="handleFile"
        type="file"
        class="form-control"
        id="copia_cartapoder"
        name="copia_cartapoder"
        accept="application/pdf"
      />
    </div>
    <div class="mb-3">
      <label for="copiaci" class="form-label required">Copia de CI (adjunto)</label>
      <input
        @change="handleFile"
        type="file"
        class="form-control"
        id="copiaci"
        name="copiaci"
        accept="application/pdf"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RepresentanteDocsForm",
  props: {
    errors: {
      type: Object,
      default() {
        return {};
      },
    },
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
    className: {
      type: String,
    },
    companyId: {
      type: String,
    },
  },
  methods: {
    handleFile(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [`${e.target.name}`]: e.target.files[0],
        [`${e.target.name}_name`]: e.target.name,
        [`${e.target.name}_table`]: "personas",
      });
    },
  },
};
</script>

<style></style>
