<template>
  <div class="d-flex flex-column datepicker success">
    <label
      :for="field.name"
      class="form-label"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >

    <KtFlatPickr
      id="fechanac"
      name="fechanac"
      class="form-control flatpickr-input"
      :readonly="field.read_only || readOnly"
      :disabled="field.read_only || readOnly"
      :class="{
        'is-invalid': errorVuelidate && errorVuelidate.length > 0,
      }"
      v-model="defaultDate"
    ></KtFlatPickr>

    <div class="form-text">{{ field.title }}</div>
    <div
      v-if="notValid"
      class="invalid-feedback error-validation"
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
  name: "DateInputField",
  props: {
    field: {
      type: Object,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
    modelValue: () => "",
  },
  data() {
    return {
      notValid: false,
      error: undefined,
      value: undefined,
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
    fieldValue() {
      if (this.field.value) {
        if (this.field.type === "date") {
          return this.field.value.split("/").reverse().join("-");
        }
        return this.field.value;
      }
      return this.field.value;
    },
    defaultDate: {
      get: function () {
        return this.modelValue;
      },
      set: function (newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  methods: {
    updateChange(e) {
      this.value = e.target.value;
      this.$emit("update-change", { [e.target.name]: this.value });
    },
    checkFieldRequired(e) {
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
    },
    checkFieldLength(e) {
      if (e.target.value.length > this.field.max_length) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        this.notValid = true;
        this.error = `Éste campo solo permite ${this.field.max_length} caracteres.`;
      } else {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        this.notValid = false;
        this.error = undefined;
      }
    },
    onDateChange(e) {
      this.$emit("update:modelValue", e.target.value);
      console.log(e.target.value);
    },
  },
  mounted() {
    if (!this.field.entity_field)
      console.error("Entity field was not provided");
    this.$emit("update-change", {
      [this.field.entity_field.id]: this.fieldValue,
    });
  },
};
</script>
