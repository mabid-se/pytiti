<template>
  <div :class="className">
    
    <div class="mb-3">
      <label
        for="copiaci"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.copiaci?.length > 0,
        }"
        >Fotocopia de documento de Identidad</label
      >
      <input
        @change="updateChange"
        type="file"
        class="form-control"
        :class="{
          'is-invalid': errorsProp.copiaci?.length > 0,
        }"
        id="copiaci"
        name="copiaci"
        required
      />
      <div
        v-for="(item, index) in errorsProp.copiaci"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PersonaDocForm",
  props: {
    className: {
      type: String,
    },
    errorsProp: {
      type: Object,
      defaul: () => {},
    },
  },

  methods: {
    updateChange(e) {
      this.$emit("update-change", { copiaci_name: e.target.name });
      this.$emit("update-change", { copiaci: e.target.files[0] });
    },
  },
};
</script>

<style></style>
