<template>
  <div class="auth-page-wrapper pt-5 fondo_verde">
    <!-- auth page bg -->

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <AuthLogo title="PPADRON WEB - SENASAG" />
          </div>
        </div>
        <!-- end row -->
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-10 col-xl-10">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Solicitar acceso al sistema</h5>
                  <p class="text-muted">
                    Llene sus datos correctos para solicitar de acceso al
                    sistema
                  </p>
                </div>

                <div class="row justify-content-md-center gy-4 mt-2">
                  <div class="col-xxl-7 col-md-7 col-lg-7">
                    <PersonaForm
                      @update-change="updateFormData"
                      className="wizard-item active"
                      :errorsProp="errors"
                    />
                    <PersonaDocForm
                      @update-change="updateFormData"
                      className="wizard-item"
                      :errorsProp="errors"
                    />
                    <button
                      v-if="currentItem < items.length - 1"
                      class="btn btn-success float-end"
                      @click="handleNext"
                    >
                      Siguiente
                      <i
                        class="ri-arrow-right-line label-icon align-middle rounded-pill fs-16 ms-2"
                      ></i>
                    </button>

                    <button
                      v-else
                      class="btn btn-success btn-label float-end right"
                      @click="handleNext"
                    >
                      Finalizar
                      <i
                        class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                      ></i>
                    </button>
                  </div>
                  <!--end col-->
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
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
    <SuccessModal :attrs="modalData" />
    <!-- footer -->
    <FooterCentered />
    <!-- end Footer -->
  </div>
</template>

<script>
// components
import FooterCentered from "@/components/footer-centered.vue";
import AuthLogo from "@/components/pytiti/auth-logo.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue";
//
import PersonaForm from "@/components/senasag-forms/registro/persona.vue";
import PersonaDocForm from "@/components/senasag-forms/registro/persona-doc.vue";
// services
import { registerPerson } from "@/services/solicitudes";
import { uploadPersonFile } from "@/services/solicitudes";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { Modal } from "bootstrap";

export default {
  name: "RegistroPersona",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    FooterCentered,
    AuthLogo,
    SuccessModal,
    //
    PersonaForm,
    PersonaDocForm,
  },
  data() {
    return {
      activeService: true, //enable this if services are active
      currentYear: new Date().getFullYear(),
      // next-button
      currentItem: 0,
      items: [],
      // response
      personId: undefined,
      // form-data
      form: {},
      modalData: {
        id: "successModal",
        title: "Solicitud enviada",
        message:
          "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.",
        buttonText: "Aceptar",
        redirectUrl: "/login",
      },
      backendErrors: {},
    };
  },
  validations() {
    const validationsStep0 = {
      nombres: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      apellido_paterno: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      idcarnet: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      telefonos: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      fechanac: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      correoe: {
        required: helpers.withMessage("El campo es requerido", required),
      },
      direccion: {
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
    };
    const validationsStep1 = {
      copiaci: {
        required: helpers.withMessage("El campo es requerido", required),
      },
    };

    const validations = { form: {} };
    if (this.currentItem === 0) validations.form = validationsStep0;
    if (this.currentItem === 1) validations.form = validationsStep1;
    return validations;
  },
  methods: {
    handleNext() {
      this.sendForm();
    },
    goNext() {
      this.items[this.currentItem].classList.remove("active");
      this.items[this.currentItem + 1].classList.add("active");
      this.currentItem += 1;
    },
    updateFormData(data) {
      Object.assign(this.form, data);
    },
    sendForm() {
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (this.currentItem === 0) {
        if (this.activeService) {
          registerPerson(this.form).then(
            ({ ok, data: res, errors }) => {
              if (!ok) {
                return (this.backendErrors = errors);
              }
              this.personId = res.persona_natural.idpersona;
              this.goNext();
              this.form = {};
            },
            (err) => {
              console.error(err);
            }
          );
        } else {
          this.goNext();
        }
      } else if (this.currentItem === 1) {
        let data = new FormData();
        data.append("ruta", this.form.copiaci);
        data.append("nombre_documento", this.form.copiaci_name);
        uploadPersonFile(this.personId, data).then(
          () => {
            this.showModal();
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        this.goNext();
      }
    },
    showModal() {
      const target = document.getElementById(this.modalData.id);
      const theModal = new Modal(target, {});
      theModal.show();
    },
  },
  mounted() {
    this.items = [...document.querySelectorAll(".wizard-item")];
  },
  computed: {
    errors() {
      const v = this.v$.form;
      const errors =
        this.currentItem == 0
          ? {
              nombres: v.nombres.$errors,
              apellido_paterno: v.apellido_paterno.$errors,
              idcarnet: v.idcarnet.$errors,
              telefonos: v.telefonos.$errors,
              fechanac: v.fechanac.$errors,
              correoe: v.correoe.$errors,
              direccion: v.direccion.$errors,
              iddistrital: v.iddistrital.$errors,
              latitud: v.latitud.$errors,
              longitud: v.longitud.$errors,
            }
          : {
              copiaci: v.copiaci.$errors,
            };
      return {
        ...errors,
        ...this.backendErrors,
      };
    },
  },
};
</script>

<style scoped>
.wizard-item.active {
  display: block !important;
}
.wizard-item {
  display: none;
}
</style>
