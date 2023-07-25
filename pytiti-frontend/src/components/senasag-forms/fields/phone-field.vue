<template>
  <div v-if="field.type_field === 'phone'">
    <label :for="field.id" :class="field.class_label">{{ field.label }}</label>
    <input
      :type="field.type"
      class="form-control"
      :id="field.id"
      :placeholder="field.placeholder"
      :name="[
        field.entity_field === null ? field.name : field.entity_field.name,
      ]"
      :required="field.required"
      :readonly="field.read_only || userIsAdmin"
      @focus="checkFieldRequired"
      @change="updateChange"
    />
    <div
      v-if="notValid"
      class="invalid-feedback"
      :style="[notValid ? 'display:block' : 'display:none']"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PhoneField",
  props: {
    field: {
      type: Object,
    },
  },
  data() {
    return {
      notValid: false,
      error: undefined,
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  methods: {
    validateField(e) {
      let validate = String(e.target.value)
        .toLowerCase()
        .match(/^[0-9]/);
      if (validate === null) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        this.notValid = true;
        this.error = "Teléfono inválido.";
        return true;
      } else {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        this.notValid = false;
        this.error = undefined;
        return false;
      }
    },
    checkFieldRequired(e) {
      if (!e.target.hasAttribute("readonly")) {
        if (this.field.required && e.target.value === "") {
          e.target.classList.remove("is-valid");
          e.target.classList.add("is-invalid");
          this.notValid = true;
          this.error = "Éste campo es requerido";
        } else {
          e.target.classList.remove("is-invalid");
          e.target.classList.add("is-valid");
          this.notValid = false;
          this.error = undefined;
        }
      }
    },
    updateChange(e) {
      if (e.target.hasAttribute("readonly")) {
        this.validateField(e);
        this.$emit("update-change", { [e.target.name]: e.target.value });
      }
    },
  },
};
</script>
