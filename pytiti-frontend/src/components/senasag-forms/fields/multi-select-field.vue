<template>
  <div v-if="field.type_field === 'multiSelect'">
    <label :for="field.name" class="field.label_class">{{ field.label }}</label>
    <Multiselect
      v-model="value"
      mode="tags"
      :disabled="field.read_only || userIsAdmin"
      :placeholder="field.placeholder"
      :close-on-select="false"
      :options="JSON.parse(field.options)"
    />
    <div class="form-text">{{ field.title }}</div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { mapGetters } from "vuex";

export default {
  name: "MultiSelectField",
  components: {
    Multiselect,
  },
  props: {
    field: {
      type: Object,
    },
  },
  data() {
    return {
      value: undefined,
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  updated() {
    let selectedValues = [...this.value];
    this.$emit("update-change", { [this.field.name]: selectedValues });
  },
};
</script>
