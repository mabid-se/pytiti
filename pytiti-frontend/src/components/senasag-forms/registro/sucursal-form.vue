<template>
  <div>
    <h5 class="mb-3">
      DATOS DE LA SUCURSAL
    </h5>
    <div class="mb-3">
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Nombre de la sucursal',
          id: 'nombres',
          name: 'nombres',
          placeholder: '',
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Licencia de funcionamiento',
          id: 'licencia',
          name: 'licencia',
          placeholder: '',
          required: true,
        }"
      />      
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Teléfonos',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba su número de teléfono', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Fax',
          id: 'idcarnet',
          name: 'idcarnet',
          placeholder: 'Escriba su número de fax', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Dirección',
          id: 'complemento',
          name: 'complemento',
          placeholder: 'Escriba su dirección completa', 
          required: true,
        }"
      />
      <SelectFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Departamento',
          id: 'iddistrital',
          name: 'iddistrital',
          required: true,
          placeholder: 'Seleccione...', 
          options: [
            { id: 'BEN', name: 'Beni' },
            { id: 'CBB', name: 'Cochabamba' },
            { id: 'CHU', name: 'Chuquisaca' },
            { id: 'LPZ', name: 'La Paz' },
            { id: 'ORU', name: 'Oruro' },
            { id: 'PDO', name: 'Pando' },
            { id: 'PTS', name: 'Potosi' },
            { id: 'SCZ', name: 'Santa Cruz' },
            { id: 'TJA', name: 'Tarija' },
          ]
        }"
      />
      <SelectFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Provincia',
          id: 'iddistrital',
          name: 'iddistrital',
          required: true,
          placeholder: 'Seleccione...', 
          options: [
            { id: 'BEN', name: 'Beni' },
            { id: 'CBB', name: 'Cochabamba' },
            { id: 'CHU', name: 'Chuquisaca' },
            { id: 'LPZ', name: 'La Paz' },
            { id: 'ORU', name: 'Oruro' },
            { id: 'PDO', name: 'Pando' },
            { id: 'PTS', name: 'Potosi' },
            { id: 'SCZ', name: 'Santa Cruz' },
            { id: 'TJA', name: 'Tarija' },
          ]
        }"
      />
      <SelectFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Municipio',
          id: 'iddistrital',
          name: 'iddistrital',
          required: true,
          placeholder: 'Seleccione...', 
          options: [
            { id: 'BEN', name: 'Beni' },
            { id: 'CBB', name: 'Cochabamba' },
            { id: 'CHU', name: 'Chuquisaca' },
            { id: 'LPZ', name: 'La Paz' },
            { id: 'ORU', name: 'Oruro' },
            { id: 'PDO', name: 'Pando' },
            { id: 'PTS', name: 'Potosi' },
            { id: 'SCZ', name: 'Santa Cruz' },
            { id: 'TJA', name: 'Tarija' },
          ]
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Ciudad',
          id: 'complemento',
          name: 'complemento',
          placeholder: '', 
          required: true,
        }"
      />
      <MapWriteField
        @update-coordinates="updateMapLocation"
        :field="{ 
          label: 'Ubicación', 
          type_field: 'map', 
          id: 'ubicacion' 
        }"
      />
      <EmailFormField 
        @update-change="updateChange" 
        :field="{
          type: 'email',
          label: 'Correo electrónico de la sucursal',
          id: 'correoe',
          name: 'correoe',
          placeholder: 'Ej: info@empresa.com', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Persona de contacto',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba el nombre completo de la persona de contacto', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Cargo',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba el cargo de la persona de contacto', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Teléfono o Celular',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba el número de la persona de contacto', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Correo electrónico',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba el correo electrónico de la persona de contacto', 
          required: true,
        }"
      />
                                          
                                           
      
      
    </div>
  </div>
</template>

<script>
  import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";
  import TextareaFormField from "@/components/senasag-forms/form-fields/textarea-form-field.vue";
  import EmailFormField from "@/components/senasag-forms/form-fields/email-form-field.vue";
  import DateFormField from "@/components/senasag-forms/form-fields/date-form-field.vue";
  import SelectFormField from "@/components/senasag-forms/form-fields/select-form-field.vue";
  import MapWriteField from "@/components/senasag-forms/form-fields/map-write-field.vue";

  export default {
    name: "SucursalForm",
    components: {
      InputFormField,
      TextareaFormField,
      EmailFormField,
      DateFormField,
      SelectFormField,
      MapWriteField,
    },
    methods: {
      updateChange(data) {
        this.$emit("update-form-data", data);
      },
      updateMapLocation({ latitud, longitud }) {
        this.$emit("update-form-data", {
          ...this.modelValue,
          latitud,
          longitud,
        });
      },
    }
  }
</script>