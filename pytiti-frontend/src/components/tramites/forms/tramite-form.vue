<template>
  <form class="w-100" novalidate="true" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label
        for="name"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.titulo.$error,
        }"
        >Nombre del trámite</label
      >
      <textarea
        class="form-control"
        id="name"
        name="name"
        rows="2"
        v-model="data.titulo"
        :class="{
          'is-invalid': submitted && v$.data.titulo.$error,
        }"
      ></textarea>

      <div
        v-for="(item, index) in v$.data.titulo.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="mb-3">
      <label
        for="description"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.descripcion.$error,
        }"
        >Descripción del trámite</label
      >
      <textarea
        class="form-control"
        id="description"
        name="description"
        rows="2"
        v-model="data.descripcion"
        :class="{
          'is-invalid': submitted && v$.data.descripcion.$error,
        }"
      ></textarea>
      <div
        v-for="(item, index) in v$.data.descripcion.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <label
          for="area"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.fid_unidad.$error,
          }"
          >Área senasag</label
        >
        <select
          id="area"
          name="area"
          class="form-select"
          aria-label="Default select example"
          v-model="data.fid_unidad"
          :class="{
            'is-invalid': submitted && v$.data.fid_unidad.$error,
          }"
        >
          <option value="">Seleccione un área</option>
          <option
            :value="area.id_unidad"
            v-for="(area, index) in areas"
            :key="`area.${index}`"
          >
            {{ area.nombre }}
          </option>
        </select>

        <div
          v-for="(item, index) in v$.data.fid_unidad.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-lg-6">
        <label
          for="reminder"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.recordatorio.$error,
          }"
          >Recordatorio</label
        >
        <input
          type="number"
          class="form-control"
          v-model="data.recordatorio"
          id="reminder"
          :class="{
            'is-invalid': submitted && v$.data.recordatorio.$error,
          }"
          @keypress="isNumber($event)"
        />
        <div
          v-for="(item, index) in v$.data.recordatorio.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mt-3">
        <label
          for="expiration"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.vencimiento.$error,
          }"
          >Vencimiento</label
        >
        <input
          type="number"
          class="form-control"
          v-model="data.vencimiento"
          id="expiration"
          :class="{
            'is-invalid': submitted && v$.data.vencimiento.$error,
          }"
          @keypress="isNumber($event)"
        />
        <div
          v-for="(item, index) in v$.data.vencimiento.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-lg-6 mt-3">
        <label
          for="years"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.anio_vigencia.$error,
          }"
          >Años de vigencia</label
        >
        <input
          type="number"
          class="form-control"
          id="years"
          :class="{
            'is-invalid': submitted && v$.data.anio_vigencia.$error,
          }"
          @keypress="isNumber($event)"
          v-model="data.anio_vigencia"
        />
        <div
          v-for="(item, index) in v$.data.anio_vigencia.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mt-3">
        <div class="mb-3">
          <label
            for="services"
            class="form-label"
            :class="{
              'text-danger':
                (submitted && v$.data.fid_servicio.$error) ||
                errors.fid_servicio,
            }"
            >Servicio(s) relacionado(s)</label
          >
          <select
            v-choice
            class="form-control"
            id="services"
            name="services"
            multiple
            v-model="data.fid_servicio"
          >
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
          </select>
          <div
            v-for="(item, index) in v$.data.fid_servicio.$errors"
            :key="index"
            class="error-validation"
          >
            {{ item.$message }}
          </div>

          <div v-if="errors.fid_servicio" :key="index" class="error-validation">
            {{ errors.fid_servicio[0].message }}
          </div>
        </div>
      </div>

      <div class="col-lg-6 mt-3">
        <div class="mb-3">
          <label
            for="dependants"
            class="form-label"
            :class="{
              'text-danger':
                (submitted && v$.data.fid_tramite_dependiente.$error) ||
                errors.fid_tramite_dependiente,
            }"
            >Dependientes del trámite</label
          >

          <select
            v-choice
            class="form-control choices-multiple-remove"
            id="dependants"
            name="services"
            multiple
            v-model="data.fid_tramite_dependiente"
          >
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
          </select>

          <div
            v-for="(item, index) in v$.data.fid_tramite_dependiente.$errors"
            :key="index"
            class="error-validation"
          >
            {{ item.$message }}
          </div>
          <div
            v-if="errors.fid_tramite_dependiente"
            :key="index"
            class="error-validation"
          >
            {{ errors.fid_tramite_dependiente[0].message }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <router-link
        :to="{ name: 'creador-tramites-listado' }"
        class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
      >
        <i class="mdi mdi-undo-variant mr-0"></i>
        <span class="text">Cancelar</span>
      </router-link>

      <button
        class="ml-auto btn-right-text primary btn--hover-icon mb-0"
        style="margin-right: 5px"
      >
        <i class="mdi mdi-content-save-outline mr-0"></i>
        <span class="text">Guardar</span>
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  integer,
  minValue,
} from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";
import { registerProcedure } from "@/services/creador-tramites/tramites";
import formMixin from "@/mixins/formMixin";

export default {
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate() };
  },
  mounted() {},
  props: {
    areas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      submitted: false,
      error: false,
      errors: {},
      data: {
        titulo: "",
        descripcion: "",
        fid_unidad: null,
        vencimiento: null,
        recordatorio: null,
        anio_vigencia: null,
        fid_servicio: [],
        fid_tramite_dependiente: [],
      },
    };
  },
  validations: {
    data: {
      titulo: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      descripcion: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      fid_unidad: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      recordatorio: {
        required: helpers.withMessage("El campo es requerido", required),
        integer: helpers.withMessage("Debe ser un número entero", integer),
        minValue: helpers.withMessage(
          "Debe ser mayor o igual a 0",
          minValue(0)
        ),
      },
      vencimiento: {
        required: helpers.withMessage("El campo es requerido", required),
        integer: helpers.withMessage("Debe ser un número entero", integer),
        minValue: helpers.withMessage(
          "Debe ser mayor o igual a 0",
          minValue(0)
        ),
      },
      anio_vigencia: {
        required: helpers.withMessage("El campo es requerido", required),
        integer: helpers.withMessage("Debe ser un número entero", integer),
        minValue: helpers.withMessage(
          "Debe ser mayor o igual a 0",
          minValue(0)
        ),
      },
      fid_servicio: {
        required: helpers.withMessage("El campo es requerido", required),
        minLength: helpers.withMessage("Seleccione al menos uno", minLength(1)),
        $each: helpers.forEach({
          required,
        }),
      },
      fid_tramite_dependiente: {
        required: helpers.withMessage("El campo es requerido", required),
        minLength: helpers.withMessage("Seleccione al menos uno", minLength(1)),
        $each: helpers.forEach({
          required,
        }),
      },
    },
  },
  methods: {
    onSubmit() {
      console.log(JSON.stringify(this.data));
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      this.errors = {};
      registerProcedure({ ...this.data }).then(async (r) => {
        const { ok, errors } = r;
        this.errors = errors;

        if (!ok) {
          return NotificationHelper.error("Errores de validación");
        }

        NotificationHelper.success(
          "Plantilla de trámite registrado exitosamente."
        );

        this.$emit("on:update:createMode", false);
      });
    },
  },
};
</script>
