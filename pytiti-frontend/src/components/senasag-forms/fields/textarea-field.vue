<template>
  <div v-if="field.type_field === 'textarea'">
    <label :for="field.id" :class="field.label_class">{{ field.label }}</label>
    <textarea
      :name="[
        field.entity_field === null ? field.name : field.entity_field.name,
      ]"
      :required="field.required"
      :type="field.type"
      class="form-control"
      :id="field.id"
      :placeholder="field.placeholder"
      :readonly="field.read_only || readOnly"
      @click="checkFieldRequired"
      @change="updateChange"
    ></textarea>
    <div class="form-text">{{ field.title }}</div>
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
  name: "TextareaField",
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
    updateChange(e) {
      if (!e.target.hasAttribute("readonly")) {
        this.$emit("update-change", { [e.target.name]: e.target.value });
      }
    },
    checkFieldRequired(e) {
      if (e.target.hasAttribute("readonly")) {
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
  },
};
</script>
