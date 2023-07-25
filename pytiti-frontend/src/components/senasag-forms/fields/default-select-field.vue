<template>
  <div v-if="field.type_field === 'defaultSelect'">
    <label :for="field.id">{{ field.label }}</label>
    <div>
      <select
        @change="updateChange"
        v-model="selectedValue"
        class="form-select mb-3"
        aria-label="Default select example"
        :disabled="field.read_only || userIsAdmin"
        :name="[
          field.entity_field === null ? field.name : field.entity_field.name,
        ]"
      >
        <option>{{ field.placeholder }}</option>
        <option
          v-for="(option, index) in parsedOptions"
          selected
          :key="index"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="form-text">{{ field.title }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DefaultSelectField",
  data() {
    return {
      parsedOptions: [],
      optionsLoaded: false,
      type: undefined,
      selectedValue: undefined,
    };
  },
  props: {
    field: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  methods: {
    updateChange(e) {
      this.$emit("update-change", { [e.target.name]: e.target.value });
    },
    loadFieldOptions() {
      this.parsedOptions = JSON.parse(this.field.options);
      this.optionsLoaded = true;
    },
  },
  mounted() {
    this.loadFieldOptions();
    this.selectedValue = this.field.entity_field.value;
  },
};
</script>
