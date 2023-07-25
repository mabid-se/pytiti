<template>
  <div v-if="field.element === 'readonly'">
    <label :for="field.id" :class="field.label_class">{{ field.label }}</label>
    <input
      :type="field.type"
      :class="field.class"
      :id="field.id"
      :value="field.value"
      :readonly="field.read_only"
    />
  </div>
</template>

<script>
export default {
  name: "ReadonlyField",
  props: {
    field: {
      type: Object,
    },
  },
};
</script>
