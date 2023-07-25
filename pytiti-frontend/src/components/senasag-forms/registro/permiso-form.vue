<template>
  <div>
      <div class="mb-3">
        <InputFormField @update-change="updateChange" :field="{
            type: 'text',
            label: 'Nombre del permiso',
            id: 'name',
            name: 'name',
            placeholder: '',
            required: true
           }" 
        />
        <SelectFormField @update-change="updateChange" :field="{
            type: 'text',
            label: 'Tipo',
            id: 'permission_type',
            name: 'permission_type',
            required: true,
            placeholder: 'Seleccione...', 
            options: [
              { id: 'administration', name: 'Administración' },
              { id: 'tramit', name: 'Trámite' },            
            ]
          }"
        />
        <InputFormField @update-change="updateChange" :field="{
            type: 'text',
            label: 'Descripción',
            id: 'description',
            name: 'description',
            placeholder: '',
            required: false,
          }" />
        <InputFormField v-if="valueshow" @update-change="updateChange" :field="{
            type: 'text',
            label: 'Valor del permiso',
            id: 'value',
            name: 'value',
            placeholder: '',
            required: false
           }"/>
      </div>
  </div>
</template>

<script>
  import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";
  import SelectFormField from "@/components/senasag-forms/form-fields/select-form-field.vue";

  export default {
    name: "PermisosForm",
    data() {
        return {
          valueshow: false,
        }
    },
    components: {
      InputFormField,
      SelectFormField,
    },
    methods: {
      updateChange(data) {
        if(data?.permission_type == 'administration') {
            this.valueshow=true;
        }
        this.$emit("update-form-data", data);
      },
    }
  }
</script>