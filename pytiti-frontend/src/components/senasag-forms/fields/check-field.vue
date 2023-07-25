<template>
  <div>
    <label :class="field.label_class" :for="field.id">{{ field.label }}</label>
    <div class="form-check mb-2">
      <div v-for="(option, index) in JSON.parse(field.options)" :key="index">
        <input
          :disabled="field.read_only || readOnly"
          class="form-check-input"
          :type="field.type"
          :name="[
            field.entity_field === null ? field.name : field.entity_field.name,
          ]"
          :id="[field.name + '-' + index]"
          :value="option.value"
          @change="updateChange"
        />
        <label class="form-check-label" :for="[field.name + '-' + index]">
          {{ option.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CheckField",
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
      selectedOptions: [],
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  methods: {
    updateChange(e) {
      if (!e.target.hasAttribute("disabled")) {
        if (this.selectedOptions.includes(e.target.value)) {
          let index = this.selectedOptions.indexOf(e.target.value);
          this.selectedOptions.splice(index, 1);
        } else {
          this.selectedOptions.push(e.target.value);
        }
        this.$emit("update-change", { [e.target.name]: this.selectedOptions });
      }
    },
  },
};
</script>
