<template>
  <div>
    <label
      class="form-label"
      :for="field.name"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >
    <input
      :value="modelValue"
      :disabled="disabled"
      :readonly="field.read_only || readOnly"
      :required="field.required"
      :name="[
        field.entity_field === null ? field.name : field.entity_field.name,
      ]"
      :type="field.type"
      class="form-control"
      :class="{
        'is-invalid': errorVuelidate && errorVuelidate.length > 0,
      }"
      :id="field.name"
      @input="updateChange"
    />
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
      class="invalid-feedback"
    >
      <span v-if="item.$message">{{ item.$message }}</span>
      <span v-else>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelpinputField",

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
      if (this.field.type === "date") {
        return this.field.value.split("/").reverse().join("-");
      }
      return this.field.value;
    },
  },
  methods: {
    updateChange(e) {
      this.$emit("update:modelValue", e.target.value);
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
  },
  mounted() {
    if (!this.field.entity_field)
      console.error("Entity field was not provided");
    let key = this.field.entity_field.id;
    let value = this.field.entity_field === null ? undefined : this.field.value;
    this.$emit("update-change", { [key]: value });
  },
};
</script>
