<template>
  <div class="mt-2 text-center">
    <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
      <h6 class="fs-15">Guía para seleccionar su trámite</h6>
      <p class="text-muted">
        Responda a este formulario para que un funcionario SENASAG lo guíe en la
        selección de su trámite.
      </p>
    </div>
  </div>
  <form
    @submit.prevent="onSubmit"
    v-if="!loading"
    :set="(v = v$.data)"
    novalidate
  >
    <div class="mb-3">
      <label
        for="detalle_actividad_empresa"
        :class="{
          'text-danger': submitted && v.detalle_actividad_empresa.$error,
        }"
        >Detalle la actividad principal a la que se dedica su empresa</label
      >
      <textarea
        required
        name="detalle_actividad_empresa"
        id="detalle_actividad_empresa"
        rows="4"
        v-model="data.detalle_actividad_empresa"
        class="form-control"
        :class="{
          'is-invalid': submitted && v.detalle_actividad_empresa.$error,
        }"
      ></textarea>
      <div
        v-for="(item, index) in v.detalle_actividad_empresa.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="mb-3">
      <label
        for="objetivo_tramite"
        :class="{
          'text-danger': submitted && v.objetivo_tramite.$error,
        }"
        >¿Cuál es el objetivo que desea cumplir al completar este
        trámite?</label
      >

      <textarea
        required
        name="objetivo_tramite"
        id="objetivo_tramite"
        rows="4"
        v-model="data.objetivo_tramite"
        class="form-control"
        :class="{
          'is-invalid': submitted && v.objetivo_tramite.$error,
        }"
      ></textarea>
      <div
        v-for="(item, index) in v.objetivo_tramite.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label for="tramite">Trámite</label>

      <Select2
        v-if="formattedProcedures"
        v-model="data.tramite"
        :options="formattedProcedures"
        @change="myChangeEvent($event)"
        @select="mySelectEvent($event)"
        :settings="{ width: '100%', dropdownParent: idModal }"
      />
    </div>

    <div class="mb-3">
      <label
        for="celular"
        class="required"
        :class="{
          'text-danger': submitted && v.celular.$error,
        }"
        >Teléfono/Celular de contacto
      </label>
      <input
        type="text"
        class="form-control"
        id="celular"
        name="celular"
        :class="{
          'is-invalid': submitted && v.celular.$error,
        }"
        v-model="data.celular"
      />
      <div
        v-for="(item, index) in v.celular.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="fid_sucursal"
        :class="{
          'text-danger': submitted && v.fid_sucursal.$error,
        }"
        >Sucursal:</label
      >
      <select
        required
        name="fid_sucursal"
        id="fid_sucursal"
        v-model="data.fid_sucursal"
        class="form-control"
        :class="{
          'is-invalid': submitted && v.fid_sucursal.$error,
        }"
      >
        <option selected disabled>Seleccione una sucursal</option>
        <option v-for="(item, index) in branches" :value="item.id" :key="index">
          {{ item.nombre_sucursal }}
        </option>
      </select>
      <div
        v-for="(item, index) in v.fid_sucursal.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="mb-3">
      <label for="tramitador">Encargado de trámite:</label>
      <select
        required
        name="tramitador"
        id="tramitador"
        v-model="data.tramitador"
        class="form-control"
      >
        <option selected disabled>Seleccione un tramitador</option>
        <option :value="null">Empresa: {{ user.data.razon_social }}</option>
        <option disabled>Tramitadores:</option>
        <option
          v-for="(item, index) in processors"
          :value="item.idpersona"
          :key="index"
        >
          {{ item.nombres }}
          {{ item.apellido_paterno }}
          {{ item.apellido_materno }}
        </option>
      </select>
    </div>

    <div class="mb-3" v-if="successAttrs.show || errorAttrs.show">
      <div
        v-if="successAttrs.show"
        class="alert alert-success alert-dismissible alert-solid alert-label-icon fade show"
        role="alert"
      >
        <i class="ri-notification-off-line label-icon"></i>
        <b>{{ successAttrs.title }}</b> - {{ successAttrs.message }}
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div
        v-if="errorAttrs.show"
        class="alert alert-danger alert-dismissible alert-solid alert-label-icon fade show mb-xl-0"
        role="alert"
      >
        <i class="ri-error-warning-line label-icon"></i>
        <b>{{ errorAttrs.title }}</b> - {{ errorAttrs.message }}
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
    <div
      class="d-flex flex-wrap gap-2 mb-3 mt-4 mb-lg-0 justify-content-md-center"
    >
      <button
        class="btn btn-primary btn-label"
        @click.prevent="$emit('on:close:modal')"
        aria-label="Close"
      >
        <div class="d-flex">
          <div class="flex-shrink-0">
            <i
              class="ri-arrow-left-s-line label-icon align-middle fs-16 me-2"
            ></i>
          </div>
          <div class="flex-grow-1">Cerrar</div>
        </div>
      </button>
      <button class="btn btn-success btn-label right">
        <div class="flex-grow-1">Enviar pre-solicitud</div>
        <div class="d-flex">
          <div class="flex-shrink-0">
            <i class="ri-arrow-right-s-line label-icon align-middle fs-16"></i>
          </div>
        </div>
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { sendProcedurePreRequestEmpresa } from "@/services/tramites";
import NotificationHelper from "@/helpers/notification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { getUserRole, getCompanyInfo } from "@/helpers/senasag/user";
import { getUserType } from "@/services/user";

export default {
  name: "PreSolicitudEmpresaModal",
  props: {
    idModal: {
      type: String,
    },
    attrs: {
      type: Object,
    },

    branches: {
      type: Array,
    },
    processors: {
      type: Array,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: {},
      userRole: getUserRole(),
      companyId: getUserType(),
      company: getCompanyInfo(),
      loading: false,
      //
      hasFailed: false,
      hasSucceed: false,
      successAttrs: {
        title: undefined,
        message: undefined,
        show: false,
      },
      errorAttrs: {
        title: undefined,
        message: undefined,
        show: false,
      },
    };
  },
  computed: {
    ...mapGetters("permissions", [
      "userIsAdmin",
      "userIsPerson",
      "userIsProcessor",
    ]),
    ...mapGetters("authfack", ["user"]),
    ...mapState("tablasBase", ["procedures"]),
    formattedProcedures() {
      return this.procedures?.map((p) => ({
        id: p.id,
        text: `(${p.fid_servicio}) ${p.titulo}`,
      }));
    },
  },
  validations() {
    const validations = {
      data: {
        detalle_actividad_empresa: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        objetivo_tramite: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fid_sucursal: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        celular: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      sendProcedurePreRequestEmpresa(this.user.data.id, this.data).then(
        ({ ok, errors: e }) => {
          if (!ok) {
            const { errors, message } = e;
            NotificationHelper.error(null, message);
            return (this.backendErrors = errors);
          }
          NotificationHelper.success(
            null,
            "Su pre-solicitud ha sido realizada correctamente."
          );
          this.$emit("on:close:modal");
        }
      );
    },
    changeMessageState({ show }) {
      this.successAttrs.show = show;
      this.errorAttrs.show = show;
    },
    selectCompany() {
      this.form = { ...this.form, ...{ tramitador: null } };
    },
    ...mapActions("tablasBase", ["fetchProcedures"]),
    //
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
  },
  async mounted() {
    this.form = {
      detalle_actividad_empresa: null,
      objetivo_tramite: null,
      tramitador: "",
      tramite: null,
      celular: null,
    };
    this.fetchProcedures();
  },
};
</script>
