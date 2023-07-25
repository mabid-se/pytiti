<template>
  <div :class="className">
    <h5 class="mb-3">DATOS DE LA EMPRESA</h5>
    <div class="mb-3">
      <label
        for="emp_razonsocial"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_razonsocial,
        }"
        >Nombre o Razón Social
      </label>
      <input
        type="text"
        class="form-control required"
        :class="{
          'is-invalid': errors.emp_razonsocial,
        }"
        id="emp_razonsocial"
        name="emp_razonsocial"
        placeholder="Escriba el nombre o razón social de su empresa"
        @input="updateChange"
      />
      <div class="invalid-feedback" v-if="errors.emp_razonsocial">
        {{ errors.emp_razonsocial[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="emp_nit"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_nit,
        }"
        >NIT</label
      >
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_nit,
        }"
        id="emp_nit"
        name="emp_nit"
        placeholder="Escriba el NIT"
      />

      <div class="invalid-feedback" v-if="errors.emp_nit">
        {{ errors.emp_nit[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="emp_direccion"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_direccion,
        }"
        >Dirección
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_direccion,
        }"
        id="emp_direccion"
        name="emp_direccion"
        placeholder="Escriba la dirección de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.emp_direccion">
        {{ errors.emp_direccion[0] }}
      </div>
    </div>
    <LocalSearchListField
      class="mb-3"
      @update-change="makeChange"
      @reset-nesteds="$refs.provinces.resetItem()"
      :error-vuelidate="errors.emp_iddistrital"
      :field="{
        label: 'Departamento',
        entity_field: {
          name: 'emp_iddistrital',
        },
        value: modelValue.emp_iddistrital,
      }"
    />
    <LocalSearchListField
      class="mb-3"
      ref="provinces"
      @update-change="makeChange"
      @reset-nesteds="$refs.municipalities.resetItem()"
      :error-vuelidate="errors.emp_idprovincia"
      :field="{
        label: 'Provincia',
        entity_field: {
          name: 'emp_idprovincia',
        },
        value: modelValue.emp_idprovincia,
      }"
    />
    <LocalSearchListField
      ref="municipalities"
      @update-change="makeChange"
      :error-vuelidate="errors.emp_idmunicipio"
      :field="{
        label: 'Municipio',
        entity_field: {
          name: 'emp_idmunicipio',
        },
        value: modelValue.emp_idmunicipio,
      }"
    />

    <div class="mb-3 mt-3">
      <label
        for="emp_ciudad"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_ciudad,
        }"
        >Ciudad / Localidad
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_ciudad,
        }"
        id="emp_ciudad"
        name="emp_ciudad"
        placeholder="Escriba la ciudad o localidad de ubicación"
      />
      <div class="invalid-feedback" v-if="errors.emp_ciudad">
        {{ errors.emp_ciudad[0] }}
      </div>
    </div>

    <div class="mb-3">
      <MapWriteField
        @update-coordinates="updateMapLocation"
        :field="{
          label: 'Ubicación geográfica',
          type_field: 'map',
          id: 'ubicacion',
          required: true,
          key_latitud: 'emp_latitud',
          key_longitud: 'emp_longitud',
          coordinates: {
            latitud,
            longitud,
          },
        }"
      />
    </div>

    <div class="error-validation" v-if="errors.emp_latitud">
      {{ errors.emp_latitud[0] }}
    </div>

    <div class="error-validation" v-else-if="errors.emp_longitud">
      {{ errors.emp_longitud[0] }}
    </div>

    <div class="mb-3">
      <label
        for="emp_telefonos"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_telefonos,
        }"
        >Teléfonos
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_telefonos,
        }"
        id="emp_telefonos"
        name="emp_telefonos"
        placeholder="Escriba el teléfono(s) de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.emp_telefonos">
        {{ errors.emp_telefonos[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="emp_fax"
        class="form-label"
        :class="{
          'text-danger': errors.emp_fax,
        }"
        >Fax
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_fax,
        }"
        id="emp_fax"
        name="emp_fax"
        placeholder="Escriba el número de fax de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.emp_fax">
        {{ errors.emp_fax[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="emp_celular"
        class="form-label"
        :class="{
          'text-danger': errors.emp_celular,
        }"
        >Celular
      </label>
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_celular,
        }"
        id="emp_celular"
        name="emp_celular"
        placeholder="Escriba el número de celular de contacto"
      />
      <div class="invalid-feedback" v-if="errors.emp_celular">
        {{ errors.emp_celular[0] }}
      </div>
    </div>

    <div class="mb-3 mt-3">
      <label
        for="emp_correoe"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_correoe,
        }"
        >Correo electrónico de la empresa
      </label>

      <div
        class="form-icon right"
        :class="{
          'is-invalid': errors.emp_correoe,
        }"
      >
        <input
          @input="updateChange"
          type="email"
          class="form-control"
          id="emp_correoe"
          name="emp_correoe"
          placeholder="Ej. info@miempresa.com"
        />
      </div>

      <div class="invalid-feedback" v-if="errors.emp_correoe">
        {{ errors.emp_correoe[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="emp_direccionweb"
        class="form-label"
        :class="{
          'text-danger': errors.emp_direccionweb,
        }"
        >Página web
      </label>
      <input
        @input="updateChange"
        type="url"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_direccionweb,
        }"
        id="emp_direccionweb"
        name="emp_direccionweb"
        placeholder="Escriba la dirección web"
      />
      <div class="invalid-feedback" v-if="errors.emp_direccionweb">
        {{ errors.emp_direccionweb[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="emp_descripcionactividad"
        class="form-label required"
        :class="{
          'text-danger': errors.emp_descripcionactividad,
        }"
        >Descripción de la actividad de la empresa</label
      >
      <textarea
        @input="updateChange"
        name="emp_descripcionactividad"
        id="emp_descripcionactividad"
        class="form-control"
        :class="{
          'is-invalid': errors.emp_descripcionactividad,
        }"
      ></textarea>

      <div class="invalid-feedback" v-if="errors.emp_descripcionactividad">
        {{ errors.emp_descripcionactividad[0] }}
      </div>
    </div>

    <div :class="className">
      <div class="mb-3">
        <label
          for="emp_copianit"
          class="form-label required"
          :class="{
            'text-danger': errors.emp_copianit,
          }"
          >Fotocopia de NIT</label
        >
        <input
          @change="handleFile"
          type="file"
          class="form-control"
          :class="{
            'is-invalid': errors.emp_copianit,
          }"
          id="emp_copianit"
          name="emp_copianit"
          accept="application/pdf"
        />
        <div class="invalid-feedback" v-if="errors.emp_copianit">
          {{ errors.emp_copianit[0] }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="emp_cartasolicitud"
          class="form-label required"
          :class="{
            'text-danger': errors.emp_cartasolicitud,
          }"
        >
          Carta de solicitud de asignación de cuenta usuario y contraseña
        </label>
        <input
          @change="handleFile"
          type="file"
          class="form-control"
          :class="{
            'is-invalid': errors.emp_cartasolicitud,
          }"
          id="emp_cartasolicitud"
          name="emp_cartasolicitud"
          accept="application/pdf"
        />
        <div class="invalid-feedback" v-if="errors.emp_cartasolicitud">
          {{ errors.emp_cartasolicitud[0] }}
        </div>
      </div>

      <div class="mb-3">
        <label
          for="emp_registrosanitario"
          class="form-label"
          :class="{
            'text-danger': errors.emp_registrosanitario,
          }"
        >
          Registro sanitario (opcional)
        </label>
        <input
          @change="handleFile"
          type="file"
          class="form-control"
          :class="{
            'is-invalid': errors.emp_registrosanitario,
          }"
          id="emp_cartasolicitud"
          name="emp_cartasolicitud"
          accept="application/pdf"
        />
        <div class="invalid-feedback" v-if="errors.emp_registrosanitario">
          {{ errors.emp_registrosanitario[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapWriteField from "@/modules/public/components/fields/MapWriteField.vue";
import LocalSearchListField from "@/modules/public/components/fields/LocalSearchListField.vue";

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
        { id: "BEN", name: "Beni" },
        { id: "CBB", name: "Cochabamba" },
        { id: "CHU", name: "Chuquisaca" },
        { id: "LPZ", name: "La Paz" },
        { id: "ORU", name: "Oruro" },
        { id: "PDO", name: "Pando" },
        { id: "PTS", name: "Potosi" },
        { id: "SCZ", name: "Santa Cruz" },
        { id: "TJA", name: "Tarija" },
      ],
    };
  },
  methods: {
    makeChange(data) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ...data,
      });
    },
    updateChange(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: e.target.value,
      });
    },
    updateMapLocation({ emp_latitud, emp_longitud }) {
      this.latitud = emp_latitud;
      this.longitud = emp_longitud;
      this.$emit("update:modelValue", {
        ...this.modelValue,
        emp_latitud,
        emp_longitud,
      });
    },
    handleFile(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: e.target.files[0],
      });
    },
  },
};
</script>
