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
                  <p class="text-muted">Llene sus datos correctos para solicitar de acceso al sistema</p>
                </div>

                <div class="row justify-content-md-center gy-4 mt-2">
                  <div novalidate="true" class="col-xxl-7 col-md-7 col-lg-7">
                    <EmpresaRegistroForm 
                      :className="'wizard-item active'" 
                      v-model="formData"
                      :errors="errors"
                    />

                    <EmpresaDocsForm 
                      :companyId="companyId" 
                      :className="'wizard-item'"
                      v-model="formData"
                      :errors="errors"
                    />

                    <RepresentanteRegistroForm 
                      @update-change="updateFormData" 
                      :className="'wizard-item'"
                       v-model="formData"
                      :errors="errors" 
                    />

                    <RepresentanteDocsForm 
                      :companyId="companyId" 
                      :className="'wizard-item'" 
                      v-model="formData"
                      :errors="errors"
                    />

                    <button 
                      v-if="currentItem < items.length - 1"
                      class="btn btn-light btn-label float-first" 
                      :hidden="currentItem === 0"
                      @click="goPrev">
                      Atrás
                      <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                    </button>
                    <!--button 
                      v-if="currentItem < items.length - 1"
                      class="btn btn-success float-end" 
                      :disabled="v$.$invalid"
                      @click="handleNext">
                      Siguiente
                      <i class="ri-arrow-right-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
                    </button-->

                    <button 
                      v-if="currentItem < items.length - 1"
                      class="btn btn-success btn-label float-end right" 
                      @click="handleNext">
                      Siguiente
                      <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    </button>

                   

                    <button 
                      v-else 
                      class="btn btn-success btn-label float-end right" 
                      :disabled="v$.$invalid"
                      @click="finalStep">
                      Finalizar
                      <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
            <div class="container">
              <div class="row">
                <div class="col-6 mt-0 izquierda izquierda"><a href="senasag-terminos_de_uso.html" class="fw-semibold text-primary text-decoration-underline"> Términos de uso </a></div>
                <div class="col-6 derecha">
                  <router-link to="/login" class="fw-semibold text-primary text-decoration-underline"> Ya tengo una cuenta </router-link>
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
import EmpresaRegistroForm from "@/components/senasag-forms/registro/empresa";
import EmpresaDocsForm from "@/components/senasag-forms/registro/empresa-docs";
import RepresentanteRegistroForm from "@/components/senasag-forms/registro/representante";
import RepresentanteDocsForm from "@/components/senasag-forms/registro/representante-docs";
import SuccessModal from "@/components/pytiti/success-modal.vue";

// services
import { registerCompany, registerCompanyRepresentative } from "@/services/solicitudes";
import { uploadFiles } from "@/services/solicitudes";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { Modal } from "bootstrap";

