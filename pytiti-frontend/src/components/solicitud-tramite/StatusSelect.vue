<template>
  <select
    name="status_select"
    id="status_select"
    class="form-select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option value="">MOSTRAR TODO</option>
    <option
      v-for="(rs, index) in requestStatuses"
      :value="rs.value"
      :key="index"
    >
      {{ rs.title }}
    </option>
  </select>
</template>

<script>
import { StatusRequestProcedure } from "@/constants/SolicitudTramite";

export default {
  name: "StatusSelect",
  props: {
    modelValue: String,
  },
  computed: {
    requestStatuses() {
      return Object.keys(StatusRequestProcedure).map((s) => ({
        title: StatusRequestProcedure[s].replace("_", " "),
        value: StatusRequestProcedure[s],
      }));
    },
  },
};
</script>
