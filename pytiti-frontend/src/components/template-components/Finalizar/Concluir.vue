<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header align-items-center d-flex-">
          <h4 class="card-title mb-2 flex-grow-1">
            Evaluación y generación de certificado
          </h4>
          <h5>Evalue la aprobación del trámite.</h5>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="live-preview">
            <div class="row gy-4">
              <div class="col-sm-12 col-lg-12 col-xxl-12">
                <div class="row">
                  <div class="col-12 mb-3">
                    <div>
                      <p class="text-muted fw-medium">
                        Calificación del trámite:
                      </p>
                      <select
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.estado &&
                            errors.estado.length > 0,
                        }"
                        name="estado"
                        id="estado"
                        class="form-select mb-3"
                        aria-label="Default select example"
                        v-model="form_data.estado"
                      >
                        <option selected disabled>Elija una opción</option>
                        <option value="APROBADO">
                          Registro Sanitario APROBADO
                        </option>
                        <option value="RECHAZADO">
                          Registro Sanitario RECHAZADO
                        </option>
                      </select>
                      <div
                        v-for="(item, index) in errors.estado"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end row-->
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header align-items-center d-flex-">
          <h4 class="card-title mb-2 flex-grow-1">Datos del trámite</h4>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="live-preview">
            <div class="row gy-4">
              <div class="col-sm-12 col-lg-12 col-xxl-12">
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="form-check mb-2">
                      <input
                        name="provisional"
                        id="provisional"
                        class="form-check-input"
                        type="checkbox"
                        :checked="form_data.provisional === 'True'"
                        @change="
                          form_data.provisional = $event.target.checked
                            ? 'True'
                            : 'False'
                        "
                      />
                      <label class="form-check-label" for="provisional">
                        Registro provisional
                      </label>
                      <div id="passwordHelpBlock" class="form-text">
                        (Permitirá importaciones hasta un período máximo de 6
                        meses mientras dure su proceso de registro)
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <p class="text-muted fw-medium">
                      Vigencia del empadronamiento
                    </p>
                    <div class="row">
                      <div class="col-sm-12 col-lg-12 col-xxl-6 mb-3">
                        <div>
                          <label for="fecharegistro" class="form-label"
                            >Fecha de registro</label
                          >

                          <KtFlatPickr
                            id="fecharegistro"
                            name="fecharegistro"
                            class="form-control flatpickr-input"
                            :class="{
                              'is-invalid':
                                submitted &&
                                errors.fecharegistro &&
                                errors.fecharegistro.length > 0,
                            }"
                            v-model="form_data.fecharegistro"
                          ></KtFlatPickr>

                          <div
                            v-for="(item, index) in errors.fecharegistro"
                            :key="index"
                            class="error-validation"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                            <span v-else-if="item">{{ item }}</span>
                            <span v-else>{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div>
                          <label for="anosvalidez" class="form-label"
                            >Años de validez</label
                          >
                          <select
                            name="anosvalidez"
                            id="anosvalidez"
                            class="form-select"
                            v-model="form_data.anosvalidez"
                            :class="{
                              'is-invalid':
                                submitted &&
                                errors.anosvalidez &&
                                errors.anosvalidez.length > 0,
                            }"
                          >
                            <option disabled="" selected="">
                              Elija los años
                            </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <div
                            v-for="(item, index) in errors.anosvalidez"
                            :key="index"
                            class="error-validation"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                            <span v-else-if="item">{{ item }}</span>
                            <span v-else>{{ item }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <p class="text-muted fw-medium">Registro físico</p>
                    <div class="row">
                      <div class="col-6">
                        <div>
                          <label for="libro" class="form-label"
                            >Libro (Secuencial)</label
                          >
                          <input
                            name="libro"
                            id="libro"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                submitted &&
                                errors.libro &&
                                errors.libro.length > 0,
                            }"
                            v-model="form_data.libro"
                          />
                          <div
                            v-for="(item, index) in errors.libro"
                            :key="index"
                            class="error-validation"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                            <span v-else-if="item">{{ item }}</span>
                            <span v-else>{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div>
                          <label for="folio" class="form-label"
                            >Folio (Año)</label
                          >
                          <input
                            name="folio"
                            id="folio"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                submitted &&
                                errors.folio &&
                                errors.folio.length > 0,
                            }"
                            v-model="form_data.folio"
                          />
                          <div
                            v-for="(item, index) in errors.folio"
                            :key="index"
                            class="error-validation"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                            <span v-else-if="item">{{ item }}</span>
                            <span v-else>{{ item }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <p class="text-muted fw-medium">Informe técnico, Actas</p>
                  <div class="col-4">
                    <div class="mb-2">
                      <label for="nroactainspeccion" class="form-label"
                        >Nro. Acta de Inspección</label
                      >
                      <input
                        name="nroactainspeccion"
                        id="nroactainspeccion"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.nroactainspeccion &&
                            errors.nroactainspeccion.length > 0,
                        }"
                        v-model="form_data.nroactainspeccion"
                        @keypress="isNumber($event)"
                      />
                      <div
                        v-for="(item, index) in errors.nroactainspeccion"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                    <div>
                      <label for="fechaactainspeccion" class="form-label"
                        >Fecha Acta Insp.</label
                      >

                      <KtFlatPickr
                        id="fechaactainspeccion"
                        name="fechaactainspeccion"
                        class="form-control flatpickr-input"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.fechaactainspeccion &&
                            errors.nroactainspeccion.length > 0,
                        }"
                        v-model="form_data.fechaactainspeccion"
                      ></KtFlatPickr>

                      <div
                        v-for="(item, index) in errors.fechaactainspeccion"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mb-2">
                      <label for="nroinformetecnico" class="form-label"
                        >Nro. Informe técnico</label
                      >
                      <input
                        name="nroinformetecnico"
                        id="nroinformetecnico"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.nroinformetecnico &&
                            errors.nroinformetecnico.length > 0,
                        }"
                        v-model="form_data.nroinformetecnico"
                        @keypress="isNumber($event)"
                      />
                      <div
                        v-for="(item, index) in errors.nroinformetecnico"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                    <div>
                      <label for="fechainformetecnico" class="form-label"
                        >Fecha Inf. Tec.</label
                      >

                      <KtFlatPickr
                        id="fechainformetecnico"
                        name="fechainformetecnico"
                        class="form-control flatpickr-input"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.fechainformetecnico &&
                            errors.fechainformetecnico.length > 0,
                        }"
                        v-model="form_data.fechainformetecnico"
                      ></KtFlatPickr>

                      <div
                        v-for="(item, index) in errors.fechainformetecnico"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mb-2">
                      <label for="nrodictamen" class="form-label"
                        >Nro. de Dictamen</label
                      >
                      <input
                        name="nrodictamen"
                        id="nrodictamen"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.nrodictamen &&
                            errors.nrodictamen.length > 0,
                        }"
                        v-model="form_data.nrodictamen"
                        @keypress="isNumber($event)"
                      />
                      <div
                        v-for="(item, index) in errors.nrodictamen"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                    <div>
                      <label for="fechadictamen" class="form-label"
                        >Fecha Dictamen</label
                      >

                      <KtFlatPickr
                        id="fechadictamen"
                        name="fechadictamen"
                        class="form-control flatpickr-input"
                        :class="{
                          'is-invalid':
                            submitted &&
                            errors.fechadictamen &&
                            errors.fechadictamen.length > 0,
                        }"
                        v-model="form_data.fechadictamen"
                      ></KtFlatPickr>
                      <div
                        v-for="(item, index) in errors.fechadictamen"
                        :key="index"
                        class="error-validation"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                        <span v-else-if="item">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end row-->
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header align-items-center d-flex-">
          <h4 class="card-title mb-2 flex-grow-1">Envío a la Nacional</h4>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="live-preview">
            <div class="row gy-4">
              <div class="col-sm-12 col-lg-12 col-xxl-12">
                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12">
                        <div>
                          <label for="formFileMultiple" class="form-label"
                            >Cargue la comunicación interna a Oficina
                            Nacional</label
                          >
                          <input
                            ref="inputDocumentacion"
                            accept="application/pdf"
                            @change="onChangeFile"
                            class="form-control"
                            type="file"
                            id="documentacion"
                            name="documentacion"
                            multiple
                          />
                        </div>
                      </div>
                      <div
                        class="d-flex align-items-center border border-dashed p-2 rounded"
                        v-for="fr in requestProcedure.documentacion"
                        :key="fr"
                      >
                        <div class="flex-shrink-0 avatar-sm">
                          <div class="avatar-title bg-light rounded">
                            <i class="ri-file-zip-line fs-20 text-primary"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h6 class="mb-1">
                            <a :href="fr.ruta" target="_blank">{{
                              fr.ruta.split("/").pop()
                            }}</a>
                          </h6>
                          <small class="text-muted"></small>
                        </div>
                        <div class="hstack gap-3 fs-16">
                          <a :href="fr.ruta" target="_blank" class="text-muted"
                            ><i class="ri-download-2-line fs-20"></i
                          ></a>
                          <a
                            v-if="!readOnly"
                            class="text-muted"
                            @click="onShowDeleteConfirmation(fr.id_documento)"
                          >
                            <i class="ri-delete-bin-line fs-20"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end row-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <div class="row">
      <div class="col btn_izq"></div>
      <div class="col-6 col-sm-4 btn_cen">
        <button
          type="button"
          class="btn btn-guardar btn-label right mb-1 mr-1"
          @click="closeProcedure"
        >
          <i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>
          Guardar
        </button>
      </div>
      <div class="col btn_der"></div>
    </div>
  </div>
