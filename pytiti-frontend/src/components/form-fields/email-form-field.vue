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
      @change="validateEmail"
      :id="field.id"
      :name="field.name"
      type="email"
      class="form-control"
      :class="{ 'is-invalid': errorVuelidate }"
      :required="field.required"
      :placeholder="field.placeholder"
    />
    <div class="invalid-feedback">Éste campo es requerido</div>
  </div>
</template>

<script>
export default {
  name: "EmailFormField",
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
      feedback: {
        error: "",
        data: false,
      },
      hasErrors: false,
    };
  },
  methods: {
    validateEmail(e) {
      this.updateField(e);
    },
  },
};
</script>
