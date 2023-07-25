<template>
  <div class="mb-3">
    <label
      :for="field.id"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >
    <input
      @input="updateField"
      :id="field.id"
      :name="field.name"
      :type="field.type"
      class="form-control"
      :class="{ 'is-invalid': errorVuelidate && errorVuelidate.length > 0 }"
      :placeholder="field.placeholder"
      :required="field.required"
    />

    <div
      v-for="(item, index) in errorVuelidate"
      :key="index"
      class="error-validation"
    >
      <span v-if="item.$message">{{ item.$message }}</span>
      <span v-else-if="item[0]">{{ item[0] }}</span>
      <span v-else>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputFormField",
  props: {
    errorVuelidate: {
      type: [Array],
      required: false,
    },
    field: {
      type: Object,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    updateField(e) {
      this.$emit("update-change", { [e.target.name]: e.target.value });
    },
  },
};
</script>
