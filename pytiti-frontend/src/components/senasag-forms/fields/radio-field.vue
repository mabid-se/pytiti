<template>
  <div>
    <label :for="field.name" class="form-label">{{ field.label }}</label>
    <div class="mt-4 mt-lg-0">
      <div class="form-check form-check-inline">
        <div v-for="(option, index) in JSON.parse(field.options)" :key="index">
          <input
            :disabled="field.read_only || userIsAdmin || readOnlyV"
            :required="field.requried"
            class="form-check-input"
            :type="field.type"
            :name="
              field.entity_field === null ? field.name : field.entity_field.name
            "
            :id="field.name + '-' + index"
            :value="option.value"
            @change="updateChange"
          />
          <label class="form-check-label" :for="field.name + '-' + index">
            {{ option.text }}
          </label>
        </div>
      </div>
    </div>
    <div class="form-text">{{ field.title }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RadioField",

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
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  methods: {
    updateChange(e) {
      if (!e.target.hasAttribute("disabled")) {
        this.$emit("update-change", { [e.target.name]: e.target.value });
      }
    },
  },
};
</script>
