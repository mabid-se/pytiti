<template>
  <div v-if="field.type_field === 'input'">
    <label :for="field.name">{{ field.label }}</label>
    <input
      :type="field.type"
      :name="field.name"
      :id="field_name"
      :value="field.value"
      @change="handleChange"
      :readonly="field.read_only"
      :required="field.required"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    field: {
      type: Object,
    },
  },
  data() {
    return {
      //
    };
  },
  methods: {
    handleChange(e) {
      e.target.value = this.field.value;
      this.$emit("update-change", {
        [this.field.entity_field.name]: e.target.value,
      });
    },
  },
  mounted() {
    this.$emit("update-change", {
      [this.field.entity_field.name]: e.target.value,
    });
  },
};
</script>
