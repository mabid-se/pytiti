<template>
  <div :class="className">
    <h5 class="mb-3">DATOS DEL REPRESENTANTE LEGAL</h5>
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
          'text-danger': errors.nombres,
        }"
        >Nombre(s) del representante legal:
      </label>
      <input
        @input="updateChange"
        name="nombres"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.nombres,
        }"
        id="nombres"
        placeholder="Escriba el nombre de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.nombres">
        {{ errors.nombres[0].message.message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="apellido_paterno"
        class="form-label required"
        :class="{
          'text-danger': errors.apellido_paterno,
        }"
        >Apellido paterno del representante legal:
      </label>
      <input
        @input="updateChange"
        name="apellido_paterno"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.apellido_paterno,
        }"
        id="apellido_paterno"
        placeholder="Escriba el apellido paterno del representante legal"
      />
      <div class="invalid-feedback" v-if="errors.apellido_paterno">
        {{ errors.apellido_paterno[0].message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="apellido_materno"
        class="form-label"
        :class="{
          'text-danger': errors.apellido_materno,
        }"
        >Apellido materno del representante legal:
      </label>
      <input
        @input="updateChange"
        name="apellido_materno"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.apellido_materno,
        }"
        id="apellido_materno"
        placeholder="Escriba el apellido materno del representante legal"
      />
      <div class="invalid-feedback" v-if="errors.apellido_materno">
        {{ errors.apellido_materno[0].message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="idcarnet"
        class="form-label required"
        :class="{
          'text-danger': errors.idcarnet,
        }"
        >Nro. Documento de Identidad:
      </label>
      <input
        @input="updateChange"
        name="idcarnet"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.idcarnet,
        }"
        id="idcarnet"
        placeholder="Escriba número de CI"
      />
      <div class="invalid-feedback" v-if="errors.idcarnet">
        {{ errors.idcarnet[0].message }}
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-6">
        <div class="mb-3">
          <label
            for="origenci"
            class="form-label"
            :class="{
              'text-danger': errors.origenci,
            }"
            >Extensión:
          </label>
          <input
            @input="updateChange"
            name="origenci"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.origenci,
            }"
            id="origenci"
            placeholder="Escriba. Ej. LP"
          />
          <div class="invalid-feedback" v-if="errors.origenci">
            {{ errors.origenci[0].message }}
          </div>
        </div>
      </div> -->
      <div class="col-lg-12">
        <div class="mb-3">
          <label
            for="complemento"
            class="form-label"
            :class="{
              'text-danger': errors.complemento,
            }"
            >Complemento:
          </label>
          <input
            @input="updateChange"
            name="complemento"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.complemento,
            }"
            id="complemento"
            placeholder="Escriba. Ej. C1"
          />
          <div class="invalid-feedback" v-if="errors.complemento">
            {{ errors.complemento[0].message }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label
        for="fechanac"
        class="form-label required"
        :class="{
          'text-danger': errors.fechanac,
        }"
        >Fecha de nacimiento:
      </label>
      <input
        @input="updateFormatDate"
        name="fechanac"
        type="date"
        class="form-control"
        :class="{
          'is-invalid': errors.fechanac,
        }"
        id="fechanac" 
        min="01/01/2010"
      />
      <div class="invalid-feedback" v-if="errors.fechanac">
        {{ errors.fechanac[0].message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="correoe"
        class="form-label"
        :class="{
          'text-danger': errors.correoe,
        }"
        >Correo electrónico:
      </label>
      <div
        class="form-icon right"
        :class="{
          'is-invalid': errors.correoe,
        }"
      >
        <input
          @input="updateChange"
          name="correoe"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.correoe,
          }"
          id="correoe"
          placeholder="Ej. jperez@gmail.com"
        />
        <i class="ri-mail-unread-line"></i>
      </div>
      <div class="invalid-feedback" v-if="errors.correoe">
        {{ errors.correoe[0].message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="telefonos"
        class="form-label"
        :class="{
          'text-danger': errors.telefonos,
        }"
        >Celular:
      </label>
      <input
        @input="updateChange"
        name="telefonos"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.telefonos,
        }"
        id="telefonos"
        placeholder="Escriba su celular"
      />
      <div class="invalid-feedback" v-if="errors.telefonos">
        {{ errors.telefonos[0].message }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="direccion"
        class="form-label required"
        :class="{
          'text-danger': errors.direccion,
        }"
        >Dirección:
      </label>
      <input
        @input="updateChange"
        name="direccion"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.direccion,
        }"
        id="direccion"
        placeholder="Escriba la dirección de domicilio"
      />
      <div class="invalid-feedback" v-if="errors.direccion">
        {{ errors.direccion[0].message }}
      </div>
    </div>

    <div class="mb-3">
      <label 
      for="iddistrital" 
      class="form-label required" 
      :class="{
        'text-danger': errors.iddistrital
      }">Departamento de Residencia: </label>
      <select 
      @input="updateChange" 
      id="iddistrital" 
      name="iddistrital"
      class="form-select mb-3">
        <option>-- Seleccionar --</option>
        <option 
        :value="item.id" 
        :key="index"
        v-for="(item, index) in distritales">{{ item.name }}</option>
      </select>
      <div class="invalid-feedback" v-if="errors.iddistrital">
        {{ errors.iddistrital[0].message }}
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "RepresentanteRegistroForm",
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
    updateChange(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: e.target.value,
      });
    },
    updateFormatDate(e) {
      let date = new Date(e.target.value);
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: date.toISOString(),
      });
    },
  },
};
</script>
