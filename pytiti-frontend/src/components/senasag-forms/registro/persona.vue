<template>
  <div :class="className">
    <h5 class="mb-3">DATOS DE PERSONA NATURAL</h5>
    
    <div class="mb-3">
      <label
        for="prefijotitulo"
        class="form-label"
        :class="{
          'text-danger': errorsProp.prefijotitulo?.length > 0,
        }"
        >Prefijo</label
      >
      <input
        @change="updateChange"
        type="text"
        class="form-control"
        required
        id="prefijotitulo"
        name="prefijotitulo"
        :class="{
          'is-invalid': errorsProp.prefijotitulo?.length > 0,
        }"
        placeholder="Ej. Ing. Sra. Lic. Dra."
      />
      <div
        v-for="(item, index) in errorsProp.prefijotitulo"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="nombres"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.nombres?.length > 0,
        }"
        >Nombre(s)</label
      >
      <input
        @change="updateChange"
        type="text"
        class="form-control"
        required
        id="nombres"
        name="nombres"
        :class="{
          'is-invalid': errorsProp.nombres?.length > 0,
        }"
        placeholder="Escriba su Nombre(s)"
      />
      <div
        v-for="(item, index) in errorsProp.nombres"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>
    <div class="row">
      
        <div class="mb-3">
          <label
            for="apellido_paterno"
            class="form-label required"
            :class="{
              'text-danger': errorsProp.apellido_paterno?.length > 0,
            }"
            >Apellido Paterno</label
          >
          <input
            @change="updateChange"
            type="text"
            class="form-control"
            required
            id="apellido_paterno"
            name="apellido_paterno"
            :class="{
              'is-invalid': errorsProp.apellido_paterno?.length > 0,
            }"
            placeholder="Escriba su Apellido Paterno"
          />
          <div
            v-for="(item, index) in errorsProp.apellido_paterno"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      
      
        <div class="mb-3">
          <label for="apellido_materno" class="form-label"
           :class="{
              'text-danger': errorsProp.apellido_materno?.length > 0,
            }"
            >Apellido Materno</label
          >
          <input
            @change="updateChange"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errorsProp.apellido_materno?.length > 0,
            }"
            required
            id="apellido_materno"
            name="apellido_materno"
            placeholder="Escriba su Apellido Materno"
          />
           <div
            v-for="(item, index) in errorsProp.apellido_materno"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-if="item.message">{{ item.message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      
    </div>
    <div class="row">
      
        <div class="mb-3">
          <label
            for="idcarnet"
            class="form-label required"
            :class="{
              'text-danger': errorsProp.idcarnet?.length > 0,
            }"
            >Nro. Documento de Identidad</label
          >
          <input
            @change="updateChange"
            type="text"
            class="form-control"
            required
            id="idcarnet"
            name="idcarnet"
            :class="{
              'is-invalid': errorsProp.idcarnet?.length > 0,
            }"
            placeholder="Escriba su número de documento de identidad"
          />
          <div
            v-for="(item, index) in errorsProp.idcarnet"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
     

      
        <div class="mb-3">
          <label for="complemento" class="form-label">Complemento: </label>
          <input
            @change="updateChange"
            maxlength="3"
            type="text"
            class="form-control"
            id="complemento"
            name="complemento"
            placeholder="Ej. M"
          />
        </div>
      
    </div>
    
    <div class="mb-3">
      <label
        for="fechanac"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.fechanac?.length > 0,
        }"
        >Fecha de nacimiento:
      </label>
      <input
        @change="updateFormatDate"
        type="date"
        class="form-control"
        required
        name="fechanac"
        id="fechanac"
        :class="{
          'is-invalid': errorsProp.fechanac?.length > 0,
        }"
        min="01-01-2010"
      />
      <div
        v-for="(item, index) in errorsProp.fechanac"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="lugarnac"
        class="form-label"        
        >Lugar de nacimiento:
      </label>
      <input
        @change="updateFormatDate"
        type="text"
        class="form-control"
        required
        name="lugarnac"
        placeholder="Su ciudad o lugar de nacimiento"
        id="lugarnac"        
      />
      <div
        v-for="(item, index) in errorsProp.lugarnac"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>


    <div class="mb-3">
      <label 
      for="sexo" 
      class="form-label required" 
      :class="{
        'text-danger': errors.sexo
      }">Género: </label>
      <select 
      @input="updateChange" 
      id="sexo" 
      name="sexo"
      placeholder="Seleccione..."
      class="form-select mb-3">
      <option selected disabled>Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>        
      </select>

      <div class="invalid-feedback" v-if="errors.sexo">
        {{ errors.sexo[0].message }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="iddistrital"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.iddistrital?.length > 0,
        }"
        >Departamento de Residencia:
      </label>
      <select
        @change="updateChange"
        id="iddistrital"
        name="iddistrital"
        class="form-select mb-3"
        required
        :class="{
          'is-invalid': errorsProp.iddistrital?.length > 0,
        }"
      >
        <option>Seleccione...</option>
        <option
          :value="item.id"
          :key="index"
          v-for="(item, index) in distritales"
        >
          {{ item.name }}
        </option>
      </select>
      <div
        v-for="(item, index) in errorsProp.iddistrital"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="residencia"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.residencia?.length > 0,
        }"
        >Ciudad de residencia:
      </label>
      <input
        @change="updateChange"
        type="text"
        class="form-control"
        required
        id="residencia"
        name="residencia"
        :class="{
          'is-invalid': errorsProp.residencia?.length > 0,
        }"
        placeholder="Escriba la ciudad donde reside"
      />
      <div
        v-for="(item, index) in errorsProp.residencia"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="direccion"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.direccion?.length > 0,
        }"
        >Dirección de residencia:
      </label>
      <input
        @change="updateChange"
        type="text"
        class="form-control"
        required
        id="direccion"
        name="direccion"
        :class="{
          'is-invalid': errorsProp.direccion?.length > 0,
        }"
        placeholder="Escriba su dirección completa"
      />
      <div
        v-for="(item, index) in errorsProp.direccion"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="telefonos"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.telefonos?.length > 0,
        }"
        >Teléfonos</label
      >
      <input
        @change="updateChange"
        type="text"
        class="form-control"
        required
        id="telefonos"
        name="telefonos"
        :class="{
          'is-invalid': errorsProp.telefonos?.length > 0,
        }"
        placeholder="Escriba su número de teléfono y/o celular"
      />
      <div
        v-for="(item, index) in errorsProp.telefonos"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="correoe"
        class="form-label required"
        :class="{
          'text-danger': errorsProp.correoe?.length > 0,
        }"
        >Correo electrónico (Personal):
      </label>
      <div class="form-icon right">
        <input
          @change="validateEmail"
          type="email"
          class="form-control"
          required
          id="correoe"
          name="correoe"
          :class="{
            'is-invalid': errorsProp.correoe?.length > 0,
          }"
          placeholder="Ej. nombre@gmail.com"
        />
        <i class="ri-mail-unread-line"></i>
      </div>
      <div
        class="invalid-feedback"
        v-if="errors.correoe"
        :style="[errors.correoe.status ? 'display:block' : 'display:none']"
      >
        {{ errors.correoe.message }}
      </div>
      <div
        v-for="(item, index) in errorsProp.correoe"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>
    

  </div>
