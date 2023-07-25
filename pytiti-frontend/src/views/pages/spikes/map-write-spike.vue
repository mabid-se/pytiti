<template>
  <h1>map spike</h1>
  <MapWriteField 
    :field="{
      type_field: 'map',
      id: 'map1',
      label: 'Ubicación',
    }"
  />

</template>

<script>
import MapWriteField from "@/components/senasag-forms/form-fields/map-write-field.vue";

export default {
    name: "WapWriteSpike",
    components: {
        MapWriteField
    },
    data() {
        return {
            form_data: {},
        }
    },
    methods: {
        makeChange(data) {
            this.form_data = {...this.form_data, ...data}
        },
    },
}
</script>