<template>
  <div class="modal-header px-0 pt-0">
    <h4 class="modal-title" id="myLargeModalLabel">
      Formulario de registro de inspección
    </h4>
    <button
      type="button"
      class="btn-close"
      @click.prevent="$emit('on:closeModal')"
    ></button>
  </div>
  <div class="modal-header px-0">
    <h5 class="modal-title" id="myLargeModalLabel">
      Datos generales del trámite
    </h5>
  </div>
  <div class="modal-body px-0">
    <div class="mb-3">
      <div class="flex-grow-1 ms-2">
        <p class="text-muted mb-0"><strong>Código de tasa</strong></p>
        <p class="text-muted mb-0">
          {{ requestProcedure.fid_tramite.fid_servicio }}
        </p>
      </div>
    </div>
    <div class="mb-3">
      <div class="flex-grow-1 ms-2">
        <p class="text-muted mb-0"><strong>Trámite</strong></p>
        <p class="text-muted mb-0">
          {{ requestProcedure.fid_tramite.titulo }}
        </p>
      </div>
    </div>
    <div class="mb-3">
      <div class="flex-grow-1 ms-2">
        <p class="text-muted mb-0">
          <strong>Nombre o Razón Social</strong>
        </p>
        <p class="text-muted mb-0">
          {{ requestProcedure.fid_empresa.razon_social }}
        </p>
      </div>
    </div>
    <h5>Asignar fecha y hora de la inspección</h5>
    <form class="row">
      <div class="col-3 mb-2">
        <div>
          <label
            for="fecha_inicio"
            class="form-label required"
            :class="{
              'text-danger':
                errors.fecha_inicio?.length > 0 ||
                errors.fecha_hora_inicio?.length > 0,
            }"
            >Fecha de Inicio</label
          >

          <KtFlatPickr
            id="fecha_inicio"
            name="fecha_inicio"
            class="form-control flatpickr-input"
            :class="{
              'is-invalid':
                errors.fecha_inicio?.length > 0 ||
                errors.fecha_hora_inicio?.length > 0,
            }"
            v-model="data.fecha_inicio"
          ></KtFlatPickr>

          <div
            v-for="(item, index) in [
              ...errors.fecha_inicio,
              ...(errors.fecha_hora_inicio || []),
            ]"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else-if="item[0]">{{ item[0] }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-3 mb-2">
        <div>
          <label
            for="hora_inicio"
            class="form-label required"
            :class="{
              'text-danger': errors.hora_inicio?.length > 0,
            }"
            >Hora de Inicio</label
          >
          <input
            type="time"
            class="form-control"
            :class="{
              'is-invalid': errors.hora_inicio?.length > 0,
            }"
            v-model="data.hora_inicio"
            id="hora_inicio"
          />
          <div
            v-for="(item, index) in errors.hora_inicio"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-3 mb-2">
        <div>
          <label
            for="fecha_fin"
            class="form-label required"
            :class="{
              'text-danger':
                errors.fecha_fin?.length > 0 ||
                errors.fecha_hora_fin?.length > 0,
            }"
            >Fecha de Fin</label
          >

          <KtFlatPickr
            id="fecha_fin"
            name="fecha_fin"
            class="form-control flatpickr-input"
            :class="{
              'is-invalid':
                errors.fecha_fin?.length > 0 ||
                errors.fecha_hora_fin?.length > 0,
            }"
            v-model="data.fecha_fin"
          ></KtFlatPickr>
          <div
            v-for="(item, index) in [
              ...errors.fecha_fin,
              ...(errors.fecha_hora_fin || []),
            ]"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else-if="item[0]">{{ item[0] }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-3 mb-2">
        <div>
          <label
            for="hora_fin"
            class="form-label required"
            :class="{
              'text-danger': errors.hora_fin?.length > 0,
            }"
            >Hora de Fin</label
          >
          <input
            type="time"
            class="form-control"
            :class="{
              'is-invalid': errors.hora_fin?.length > 0,
            }"
            v-model="data.hora_fin"
            id="hora_fin"
          />
          <div
            v-for="(item, index) in errors.hora_fin"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div>
          <label
            for="direccion_inspeccion"
            class="form-label required"
            :class="{
              'text-danger': errors.direccion_inspeccion?.length > 0,
            }"
            >Dirección</label
          >
          <input
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.direccion_inspeccion?.length > 0,
            }"
            v-model="data.direccion_inspeccion"
            id="direccion_inspeccion"
          />
          <div id="passwordHelpBlock" class="form-text">
            Escriba la dirección exacta del lugar de la inspección
          </div>
          <div
            v-for="(item, index) in errors.direccion_inspeccion"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-4 mb-2">
        <div>
          <label
            for="responsable_empresa"
            class="form-label required"
            :class="{
              'text-danger': errors.responsable_empresa?.length > 0,
            }"
            >Responsable en la empresa</label
          >
          <input
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.responsable_empresa?.length > 0,
            }"
            v-model="data.responsable_empresa"
            id="responsable_empresa"
          />
          <div id="passwordHelpBlock" class="form-text">
            Nombre del técnico designado en la empresa
          </div>
          <div
            v-for="(item, index) in errors.responsable_empresa"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-4 mb-2">
        <div>
          <label
            for="tel_cel"
            class="form-label required"
            :class="{
              'text-danger': errors.tel_cel?.length > 0,
            }"
            >Celular</label
          >
          <input
            type="text"
            class="form-control"
            :class="{
              'is-invalid': errors.tel_cel?.length > 0,
            }"
            v-model="data.tel_cel"
            id="tel_cel"
          />
          <div id="passwordHelpBlock" class="form-text">
            Escriba el número celular del técnico designado
          </div>
          <div
            v-for="(item, index) in errors.tel_cel"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="col-4 mb-2">
        <div>
          <label
            for="fid_tipo_inspeccion"
            class="form-label required"
            :class="{
              'text-danger': errors.fid_tipo_inspeccion?.length > 0,
            }"
            >Tipo de inspección</label
          >
          <select
            class="form-select mb-3"
            id="fid_tipo_inspeccion"
            :class="{
              'is-invalid': errors.fid_tipo_inspeccion?.length > 0,
            }"
            v-model="data.fid_tipo_inspeccion"
          >
            <option value="">Seleccione</option>
            <option
              :value="inspectionType.id"
              v-for="inspectionType in inspectionTypes"
              :key="inspectionType.id"
            >
              {{ inspectionType.nombre }}
            </option>
          </select>
          <div
            v-for="(item, index) in errors.fid_tipo_inspeccion"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="error-validation">
        <span v-for="(error, index) in errors.errors" :key="index">
          {{ error }}
        </span>
      </div>
    </form>
  </div>
  <div class="modal-footer px-0">
    <a
      class="btn btn-secondary btn-md btn btn-soft-dark waves-effect waves-light me-2"
      @click.prevent="$emit('on:closeModal')"
    >
      Cerrar</a
    >

    <button type="button" @click.prevent="onSubmit" class="btn btn-enviar">
      Guardar
    </button>
  </div>
