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
          <div class="col-md-12 col-lg-12 col-xl-12">
            <div class="card mt-4">
              <div class="card-body p-4"> 
                <div class="text-center mt-2">
                  <h5 class="text-primary">Solicitud de servicios y cuenta de usuario</h5>
                  <p class="text-muted">Llene sus datos correctos para solicitar acceso al sistema</p>
                </div>

                <div class="row justify-content-md-center gy-4 mt-2">
                  <div class="col-xxl-12 col-md-12 col-lg-12">
                    <form @submit="sendForm" class="was-validated">
                        <h5 class="mb-3">DATOS PERSONALES</h5>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="idcarnet">CI: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_personales.idcarnet" type="text" class="form-control" id="idcarnet" name="idcarnet" placeholder="Escriba su cedula de identidad" />
                                <div class="invalid-feedback">Por favor ingrese su carnet de identidad</div>
                            </div>
                            <div class="col-lg-2">
                                <label for="correoe">Correo personal: </label>
                            </div>
                            <div class="col-lg">
                                <input required @input="verifyEmail" type="email" class="form-control" id="correoe" name="correoe" placeholder="Escriba su correo electrónico" />
                                <div class="invalid-feedback">Por favor ingrese su correo electrónico</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="nombres">Nombres: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_personales.nombres" type="text" class="form-control" id="nombres" name="nombres" placeholder="Escriba su(s) nombre(s)" />
                                <div class="invalid-feedback">Por favor ingrese su(s) nombre(s)</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="apellido_paterno">Ap. Paterno: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_personales.apellido_paterno" type="text" class="form-control" id="apellido_paterno" name="apellido_paterno" placeholder="Escriba su apellido paterno" />
                                <div class="invalid-feedback">Por favor ingrese su apellido paterno</div>
                            </div>
                            <div class="col-lg-2">
                                <label for="apellido_materno">Ap. Materno: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_personales.apellido_materno" type="text" class="form-control" id="apellido_materno" name="apellido_materno" placeholder="Escriba su apellido materno" />
                                <div class="invalid-feedback">Por favor ingrese su apellido materno</div>
                            </div>
                        </div>
                        <h5 class="mb-3">DATOS INSTITUCIONALES</h5>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="cargo">Cargo: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_institucionales.cargo" type="text" class="form-control" id="cargo" name="cargo" placeholder="Escriba su cargo" />
                                <div class="invalid-feedback">Por favor ingrese su cargo institucional</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="distrital_oficina">Distrital/<br/>Oficina:</label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_institucionales.distrital_oficina" type="text" class="form-control" id="distrital_oficina" name="distrital_oficina" placeholder="Distrital/Oficina asignada" />
                                <div class="invalid-feedback">Por favor ingrese su distrital/oficina</div>
                            </div>
                            <div class="col-lg-2">
                                <label for="area">Área: </label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_institucionales.area" type="text" class="form-control" id="area" name="area" placeholder="Escriba su área" />
                                <div class="invalid-feedback">Por favor ingrese su area de trabajo</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-1">
                                <label for="profesion_ocupacion">Profesión/<br/>Ocupación:</label>
                            </div>
                            <div class="col-lg">
                                <input required v-model="formData.datos_institucionales.profesion_ocupacion" type="text" class="form-control" id="profesion_ocupacion" name="profesion_ocupacion" placeholder="Su profesión u ocupación" />
                                <div class="invalid-feedback">Por favor ingrese su profesión y/o ocupación</div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-info w-40-perc">Solicitar registro</button>
                            <a 
                            id="show-success-modal"
                            :href="`#${modalData.id}`" 
                            :data-bs-target="`#${modalData.id}`"
                            data-bs-toggle="modal" style="display:none"></a>
                        </div>
                    </form>
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
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
// components
import FooterCentered from "@/components/footer-centered.vue";
import AuthLogo from "@/components/pytiti/auth-logo.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue";

// services
import { checkEmailIsUnique } from '@/services/validations';
import { registerInternalAccount } from "@/services/cuentas";

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: "RegistroEmpresa",
    components: {
        FooterCentered,
        AuthLogo,
        // forms-components
        SuccessModal,
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
            datos_personales: {
                idcarnet: undefined,
                nombres: undefined,
                correoe: undefined,
                apellido_paterno: undefined,
                apellido_materno: undefined,
            },
            datos_institucionales: {
                cargo: undefined,
                distrital_oficina: undefined,
                area: undefined,
                profesion_ocupacion: undefined
            },
        },
        // errors
        error: false,
        // modal
        modalData: {
          id: "successModal", 
          title: "Solicitud enviada", 
          message: "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.", 
          buttonText: "Aceptar",
          redirectUrl: "/"
        },
        // found Errors
        foundErrors: false
      }
    },
    validations() {
        return {
            emailExists: false,
            formData: {
                datos_personales: {
                    idcarnet: { required },
                    nombres: { required },
                    correoe: { required, email },
                    apellido_paterno: { required },
                    apellido_materno: { required },
                },
                datos_institucionales: {
                    cargo: { required },
                    distrital_oficina: { required },
                    area: { required },
                    profesion_ocupacion: { required }
                },
            },
        }
    },
    methods: {
        async sendForm(e) {
            e.preventDefault();
            if (!this.emailExists) {
                const result = this.v$.$validate();
                if (!result) {
                    return;
                } else {
                    registerInternalAccount(this.formData)
                        .then(
                            res => {
                                console.log(res);
                                document.querySelector("#show-success-modal").click();
                            },
                            err => {
                                console.error(err);
                            }
                        );
                }
            }
        },
        verifyEmail(e) {
            checkEmailIsUnique({email: e.target.value})
                .then(
                    res => {
                        if (res.data === true) {
                            this.emailExists = res.data;
                            e.target.classList.remove("is-valid");
                            e.target.classList.add("is-invalid");

                        } else {
                            this.emailExists = false;
                            this.formData.datos_personales.correoe = e.target.value;
                            e.target.classList.remove("is-invalid");
                            e.target.classList.add("is-valid");
                        }
                    },
                    err => {
                        console.error(err);
                    }
                );
        }
    }
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