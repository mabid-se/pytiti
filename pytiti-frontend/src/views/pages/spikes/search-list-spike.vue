<template>
  <h1>spikes research</h1>

  <LocalSearchListField 
  @update-change="makeChange" 
  :field="{
    label: 'Distrital', 
    type_field: 'selectSearchField',
    api: '/api/v1/select-options/distrital',
    entity_field: {
        name: 'iddistrital'
    },
    value: 'LPZ'
  }" />
  <LocalSearchListField 
  @update-change="makeChange" 
  :field="{
    label: 'Provincias', 
    type_field: 'selectSearchField',
    api: '/api/v1/select-options/provincias',
    entity_field: {
        name: 'idprovincia'
    },
    value: '04'
  }" />
  <LocalSearchListField 
  @update-change="makeChange" 
  :field="{
    label: 'Municipio', 
    type_field: 'selectSearchField',
    api: '/api/v1/select-options/municipios',
    entity_field: {
        name: 'idmunicipio'
    },
    value: '02'
  }" />

  <LocalSearchListField 
  @update-change="makeChange" 
  :field="{
    label: 'Municipio', 
    type_field: 'selectSearchField',
    api: '/api/v1/select-options/municipios',
    entity_field: {
        name: 'idmunicipio'
    },
    value: null
  }" />

</template>

<script>
import LocalSearchListField from "@/components/senasag-forms/fields/local-search-list-field.vue";

export default {
    name: "SearchListSpike",
    components: {
        LocalSearchListField
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