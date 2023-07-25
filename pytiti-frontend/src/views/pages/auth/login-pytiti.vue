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
          <div class="col-md-6 col-lg-6 col-xl-6">
            <div class="card mt-4">
                    
              <div class="card-body p-4"> 
                <div class="text-center mt-2">
                  <h5 class="text-primary">Ingreso al sistema</h5>
                  <p class="text-muted">Llene sus datos correctos para ingresar al sistema</p>
                </div>

                <div class="row gy-4">
                  <div class="col-xxl-12 col-md-12">
                    <b-alert
                      v-model="isAuthError"
                      variant="danger"
                      class="mt-3"
                      dismissible>
                    {{ authError }}</b-alert>
                    <div
                      v-if="notification.message"
                      :class="'alert ' + notification.type">
                      {{ notification.message }}
                    </div>
                    <form @submit.prevent="tryToLogIn">
                      <div class="mb-3">
                        <label for="iconInput" class="form-label">Username (Administrador)</label>
                        <div class="form-icon right">
                          <input 
                          v-model="email"
                          type="text"
                          class="form-control form-control-icon" 
                          id="iconInput" 
                          placeholder="nombre@empresa.com">
                          <i class="ri-mail-unread-line"></i>
                          <div
                            v-for="(item, index) in v$.email.$errors"
                            :key="index"
                            class="invalid-feedback">
                            <span v-if="item.$message">{{ item.$message }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">                                                
                        <label for="exampleInputpassword" class="form-label">Contraseña</label>
                        <div class="form-icon right">
                          <input 
                          v-model="password"
                          type="password" 
                          class="form-control" 
                          id="exampleInputpassword" 
                          placeholder="Escriba una contraseña">
                          <i class="ri-account-circle-line"></i>
                        </div>
                      </div>
                      <div class="mt-5">
                        <button class="btn btn-success w-100">Ingresar</button>
                        <div
                          v-if="submitted && v$.password.$error"
                          class="invalid-feedback">
                          <span v-if="v$.password.required.$message">
                            {{ v$.password.required.$message}}
                          </span>
                        </div>
                      </div>
                    </form>
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
                  <a href="senasag-terminos_de_uso.html" class="fw-semibold text-primary text-decoration-underline"> Términos de uso </a>
                </div>
                <div class="col-6 derecha">
                  <router-link :to="{ name: 'registro-cuenta' }"> Quiero registrarme </router-link>
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
    <!-- footer -->
    <FooterCentered />
    <!-- end Footer -->
  </div>
</template>

<script>
// components
import FooterCentered from "@/components/footer-centered.vue";
import AuthLogo from "@/components/pytiti/auth-logo.vue";

// services
import { mapState } from "vuex";
import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import appConfig from "../../../../app.config";
import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";
import { getSelectList } from '@/services/tablas-base';

export default {
  name: "LoginPytiti",
  components: {
    FooterCentered,
    AuthLogo,
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      //
      email:undefined,
      password: undefined,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    }
  },
  validations: {
    email: {
      required: helpers.withMessage("Correo electrónico es requerido", required),
      //email: helpers.withMessage("Por favor ingresar un correo electrónico válido", email),
    },
    password: {
      required: helpers.withMessage("Contraseña es requerida", required),
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
          const { email, password } = this;
          if (email && password) {
            this.login({
              email,
              password,
            });
          }
        }
      }
    },
    loadBaseTables() {
      const SELECT_APIS = [
        {
          name: "distrital",
          endpoint: "api/v1/select-options/distrital/",
        },
        {
          name: "provincias",
          endpoint: "api/v1/select-options/provincias/",
        },
        {
          name: "municipios",
          endpoint: "api/v1/select-options/municipios/",
        }
      ];
      if (
        (localStorage.getItem("distritales") === null || localStorage.getItem("distritales") === undefined) ||
        (localStorage.getItem("municipios") === null || localStorage.getItem("municipios") === undefined) ||
        (localStorage.getItem("provincias") === null || localStorage.getItem("provincias") === undefined)
      ) {
        let count = "";
        SELECT_APIS.map(api => {
          getSelectList(api.endpoint)
          .then(
            res => {
              localStorage.setItem(`${api.name}`, JSON.stringify(res.results));
              setTimeout(() => {
                count += ".";
                console.log(count);
              }, 2000);
            },
            err => {
              console.error(err);
            }
          )
        });
      }
    }
  },
  mounted() {
    this.loadBaseTables();
  }
}
</script>

<style scoped>
  .text-center a {
    color: #fff;
  }
</style>