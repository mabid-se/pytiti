<template>
  <div :class="className">
    <h5 class="mb-3">DATOS DEL REPRESENTANTE LEGAL</h5>

    <div class="mb-3">
      <label
        for="per_prefijonombre"
        class="form-label"
        :class="{
          'text-danger': errors.per_prefijonombre,
        }"
        >Prefijo
      </label>
      <input
        @input="updateChange"
        name="per_prefijonombre"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_prefijonombre,
        }"
        id="per_prefijonombre"
        placeholder="Ej. Ing. Sra. Lic. Dra."
      />
      <div class="invalid-feedback" v-if="errors.per_prefijonombre">
        {{ errors.per_prefijonombre[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="nombres"
        class="form-label required"
        :class="{
          'text-danger': errors.per_nombres,
        }"
        >Nombre(s) del representante legal
      </label>
      <input
        @input="updateChange"
        name="per_nombres"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_nombres,
        }"
        id="nombres"
        placeholder="Escriba el nombre de su empresa"
      />
      <div class="invalid-feedback" v-if="errors.per_nombres">
        {{ errors.per_nombres[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="apellido_paterno"
        class="form-label required"
        :class="{
          'text-danger': errors.per_apellido_paterno,
        }"
        >Apellido paterno del representante legal
      </label>
      <input
        @input="updateChange"
        name="per_apellido_paterno"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_apellido_paterno,
        }"
        id="apellido_paterno"
        placeholder="Escriba el apellido paterno del representante legal"
      />
      <div class="invalid-feedback" v-if="errors.per_apellido_paterno">
        {{ errors.per_apellido_paterno[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="apellido_materno"
        class="form-label"
        :class="{
          'text-danger': errors.per_apellido_materno,
        }"
        >Apellido materno del representante legal
      </label>
      <input
        @input="updateChange"
        name="per_apellido_materno"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_apellido_materno,
        }"
        id="apellido_materno"
        placeholder="Escriba el apellido materno del representante legal"
      />
      <div class="invalid-feedback" v-if="errors.per_apellido_materno">
        {{ errors.per_apellido_materno[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="idcarnet"
        class="form-label required"
        :class="{
          'text-danger': errors.per_idcarnet,
        }"
        >Nro. Documento de Identidad
      </label>
      <input
        @input="updateChange"
        name="per_idcarnet"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_idcarnet,
        }"
        id="idcarnet"
        placeholder="Escriba número de CI"
      />
      <div class="invalid-feedback" v-if="errors.per_idcarnet">
        {{ errors.per_idcarnet[0] }}
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-3">
          <label
            for="complemento"
            class="form-label"
            :class="{
              'text-danger': errors.per_complemento,
            }"
            >Complemento
          </label>
          <input
            @input="updateChange"
            name="per_complemento"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.per_complemento,
            }"
            id="complemento"
            placeholder="Escriba. Ej. C1"
          />
          <div class="invalid-feedback" v-if="errors.per_complemento">
            {{ errors.per_complemento[0] }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-12 mb-3">
      <div class="d-flex flex-column datepicker success">
        <label
          class="form-label required"
          :class="{
            'text-danger': errors.per_fechanac,
          }"
          for="fechanac"
          >Fecha de nacimiento</label
        >

        <KtFlatPickr
          id="fechanac"
          name="fechanac"
          class="form-control flatpickr-input"
          :class="{
            'is-invalid': errors.per_fechanac,
          }"
          v-model="per_fechanac"
        ></KtFlatPickr>

        <div class="error-validation" v-if="errors.per_fechanac">
          {{ errors.per_fechanac[0] }}
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="lugarnac"
        class="form-label"
        :class="{
          'text-danger': errors.per_lugarnac,
        }"
        >Lugar de nacimiento</label
      >
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_lugarnac,
        }"
        id="lugarnac"
        name="per_lugarnac"
        placeholder=""
      />
      <div class="invalid-feedback" v-if="errors.per_lugarnac">
        {{ errors.per_lugarnac[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="sexo"
        class="form-label required"
        :class="{
          'text-danger': errors.per_sexo,
        }"
        >Género</label
      >
      <select
        id="sexo"
        name="per_sexo"
        @input="updateChange"
        class="form-control"
        :class="{
          'is-invalid': errors.per_sexo,
        }"
      >
        <option selected disabled>Seleccione...</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="O">Otro</option>
      </select>
      <div class="invalid-feedback" v-if="errors.per_sexo">
        {{ errors.per_sexo[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="iddistrital"
        class="form-label required"
        :class="{
          'text-danger': errors.per_iddistrital,
        }"
        >Departamento de Residencia
      </label>
      <select
        @input="updateChange"
        id="iddistrital"
        name="per_iddistrital"
        class="form-select mb-3"
        :class="{
          'text-danger': errors.per_iddistrital,
        }"
      >
        <option>-- Seleccionar --</option>
        <option
          :value="item.id"
          :key="index"
          v-for="(item, index) in distritales"
        >
          {{ item.name }}
        </option>
      </select>
      <div class="invalid-feedback" v-if="errors.per_iddistrital">
        {{ errors.per_iddistrital[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="residencia"
        class="form-label required"
        :class="{
          'text-danger': errors.per_residencia,
        }"
        >Ciudad de residencia
      </label>
      <input
        @input="updateChange"
        name="per_residencia"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_residencia,
        }"
        id="residencia"
        placeholder="Escriba la ciudad donde reside el representante"
      />
      <div class="invalid-feedback" v-if="errors.per_residencia">
        {{ errors.per_residencia[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="direccion"
        class="form-label required"
        :class="{
          'text-danger': errors.per_direccion,
        }"
        >Dirección de residencia
      </label>
      <input
        @input="updateChange"
        name="per_direccion"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_direccion,
        }"
        id="direccion"
        placeholder="Escriba la dirección completa del representante"
      />
      <div class="invalid-feedback" v-if="errors.per_direccion">
        {{ errors.per_direccion[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="telefonos"
        class="form-label required"
        :class="{
          'text-danger': errors.per_telefonos,
        }"
        >Teléfonos</label
      >
      <input
        @input="updateChange"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_telefonos,
        }"
        id="telefonos"
        name="per_telefonos"
        placeholder="Escriba el número de teléfono y/o celular del representante"
      />
      <div class="invalid-feedback" v-if="errors.per_telefonos">
        {{ errors.per_telefonos[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label
        for="correoe"
        class="form-label required"
        :class="{
          'text-danger': errors.per_correoe,
        }"
        >Correo electrónico (del representante)
      </label>
      <div
        class="form-icon right"
        :class="{
          'is-invalid': errors.per_correoe,
        }"
      >
        <input
          @input="updateChange"
          name="per_correoe"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.per_correoe,
          }"
          id="correoe"
          placeholder="Ej. jperez@gmail.com"
        />
        <i class="ri-mail-unread-line"></i>
      </div>
      <div class="invalid-feedback" v-if="errors.per_correoe">
        {{ errors.per_correoe[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label
        for="per_cargo"
        class="form-label required"
        :class="{
          'text-danger': errors.per_cargo,
        }"
        >Cargo (del representante)
      </label>

      <input
        @input="updateChange"
        name="per_cargo"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.per_cargo,
        }"
        id="per_cargo"
        placeholder="Cargo"
      />
      <div class="invalid-feedback" v-if="errors.per_cargo">
        {{ errors.per_cargo[0] }}
      </div>
    </div>

    <div :class="className">
      <div class="mb-3">
        <label
          for="copiaci"
          class="form-label required"
          :class="{
            'text-danger': errors.per_copiaci,
          }"
          >Fotocopia de documento de Identidad del representante</label
        >
        <input
          @change="handleFile"
          type="file"
          class="form-control"
          :class="{
            'is-invalid': errors.per_copiaci,
          }"
          id="copiaci"
          name="per_copiaci"
          accept="application/pdf"
        />
        <div class="invalid-feedback" v-if="errors.per_copiaci">
          {{ errors.per_copiaci[0] }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="copia_cartapoder"
          class="form-label"
          :class="{
            'text-danger': errors.per_copia_cartapoder,
          }"
          >Copia poder de representante legal</label
        >
        <input
          @change="handleFile"
          type="file"
          class="form-control"
          :class="{
            'is-invalid': errors.per_copia_cartapoder,
          }"
          id="copia_cartapoder"
          name="per_copia_cartapoder"
          accept="application/pdf"
        />
        <div class="invalid-feedback" v-if="errors.per_copia_cartapoder">
          {{ errors.per_copia_cartapoder[0] }}
        </div>
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
      per_fechanac: null,
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
        [e.target.name]: date.toISOString().split("T")[0],
      });
    },
    handleFile(e) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: e.target.files[0],
      });
    },
  },
  watch: {
    per_fechanac(newValue) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        per_fechanac: newValue,
      });
    },
  },
};
</script>