</template>

<script>
import { closeProcedure } from "@/modules/senasag/services/FinalizarService";
import NotificationHelper from "@/helpers/notification";
import formatDatesMixin from "@/mixins/formatDatesMixin";
import useVuelidate from "@vuelidate/core";
import formMixin from "@/mixins/formMixin";

import {
  required,
  helpers,
  // minLength,
  minValue,
  integer,
} from "@vuelidate/validators";
export default {
  mixins: [formatDatesMixin, formMixin],
  props: {
    requestProcedure: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const validations = {
      form_data: {
        estado: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fecharegistro: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fechaactainspeccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        anosvalidez: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        libro: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        folio: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        nroactainspeccion: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },
        nroinformetecnico: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },
        nrodictamen: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },

        fechainformetecnico: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fechadictamen: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };
    return validations;
  },
  data() {
    return {
      submitted: false,
      form_data: {
        estado: this.requestProcedure.estado,
        fecharegistro: this.formatDatetimezToDate(
          this.requestProcedure.fecharegistro
        ),

        fechaactainspeccion: this.formatDatetimezToDate(
          this.requestProcedure.fechaactainspeccion
        ),
        anosvalidez: this.requestProcedure.anosvalidez,
        libro: this.requestProcedure.libro,
        folio: this.requestProcedure.folio,
        nroactainspeccion: this.requestProcedure.nroactainspeccion,
        nroinformetecnico: this.requestProcedure.nroinformetecnico,
        nrodictamen: this.requestProcedure.nrodictamen,

        fechainformetecnico: this.formatDatetimezToDate(
          this.requestProcedure.fechainformetecnico
        ),

        fechadictamen: this.formatDatetimezToDate(
          this.requestProcedure.fechadictamen
        ),

        provisional:
          (this.requestProcedure.provisional ? "True" : "False") || "False",
      },
      backendErrors: {},
    };
  },
  methods: {
    onChangeFile(event) {
      this.form_data[event.target.name] = [...event.target.files];
    },
    async closeProcedure() {
      this.submitted = true;
      this.v$.$touch();
      this.backendErrors = {};

      if (this.v$.$invalid) return;

      const { ok, errors: e } = await closeProcedure(
        this.requestProcedure.id_solicitud_tramite,
        {
          ...this.form_data,
          fecharegistro: `${this.form_data.fecharegistro} 00:00`,
          fechaactainspeccion: `${this.form_data.fechaactainspeccion} 00:00`,
          fechainformetecnico: `${this.form_data.fechainformetecnico} 00:00`,
          fechadictamen: `${this.form_data.fechadictamen} 00:00`,
        }
      );
      if (!ok) {
        const { errors, message } = e;
        NotificationHelper.error(null, message);
        return (this.backendErrors = errors);
      }

      NotificationHelper.success(
        "Solicitud de trámite concluido exitosamente."
      );
      this.$refs["inputDocumentacion"].value = null;
      this.$emit("on:closedSuccessfully");
    },
  },
  computed: {
    errors() {
      const v = this.v$.form_data;
      console.log(v["estado"].$errors);
      console.log(this.backendErrors);
      return {
        estado: [
          ...(v["estado"]?.$errors || []),
          ...(this.backendErrors["estado"] || []),
        ],
        fecharegistro: [
          ...(v["fecharegistro"]?.$errors || []),
          ...(this.backendErrors["fecharegistro"] || []),
        ],
        fechaactainspeccion: [
          ...(v["fechaactainspeccion"]?.$errors || []),
          ...(this.backendErrors["fechaactainspeccion"] || []),
        ],
        anosvalidez: [
          ...(v["anosvalidez"]?.$errors || []),
          ...(this.backendErrors["anosvalidez"] || []),
        ],
        libro: [
          ...(v["libro"]?.$errors || []),
          ...(this.backendErrors["libro"] || []),
        ],
        folio: [
          ...(v["folio"]?.$errors || []),
          ...(this.backendErrors["folio"] || []),
        ],
        nroactainspeccion: [
          ...(v["nroactainspeccion"]?.$errors || []),
          ...(this.backendErrors["nroactainspeccion"] || []),
        ],
        nroinformetecnico: [
          ...(v["nroinformetecnico"]?.$errors || []),
          ...(this.backendErrors["nroinformetecnico"] || []),
        ],
        nrodictamen: [
          ...(v["nrodictamen"]?.$errors || []),
          ...(this.backendErrors["nrodictamen"] || []),
        ],
        fechainformetecnico: [
          ...(v["fechainformetecnico"]?.$errors || []),
          ...(this.backendErrors["fechainformetecnico"] || []),
        ],
        fechadictamen: [
          ...(v["fechadictamen"]?.$errors || []),
          ...(this.backendErrors["fechadictamen"] || []),
        ],
      };
    },
  },
};
</script>
