<template>
  <div v-if="field.type_field === 'switch'">
    <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
      <input
        :disabled="field.read_only || userIsAdmin"
        @change="updateChange"
        :name="[
          field.entity_field === null ? field.name : field.entity_field.name,
        ]"
        :type="field.type"
        class="form-check-input"
        :id="field.name"
      />
      <label class="form-check-label" :for="field.name">{{
        field.label
      }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SwitchField",
  props: {
    field: {
      type: Object,
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
      let data = {
        [e.target.name]: e.target.checked,
      };
      this.$emit("update-change", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
