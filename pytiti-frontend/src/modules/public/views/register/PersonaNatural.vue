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

          <div class="row justify-content-md-center gy-4 mt-2">
            <div novalidate="true" class="col-xxl-12 col-md-12 col-lg-12">
              <div>
                <!-- end card header -->
                <div class="form-steps">
                  <form action="#">
                    <div id="custom-progress-bar" class="progress-nav mb-4">
                      <div class="progress" style="height: 1px">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style="width: 0%"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>

                      <ul
                        class="nav nav-pills progress-bar-tab custom-nav"
                        role="tablist"
                      >
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link rounded-pill"
                            :class="{ active: currentItem == 0 }"
                            data-progressbar="custom-progress-bar"
                            id="pills-gen-info-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-gen-info"
                            type="button"
                            role="tab"
                            aria-controls="pills-gen-info"
                            aria-selected="true"
                            data-position="0"
                          >
                            1
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link rounded-pill"
                            :class="{ active: currentItem == 1 }"
                            data-progressbar="custom-progress-bar"
                            id="pills-info-desc-tab"
                            data-bs-togglex="pill"
                            data-bs-targetx="#pills-info-desc"
                            type="button"
                            role="tab"
                            aria-controls="pills-info-desc"
                            aria-selected="false"
                            data-position="1"
                          >
                            2
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div class="tab-content">
                      <div
                        class="tab-pane fade"
                        :class="{
                          active: currentItem == 0,
                          show: currentItem == 0,
                        }"
                        id="pills-gen-info"
                        role="tabpanel"
                        aria-labelledby="pills-gen-info-tab"
                      >
                        <div class="row">
                          <EmpresaRegistroForm
                            :className="'wizard-item'"
                            v-model="formData"
                            :errors="errors"
                          />
                        </div>
                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="pills-info-desc-tab"
                            @click="handleNext"
                          >
                            <i
                              class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                            ></i
                            >Siguiente
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->

                      <div
                        class="tab-pane fade"
                        :class="{
                          active: currentItem == 1,
                          show: currentItem == 1,
                        }"
                        id="pills-info-desc"
                        role="tabpanel"
                        aria-labelledby="pills-info-desc-tab"
                      >
                        <div>
                          <RepresentanteRegistroForm
                            @update-change="updateFormData"
                            :className="'wizard-item'"
                            v-model="formData"
                            :errors="errors"
                          />
                        </div>
                        <div class="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            class="btn btn-link text-decoration-none btn-label previestab"
                            data-previous="pills-gen-info-tab"
                            @click="goPrev"
                          >
                            <i
                              class="ri-arrow-left-line label-icon align-middle fs-16 me-2"
                            ></i>
                            Atrás
                          </button>
                          <button
                            @click="finalStep"
                            type="button"
                            class="btn btn-success btn-label right ms-auto nexttab nexttab"
                            data-nexttab="pills-success-tab"
                          >
                            <i
                              class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                            ></i
                            >Siguiente
                          </button>
                        </div>
                      </div>
                      <!-- end tab pane -->
                    </div>
                    <!-- end tab content -->
                  </form>
                </div>
                <!-- end card body -->
              </div>
            </div>
          </div>
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
              to="/login"
              class="fw-semibold text-primary text-decoration-underline"
            >
              Ya tengo una cuenta
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal :attrs="modalData" />
  </div>
</template>

<script>
import EmpresaRegistroForm from "@/modules/public/components/forms/persona-natural/Datos.vue";
import RepresentanteRegistroForm from "@/modules/public/components/forms/persona-natural/DatosPersonales.vue";

import { registerNaturalPersonAccountRequest } from "@/services/solicitudes";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";

import SuccessModal from "@/components/modals/Success.vue";

export default {
  name: "RegistroEmpresa",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentItem: 0,
      items: [],
      formData: {},
      companyId: undefined,
      errorsBackend: {},
      modalData: {
        id: "successModal",
        title: "Solicitud enviada",
        message:
          "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.",
        buttonText: "Aceptar",
        redirectUrl: "/login",
      },
      foundErrors: false,
    };
  },
  validations() {
    const validationsStep0 = {
      razonsocial: {
        required: helpers.withMessage("El campo es requerido", required),
        $autoDirty: true,
      },
      nit: { required: helpers.withMessage("El campo es requerido", required) },
      direccion: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      correoe: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      celular: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      direccionweb: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      descripcionactividad: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      iddistrital: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      latitud: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      longitud: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      // Documents company
      copianit: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      cartasolicitud: {
        required: helpers.withMessage("El campo es requerido", required),
      },
    };

    const validationsStep1 = {
      nombres: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      apellido_paterno: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      apellido_materno: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      idcarnet: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      complemento: {
        required: helpers.withMessage("El campo es requerido", required),
      },

      fechanac: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      correoe: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      telefonos: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      direccion: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      iddistrital: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      // Documents Legal representative
      copiaci: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      copia_cartapoder: {
        required: helpers.withMessage("El campo es requerido", required),
      },
    };

    const validations = { formData: {} };
    if (this.currentItem === 0) validations.formData = validationsStep0;
    if (this.currentItem === 1) validations.formData = validationsStep1;
    return validations;
  },
  components: {
    EmpresaRegistroForm,
    RepresentanteRegistroForm,
    SuccessModal,
  },
  computed: {
    errors() {
      return {
        ...this.errorsBackend,
      };
    },
  },
  methods: {
    handleNext() {
      if (this.currentItem <= this.items.length - 1) {
        this.sendForm();
      }
    },
    goNext() {
      this.currentItem += 1;
    },
    goPrev() {
      this.currentItem -= 1;
    },
    updateFormData(data) {
      Object.assign(this.formData, data);
    },
    sendForm() {
      registerNaturalPersonAccountRequest(this.formData, this.currentItem + 1)
        .then(({ ok, errors: e }) => {
          if (!ok) {
            const { errors, message } = e;
            NotificationHelper.error(null, message);
            return (this.errorsBackend = errors);
          }
          this.goNext();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async finalStep() {
      registerNaturalPersonAccountRequest(this.formData, this.currentItem + 1)
        .then(({ ok, errors: e }) => {
          if (!ok) {
            const { errors, message } = e;
            NotificationHelper.error(null, message);
            if ("emp_nit" in errors || "emp_correoe" in errors) this.goPrev();
            return (this.errorsBackend = errors);
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
    "formData.emp_iddistrital"() {
      this.formData.emp_idprovincia = null;
      this.formData.emp_idmunicipio = null;
    },
    "formData.emp_idprovincia"() {
      this.formData.emp_idmunicipio = null;
    },
  },
  mounted() {
    this.items = [...document.querySelectorAll(".wizard-item")];
  },
};
</script>

<style scoped>
.w-40-perc {
  width: 40%;
}
.wizard-item.active {
  display: block !important;
}
/* .wizard-item {
  display: none;
} */
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link,
.nav-pills .nav-link-done.active {
  padding: 0;
}
</style>
