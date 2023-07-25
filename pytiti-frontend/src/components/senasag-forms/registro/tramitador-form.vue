<template>
  <div>
    <h5 class="mb-3">
      DATOS PERSONALES
    </h5>
    <div class="mb-3">
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Nombre',
          id: 'nombres',
          name: 'nombres',
          placeholder: 'Escriba el nombre',
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Apellido Paterno',
          id: 'apellido_paterno',
          name: 'apellido_paterno',
          placeholder: 'Escriba el apellido paterno',
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Apellido Materno',
          id: 'apellido_materno',
          name: 'apellido_materno',
          placeholder: 'Escriba el apellido materno', 
          required: false,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'CI',
          id: 'idcarnet',
          name: 'idcarnet',
          placeholder: 'Escriba el apellido materno', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Complemento',
          id: 'complemento',
          name: 'complemento',
          placeholder: '', 
          required: false,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Teléfonos',
          id: 'telefonos',
          name: 'telefonos',
          placeholder: 'Ingrese el teléfono del tramitador', 
          required: true,
        }"
      />
      <DateFormField 
        @update-change="updateChange" 
        :field="{
          type: 'date',
          label: 'Fecha de Nacimiento',
          id: 'fechanac',
          name: 'fechanac',
          placeholder: '', 
          required: true,
        }"
      />
      <EmailFormField 
        @update-change="updateChange" 
        :field="{
          type: 'email',
          label: 'Correo Electrónico Personal',
          id: 'correoe',
          name: 'correoe',
          placeholder: 'Ej: jperez@gmail.com', 
          required: true,
        }"
      />
      <InputFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Dirección',
          id: 'direccion',
          name: 'direccion',
          placeholder: 'Escriba la dirección de domicilio', 
          required: true,
        }"
      />
      <SelectFormField 
        @update-change="updateChange" 
        :field="{
          type: 'text',
          label: 'Departamento de Residencia',
          id: 'iddistrital',
          name: 'iddistrital',
          required: true,
          placeholder: 'Escriba la dirección de domicilio', 
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
      <MapWriteField
        @update-coordinates="updateMapLocation"
        :field="{ 
          label: 'Ubicación', 
          type_field: 'map', 
          id: 'ubicacion' 
        }"
      />
    </div>
  </div>
</template>

<script>
  import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";
  import EmailFormField from "@/components/senasag-forms/form-fields/email-form-field.vue";
  import DateFormField from "@/components/senasag-forms/form-fields/date-form-field.vue";
  import SelectFormField from "@/components/senasag-forms/form-fields/select-form-field.vue";
  import MapWriteField from "@/components/senasag-forms/form-fields/map-write-field.vue";

  export default {
    name: "TramitadorForm",
    components: {
      InputFormField,
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