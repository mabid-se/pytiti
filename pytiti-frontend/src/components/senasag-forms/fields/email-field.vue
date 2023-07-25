<template>
  <div>
    <label
      :for="field.id"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >
    <div class="form-icon">
      <input
        :value="modelValue"
        :type="field.type"
        class="form-control form-control-icon"
        :class="{
          'is-invalid': errorVuelidate && errorVuelidate.length > 0,
        }"
        :id="field.id"
        :placeholder="field.placeholder"
        :name="[
          field.entity_field === null ? field.name : field.entity_field.name,
        ]"
        :required="field.required"
        :disabled="disabled"
        :readonly="field.read_only || readOnly"
        @change="updateChange"
      />
      <i class="ri-mail-unread-line"></i>
    </div>
    <div class="form-text">{{ field.title }}</div>
    <div
      v-if="notValid"
      class="invalid-feedback"
      :style="[notValid ? 'display:block' : 'display:none']"
    >
      {{ error }}
    </div>
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
import { mapGetters } from "vuex";
export default {
  name: "EmailField",
  props: {
    field: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      notValid: false,
      error: "E-mail inválido",
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
    fieldValue() {
      return this.field.value;
    },
  },
  methods: {
    validateField(e) {
      let validate = String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (validate === null) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        this.notValid = true;
      } else {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        this.notValid = false;
      }
    },
    checkFieldRequired(e) {
      if (e.target.hasAttribute("readonly")) {
        if (this.field.required) {
          if (e.target.value === "") {
            e.target.classList.remove("is-valid");
            e.target.classList.add("is-invalid");
            this.notValid = true;
            this.error = "Éste campo es requerido.";
          } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
            this.notValid = false;
            this.error = undefined;
          }
        }
      }
    },
    updateChange(e) {
      this.$emit("update:modelValue", e.target.value);
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
