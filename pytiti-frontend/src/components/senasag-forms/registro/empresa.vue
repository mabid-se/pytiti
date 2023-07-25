<template>
  <div :class="className">
    <h5 class="mb-3">DATOS DE LA EMPRESA  sdfsdf</h5>
    <div class="mb-3">
      <label
        for="razonsocial"
        class="form-label required"
        :class="{
          'text-danger': errors.razonsocial,
        }"
        >Nombre o razón social de la empresa:
      </label>
      <!-- @input="updateChange" -->
      <input
        type="text"
        class="form-control required"
        :class="{
          'is-invalid': errors.razonsocial,
        }"
        id="razonsocial"
        name="razonsocial"
        placeholder="Escriba el nombre de su empresa"
        @input="updateChange"
      />
      <div class="invalid-feedback" v-if="errors.razonsocial">
        {{ errors.razonsocial[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="nit"
        class="form-label required"
        :class="{
          'text-danger': errors.nit,
        }"
        >NIT</label
      >
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.nit,
        }"
        id="nit"
        name="nit"
        placeholder="Escriba el NIT"
      />

      <div class="invalid-feedback" v-if="errors.nit">
        {{ errors.nit[0] }}
      </div>
    </div>
    
    <div class="mb-3">
      <LocalSearchListField 
        @update-change="makeChange" 
        :field="{
          label: 'Departamento', 
          type_field: 'localSelectSearchField',
          entity_field: {
              name: 'iddistrital'
          },
          value: null
        }" 
      />
    </div>
    <div class="mb-3">
      <LocalSearchListField 
        @update-change="makeChange" 
        :field="{
          label: 'Provincia', 
          type_field: 'localSelectSearchField',
          entity_field: {
              name: 'idprovincia'
          },
          value: null
        }" 
      />
    </div>
    <LocalSearchListField 
      @update-change="makeChange" 
      :field="{
        label: 'Municipio', 
        type_field: 'localSelectSearchField',
        entity_field: {
            name: 'idmunicipio'
        },
        value: null
      }" 
    />
    <!-- <div class="mb-3">
      <label 
      for="iddistrital required" 
      class="form-label" 
      :class="{
        'text-danger': errors.iddistrital
      }">Ciudad: </label>
      <select 
      @input="updateChange" 
      name="iddistrital" 
      id="iddistrital" 
      class="form-select mb-3">
        <option>-- Seleccionar --</option>
        <option 
        :value="item.id" 
        :key="index"
        v-for="(item, index) in distritales">{{ item.name }}</option>
      </select>
      <div class="invalid-feedback" v-if="errors.iddistrital">
        {{ errors.iddistrital[0] }}
      </div>
    </div> -->
    <div class="mb-3">
      <label
        for="direccion"
        class="form-label required"
        :class="{
          'text-danger': errors.direccion,
        }"
        >Dirección de la empresa:
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.direccion,
        }"
        id="direccion"
        name="direccion"
        placeholder="Escriba la dirección"
      />
      <div class="invalid-feedback" v-if="errors.direccion">
        {{ errors.direccion[0] }}
      </div>
    </div>
    <div class="mb-3">
      <MapWriteField 
      @update-coordinates="updateMapLocation" 
      :field="{
        label: 'Ubicación', 
        type_field: 'map', 
        id: 'ubicacion', 
        coordinates: {
          latitud, longitud 
        }
      }" />
    </div>
    <!--<div class="mb-3">
      <div class="row">
        <div class="col-lg">
          <label for="latitud">Latitud</label>
          <input 
          class="form-control" 
          type="text" 
          name="latitud" 
          v-model="latitud" 
          id="latitud" />
        </div>
        <div class="col-lg">
          <label for="longitud">Longitud</label>
          <input 
          class="form-control" 
          type="text" 
          name="longitud" 
          v-model="longitud" 
          id="longitud" />
        </div>
      </div>
    </div>-->
    <div class="mb-3">
      <label
        for="correoe"
        class="form-label required"
        :class="{
          'text-danger': errors.correoe,
        }"
        >Correo electrónico de la empresa:
      </label>

      <div
        class="form-icon right"
        :class="{
          'is-invalid': errors.correoe,
        }"
      >
        <input
          @input="updateChange"
          type="email"
          class="form-control"
          id="correoe"
          name="correoe"
          placeholder="Ej. info@miempresa.com"
        />
        <!--i class="ri-mail-unread-line"></i-->
      </div>

      <div class="invalid-feedback" v-if="errors.correoe">
        {{ errors.correoe[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="telefonos"
        class="form-label"
        :class="{
          'text-danger': errors.telefonos,
        }"
        >Teléfono:
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
         :class="{
          'is-invalid': errors.telefonos,
        }"
        id="telefonos"
        name="telefonos"
        placeholder="Escriba el teléfono de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.telefonos">
        {{ errors.telefonos[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="celular"
        class="form-label required"
        :class="{
          'text-danger': errors.celular,
        }"
        >Celular:
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
          :class="{
          'is-invalid': errors.celular,
        }"
        id="celular"
        name="celular"
        placeholder="Escriba su celular"
      />
       <div class="invalid-feedback" v-if="errors.celular">
        {{ errors.celular[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="direccionweb"
        class="form-label"
        :class="{
          'text-danger': errors.direccionweb,
        }"
        >Página web:
      </label>
      <input
        @input="updateChange"
        type="url"
        class="form-control"
        :class="{
          'is-invalid': errors.direccionweb,
        }"
        id="direccionweb"
        name="direccionweb"
        placeholder="Escriba la dirección web"
      />
       <div class="invalid-feedback" v-if="errors.direccionweb">
        {{ errors.direccionweb[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label 
      for="descripcionactividad" 
      class="form-label required" 
      :class="{
          'text-danger': errors.descripcionactividad,
        }"
        >Descripción de la actividad de la empresa</label
      >
      <textarea
        @input="updateChange"
        name="descripcionactividad"
        id="descripcionactividad"
        class="form-control"
        :class="{
          'is-invalid': errors.descripcionactividad,
        }"
      ></textarea>

      <div class="invalid-feedback" v-if="errors.descripcionactividad">
        {{ errors.descripcionactividad[0] }}
      </div>
    </div>
  </div>
</template>

<script>
import MapWriteField from "@/components/senasag-forms/form-fields/map-write-field.vue";
import LocalSearchListField from "@/components/senasag-forms/fields/local-search-list-field.vue";

export default {
  name: "EmpresaRegistroForm",
  components: {
    MapWriteField,
    LocalSearchListField,
  },
  props: {
    errors: {
      type: Object,
      default() {
        return {};
      },
    },
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
    className: {
      type: String,
    },
  },
  data() {
    return {
      latitud: undefined,
      longitud: undefined,
      distritales: [
        {id: 'BEN', name: 'Beni'},
        {id: 'CBB', name: 'Cochabamba'},
        {id: 'CHU', name: 'Chuquisaca'},
        {id: 'LPZ', name: 'La Paz'},
        {id: 'ORU', name: 'Oruro'},
        {id: 'PDO', name: 'Pando'},
        {id: 'PTS', name: 'Potosi'},
        {id: 'SCZ', name: 'Santa Cruz'},
        {id: 'TJA', name: 'Tarija'},
      ]
    };
  },
  methods: {
    makeChange(data) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ...data
      });
    },
    updateChange(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: e.target.value,
      });
    },
    updateMapLocation({latitud, longitud}) {
      this.latitud = latitud;
      this.longitud = longitud;
      this.$emit("update:modelValue", {
        ...this.modelValue,
        latitud,
        longitud
      });
    },
  },
};
</script>
