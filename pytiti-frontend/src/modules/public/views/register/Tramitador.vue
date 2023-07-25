<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-8 col-xl-8">
      <div class="card mt-4">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Solicitar acceso al sistema</h5>
            <p class="text-muted">
              Llene sus datos correctos para solicitar de acceso al sistema
            </p>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="row gy-4">
              <div class="col-xxl-12 col-md-12">
                <h5 class="mb-3">LLENE SUS DATOS DE TRAMITADOR</h5>
                <div class="mb-3">
                  <label for="prefijonombre" class="form-label">Prefijo</label>
                  <input
                    type=""
                    class="form-control"
                    id="prefijonombre"
                    name="prefijonombre"
                    v-model="formData.prefijonombre"
                    placeholder="Ej. Ing. Sra. Lic. Dra."
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="nombres"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.nombres,
                    }"
                    >Nombre(s)</label
                  >
                  <input
                    type=""
                    class="form-control"
                    :class="{
                      'is-invalid': errors.nombres,
                    }"
                    id="nombres"
                    name="nombres"
                    v-model="formData.nombres"
                    placeholder="Escriba su Nombre(s)"
                  />

                  <div class="invalid-feedback" v-if="errors.nombres">
                    {{ errors.nombres[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="apellido_paterno"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.apellido_paterno,
                    }"
                    >Apellido Paterno</label
                  >
                  <input
                    type=""
                    class="form-control"
                    :class="{
                      'is-invalid': errors.apellido_paterno,
                    }"
                    id="apellido_paterno"
                    name="apellido_paterno"
                    v-model="formData.apellido_paterno"
                    placeholder="Escriba su Apellido Paterno"
                  />
                  <div class="invalid-feedback" v-if="errors.apellido_paterno">
                    {{ errors.apellido_paterno[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="apellido_materno" class="form-label"
                    >Apellido Materno</label
                  >
                  <input
                    type=""
                    class="form-control"
                    id="apellido_materno"
                    name="apellido_materno"
                    v-model="formData.apellido_materno"
                    placeholder="Escriba su Apellido Materno"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="idcarnet"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.idcarnet,
                    }"
                    >Nro. Documento de Identidad</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{
                      'is-invalid': errors.idcarnet,
                    }"
                    id="idcarnet"
                    name="idcarnet"
                    v-model="formData.idcarnet"
                    placeholder="Escriba su número de documento de identidad"
                  />
                  <div class="invalid-feedback" v-if="errors.idcarnet">
                    {{ errors.idcarnet[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="complemento" class="form-label"
                    >Complemento</label
                  >
                  <input
                    type=""
                    class="form-control"
                    id="complemento"
                    name="complemento"
                    v-model="formData.complemento"
                    placeholder="Ej. M"
                  />
                </div>
                <div class="col-lg-12 mb-3">
                  <div class="d-flex flex-column datepicker success">
                    <label
                      class="form-label required"
                      :class="{
                        'text-danger': errors.fechanac,
                      }"
                      for="fechanac"
                      >Fecha de nacimiento</label
                    >

                    <KtFlatPickr
                      id="fechanac"
                      name="fechanac"
                      class="form-control flatpickr-input"
                      :class="{
                        'is-invalid': errors.fechanac,
                      }"
                      v-model="formData.fechanac"
                    ></KtFlatPickr>

                    <div class="error-validation" v-if="errors.fechanac">
                      {{ errors.fechanac[0] }}
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="lugarnac" class="form-label"
                    >Lugar de nacimiento</label
                  >
                  <input
                    type=""
                    class="form-control"
                    id="lugarnac"
                    name="lugarnac"
                    v-model="formData.lugarnac"
                    placeholder="Su ciudad o lugar de nacimiento"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="sexo"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.sexo,
                    }"
                    >Género</label
                  >
                  <select
                    id="sexo"
                    name="sexo"
                    v-model="formData.sexo"
                    class="form-control"
                    :class="{
                      'is-invalid': errors.sexo,
                    }"
                  >
                    <option selected disabled>Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.sexo">
                    {{ errors.sexo[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <LocalSearchListField
                    class="mb-3"
                    @update-change="formData.iddistrital = $event.iddistrital"
                    :error-vuelidate="errors.iddistrital"
                    :field="{
                      label: 'Departamento de residencia',
                      entity_field: { name: 'iddistrital' },
                      value: '',
                    }"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="residencia"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.residencia,
                    }"
                    >Ciudad de residencia</label
                  >
                  <input
                    type=""
                    class="form-control"
                    :class="{
                      'is-invalid': errors.residencia,
                    }"
                    id="residencia"
                    name="residencia"
                    v-model="formData.residencia"
                    placeholder="Escriba la ciudad donde reside"
                  />
                  <div class="invalid-feedback" v-if="errors.residencia">
                    {{ errors.residencia[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="direccion"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.direccion,
                    }"
                    >Dirección de residencia</label
                  >
                  <input
                    type=""
                    class="form-control"
                    :class="{
                      'is-invalid': errors.direccion,
                    }"
                    id="direccion"
                    name="direccion"
                    v-model="formData.direccion"
                    placeholder="Escriba su dirección completa"
                  />
                  <div class="invalid-feedback" v-if="errors.direccion">
                    {{ errors.direccion[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="telefonos"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.telefonos,
                    }"
                    >Teléfonos</label
                  >
                  <input
                    type=""
                    class="form-control"
                    :class="{
                      'is-invalid': errors.telefonos,
                    }"
                    id="telefonos"
                    name="telefonos"
                    v-model="formData.telefonos"
                    placeholder="Escriba su número de teléfono y/o celular"
                  />
                  <div class="invalid-feedback" v-if="errors.telefonos">
                    {{ errors.telefonos[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="correoe"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.correoe,
                    }"
                    >Correo electrónico (Personal)</label
                  >
                  <div class="form-icon right">
                    <input
                      type="email"
                      class="form-control form-control-icon"
                      :class="{
                        'is-invalid': errors.email,
                      }"
                      id="correoe"
                      name="correoe"
                      v-model="formData.correoe"
                      placeholder="nombre@gmail.com"
                    />
                    <i class="ri-mail-unread-line"></i>
                  </div>
                  <div class="error-validation" v-if="errors.correoe">
                    {{ errors.correoe[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="documento_ci"
                    class="form-label required"
                    :class="{
                      'text-danger': errors.documento_ci,
                    }"
                    >Fotocopia de documento de Identidad</label
                  >
                  <input
                    id="documento_ci"
                    name="documento_ci"
                    class="form-control"
                    :class="{
                      'is-invalid': errors.documento_ci,
                    }"
                    @change="handleFile"
                    type="file"
                  />
                  <div class="error-validation" v-if="errors.documento_ci">
                    {{ errors.documento_ci[0] }}
                  </div>
                </div>
              </div>
              <!--end col-->

              <div class="mt-4">
                <button class="btn btn-success w-100" type="submit">
                  Solicitar registro
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- end card body -->
      </div>
      <!-- end card -->
      <div class="container">
        <div class="row">
          <div class="col-6 mt-0 izquierda izquierda">
            <a
              href="senasag-terminos_de_uso.html"
              class="fw-semibold text-primary text-decoration-underline"
            >
              Términos de uso
            </a>
          </div>
          <div class="col-6 derecha">
            <router-link
              :to="{ name: 'login' }"
              class="fw-semibold text-primary text-decoration-underline"
            >
              Ya tengo una cuenta
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SuccessModal :attrs="modalData" />
</template>

<script>
import NotificationHelper from "@/helpers/notification";

import LocalSearchListField from "@/modules/public/components/fields/LocalSearchListField.vue";
import { processorAccountRequest } from "@/services/solicitudes";
import { Modal } from "bootstrap";

import SuccessModal from "@/components/modals/Success.vue";

export default {
  name: "RegistroTramitador",
  components: {
    LocalSearchListField,
    SuccessModal,
  },
  data() {
    return {
      formData: {},
      errors: {},
      modalData: {
        id: "successModal",
        title: "Solicitud enviada",
        message:
          "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.",
        buttonText: "Aceptar",
        redirectUrl: "/login",
      },
      handleFile(e) {
        this.formData[e.target.name] = e.target.files[0];
      },
    };
  },
  methods: {
    onSubmit() {
      processorAccountRequest(this.formData)
        .then(({ ok, errors: e }) => {
          if (!ok) {
            const { errors, message } = e;
            console.log(errors);
            NotificationHelper.error(null, message);
            return (this.errors = errors);
          }
          const target = document.getElementById(this.modalData.id);
          const theModal = new Modal(target, {});
          theModal.show();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  watch: {
    fechanac(newValue) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        fechanac: newValue,
      });
    },
  },
};
</script>