export default {
    name: "RegistroEmpresa",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
      return {
        activeService: true, //enable this if services are active
        currentYear: new Date().getFullYear(),
        // next-button
        currentItem: 0,
        items: [],
        // form-data
        formData: {
        },
        // response
        companyId: undefined,
        // errors
        error: false,
        errorsBackend:{},
        // modal
        modalData: {
          id: "successModal", 
          title: "Solicitud enviada", 
          message: "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.", 
          buttonText: "Aceptar",
          redirectUrl: "/login"
        },
        // found Errors
        foundErrors: false
      }
    },
    validations(){
      const validationsStep0 = {
          razonsocial: { required: helpers.withMessage("El campo es requerido", required),$autoDirty: true },
          nit: { required: helpers.withMessage("El campo es requerido", required), },
          direccion: { required: helpers.withMessage("El campo es requerido", required), },
          correoe: { required: helpers.withMessage("El campo es requerido", required), },
          //telefonos: { required: helpers.withMessage("El campo es requerido", required), },
          celular: { required: helpers.withMessage("El campo es requerido", required), },
          direccionweb: { required: helpers.withMessage("El campo es requerido", required), },
          descripcionactividad: { required: helpers.withMessage("El campo es requerido", required), },
          iddistrital: { required: helpers.withMessage("El campo es requerido", required), },
          latitud: { required: helpers.withMessage("El campo es requerido", required), },
          longitud: { required: helpers.withMessage("El campo es requerido", required), },
      }
      const validationsStep1 = {
          copianit: {
            required: helpers.withMessage("El campo es requerido", required),
          },
          cartasolicitud: {
            required: helpers.withMessage("El campo es requerido", required),
          },
      }

      const validationsStep2 = {
          "nombres": { required: helpers.withMessage("El campo es requerido", required) },
          "apellido_paterno": { required: helpers.withMessage("El campo es requerido", required) },
          "apellido_materno": { required: helpers.withMessage("El campo es requerido", required) },
          "idcarnet": { required: helpers.withMessage("El campo es requerido", required) },
          "complemento": { required: helpers.withMessage("El campo es requerido", required) },
          // "origenci": { required: helpers.withMessage("El campo es requerido", required) },
          "fechanac": { required: helpers.withMessage("El campo es requerido", required) },
          "correoe": { required: helpers.withMessage("El campo es requerido", required) },
          "telefonos": { required: helpers.withMessage("El campo es requerido", required) },
          "direccion": { required: helpers.withMessage("El campo es requerido", required) },
          "iddistrital": { required: helpers.withMessage("El campo es requerido", required) },
      }

      const validationsStep3 = {
          copia_cartapoder: {
            required: helpers.withMessage("El campo es requerido", required),
          },
          copiaci: {
            required: helpers.withMessage("El campo es requerido", required),
          },
      }

      const validations = { formData: {} };
      if(this.currentItem === 0) validations.formData = validationsStep0;
      if(this.currentItem === 1) validations.formData = validationsStep1;
      if(this.currentItem === 2) validations.formData = validationsStep2;
      if(this.currentItem === 3) validations.formData = validationsStep3;
      return validations;
    },
    components: {
        FooterCentered,
        AuthLogo,
        // forms-components
        EmpresaRegistroForm,
        RepresentanteRegistroForm,
        EmpresaDocsForm,
        RepresentanteDocsForm,
        SuccessModal,
    },
    computed:{
      errors(){
        return {
          ...this.errorsBackend
        }
      }
    },
    methods: {
      handleNext() {
        if (this.currentItem <= this.items.length - 1) {
          // this.goNext();
          this.sendForm();
        }
      },
      goNext() {
        this.items[this.currentItem].classList.remove("active");
        this.items[this.currentItem+1].classList.add("active");
        this.currentItem += 1;
      },
      goPrev() {
        this.items[this.currentItem].classList.remove("active");
        this.items[this.currentItem-1].classList.add("active");
        this.currentItem -= 1;
      },
      updateFormData(data) {
        Object.assign(this.formData, data);
      },
      // async-request
      async sendForm() {
        if (this.currentItem === 0) {
          if (this.activeService) {
            registerCompany(this.formData)
              .then(
                ({ok, data, errors}) => {
                  if (!ok) { 
                    this.error = true;
                    console.log(errors);
                    return this.errorsBackend = errors; 
                  }
                  this.companyId = data.idempresa;
                  this.goNext();
                  this.formData = {};
                })
                .catch(error => {
                  this.error = true;
                  console.log(error.message);
                });
          } else {
            this.goNext();
          }
        } else if (this.currentItem === 1) {
          if (this.activeService) {
            let data = new FormData();
            data.append("ruta", this.formData.copianit);
            data.append("table", this.formData.copianit_table);
            data.append("nombre_documento", this.formData.copianit_name);

            let data2 = new FormData();
            data2.append("ruta", this.formData.cartasolicitud);
            data2.append("table", this.formData.cartasolicitud_table);
            data2.append("nombre_documento", this.formData.cartasolicitud_name);
          
            await uploadFiles(this.companyId, data);
            await uploadFiles(this.companyId, data2);
            this.formData = {};
            this.goNext();
          } else {
            this.goNext();
          }
        } else if (this.currentItem === 2) {
          if (this.activeService) {
            registerCompanyRepresentative(this.companyId, this.formData)
              .then(
                ({ok, data, errors}) => {
                  if (!ok) { 
                    this.error = true;
                    return this.errorsBackend = errors; 
                  }
                  console.log(data);
                  this.formData = {};
                  this.goNext();
                },
                err => {
                  this.error = true;
                  console.error(err);
                });
          } else {
            this.goNext();
          }
        } else {
          this.goNext();
        }
      },
      async finalStep(){
        
        let data = new FormData();
        data.append("ruta", this.formData.copia_cartapoder);
        data.append("table", this.formData.copia_cartapoder_table);
        data.append("nombre_documento", this.formData.copia_cartapoder_name);

        let data2 = new FormData();
        data2.append("ruta", this.formData.copiaci);
        data2.append("table", this.formData.copiaci_table);
        data2.append("nombre_documento", this.formData.copiaci_name);
      
        await uploadFiles(this.companyId, data);
        await uploadFiles(this.companyId, data2);
        this.formData = {};

        const target = document.getElementById(this.modalData.id)
        const theModal = new Modal(target, {})
        theModal.show()
      }
    },
    mounted() {
      this.items = [...document.querySelectorAll(".wizard-item")];
    },
}
</script>

<style scoped>
.w-40-perc {
    width: 40%;
}
.wizard-item.active {
  display:block !important;
}
.wizard-item {
  display:none;
}
</style>