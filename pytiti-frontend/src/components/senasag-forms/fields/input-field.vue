<template>
  <div v-if="fields.includes(field.type)">
    <label :for="field.id" :class="field.label_class">{{ field.label }}</label>
    <input
      :type="field.type"
      :class="field.class"
      :name="[
        field.entity_field === null ? field.name : field.entity_field.name,
      ]"
      :id="field.id"
      :placeholder="field.placeholder"
      :value="field.value"
      :readonly="field.read_only"
      :required="field.required"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  data() {
    return {
      fields: ["text", "date", "time", "password"],
    };
  },
  props: {
    field: {
      type: Object,
    },
  },
};
</script>