</template>

<script>
import NotificationHelper from "@/helpers/notification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { createOrUpdateRegisterInspection } from "@/modules/senasag/services/CalendarioService";

export default {
  props: {
    inspector: {
      type: Object,
      required: true,
    },
    inspection: {
      type: Object,
      required: true,
    },
    requestProcedure: {
      type: Object,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    inspectionTypes: {
      type: Array,
      required: true,
    },
  },
  components: {},

  validations() {
    const validations = {
      data: {
        fecha_inicio: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        hora_inicio: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fecha_fin: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        hora_fin: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fid_tipo_inspeccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        direccion_inspeccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        responsable_empresa: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        tel_cel: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };
    return validations;
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    const [fecha_inicio, hora_inicio] = this.initialData.fecha_hora_inicio
      ? this.initialData.fecha_hora_inicio.replace("Z", "").split(" ")
      : [null, null];
    const [fecha_fin, hora_fin] = this.initialData.fecha_hora_fin
      ? this.initialData.fecha_hora_fin.replace("Z", "").split(" ")
      : [null, null];
    return {
      data: {
        ...this.initialData,
        fecha_inicio,
        hora_inicio,
        fecha_fin,
        hora_fin,
        fid_tipo_inspeccion: this.initialData.fid_tipo_inspeccion?.id,
      },

      backendErrors: {},
      submitted: false,
    };
  },
  computed: {
    errors() {
      const v = this.v$.data;
      const errors = {
        fecha_inicio: v.fecha_inicio.$errors,
        hora_inicio: v.hora_inicio.$errors,
        fecha_fin: v.fecha_fin.$errors,
        hora_fin: v.hora_fin.$errors,
        fid_tipo_inspeccion: v.fid_tipo_inspeccion.$errors,
        direccion_inspeccion: v.direccion_inspeccion.$errors,
        responsable_empresa: v.responsable_empresa.$errors,
        tel_cel: v.tel_cel.$errors,
      };
      return {
        ...errors,
        ...this.backendErrors,
      };
    },
  },

  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      const data = {
        ...this.data,
        fid_solicitud_tramite: this.requestProcedure.id_solicitud_tramite,
        fid_inspector: this.initialData.fid_inspector
          ? this.initialData.fid_inspector.id
          : this.inspector.id,
        fecha_hora_inicio: `${this.data.fecha_inicio} ${this.data.hora_inicio}`,
        fecha_hora_fin: `${this.data.fecha_fin} ${this.data.hora_fin}`,
      };
      this.backendErrors = {};
      createOrUpdateRegisterInspection(data)
        .then(({ ok, errors: e }) => {
          this.backendErrors = e;
          console.log(e);
          if (!ok) {
            const { errors, message } = e;
            NotificationHelper.error(null, message);
            return (this.backendErrors = errors);
          }
          NotificationHelper.success(
            null,
            `Solicitud de sucursal ${
              data.id ? "actualizado" : "creado"
            } exitosamente`
          );
          this.$emit("on:createUpdateRegisterInspection");
          this.$emit("on:closeModal");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  watch: {},
};
</script>
