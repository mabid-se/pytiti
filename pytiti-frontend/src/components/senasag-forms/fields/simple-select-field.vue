<template>
  <div>
    <label
      :for="field.name"
      class="form-label"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
    >
      {{ field.label }}
    </label>
    <select
      :value="modelValue"
      :name="field.name"
      :id="field.name"
      :disabled="field.read_only || readOnly"
      :readonly="field.read_only || readOnly"
      class="form-select"
      :class="{
        'is-invalid': errorVuelidate && errorVuelidate.length > 0,
      }"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option selected disabled>{{ field.title }}</option>
      
      <option
        v-for="(option, index) in fieldOptions"
        :key="index"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="form-text">{{ field.title }}</div>
    <div
      v-for="(item, index) in errorVuelidate"
      :key="index"
      class="error-validation"
    >
      <span v-if="item.$message">{{ item.$message }}</span>
      <span v-else>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleSelectField",
  data() {
    return {
      options: [],
    };
  },
  props: {
    field: {
      type: Object,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    modelValue: () => "",
  },
  computed: {
    fieldOptions() {
      return JSON.parse(this.field.options);
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("update-change", {
        [this.field.entity_field.name]: e.target.value,
      });
    },
  },
  mounted() {
    if (!this.field.entity_field)
      console.error("Entity field was not provided");
    this.$emit("update-change", {
      [this.field.entity_field.id]: this.field.value,
    });
  },
};
</script>