</template>

<script>
import MapWriteField from "@/components/senasag-forms/form-fields/map-write-field.vue";
import { checkEmailIsUnique } from "@/services/validations";

export default {
  name: "PersonaRegistroForm",
  components: {
    MapWriteField,
  },
  props: {
    className: {
      type: String,
    },
    errorsProp: {
      type: Object,
      defaul: () => {},
    },
  },
  data() {
    return {
      errors: {},
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
    updateChange(e) {
      this.$emit("update-change", { [e.target.name]: e.target.value });
    },
    updateFormatDate(e) {
      let date = new Date(e.target.value);
      this.$emit("update-change", { [e.target.name]: date.toISOString() });
    },
    updateMapLocation({ latitud, longitud }) {
      this.$emit("update-change", {
        ...this.modelValue,
        latitud,
        longitud,
      });
    },
    validateEmail(e) {
      checkEmailIsUnique({ email: e.target.value })
        .then((res) => {
          if (!res.data) {
            this.errors[e.target.name] = {
              status: false,
              message: undefined,
            };
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
            this.$emit("update-change", { [e.target.name]: e.target.value });
          } else {
            this.errors[e.target.name] = {
              status: true,
              message: res.mge,
            };
            e.target.classList.add("is-invalid");
            e.target.classList.add("is-valid");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    let allInputs = [...document.querySelectorAll("input")];
    allInputs.map((item) => {
      Object.assign(this.errors, {
        [item.name]: { status: false, message: undefined },
      });
    });
  },
};
</script>

<style></style>
