<script>
import { mapActions, mapGetters } from "vuex";

import { authFackMethods } from "@/state/helpers";

// services
import { verifySiaService } from "@/services/sia";

export default {
  name: "Sia signin",
  data: function () {
    return {
      ciValue: null,
      ciExt: null,
      username: null,
      password: null,
      notfound: null,
      errors: null,
    };
  },
  computed: {
    getErrors() {
      return this.$store.state.authfack.errors;
    },
  },
  watch: {
    getErrors(newValue, oldValue) {
      this.errors = newValue;
    }
  },
  methods: {
    ...authFackMethods,
    ...mapActions("siaOperations", ["setSiaData"]),
    ingresar() {
      if (this.username && this.password) {
        let email = this.username;
        let password = this.password;
        let app = "sia";
        this.loginSia({
          email,
          password,
          app,
        })
      }
    },
    verificar() {
      let data = { ci: this.ciValue };
      if (this.ciExt == !"") {
        data["extension"] = this.ciExt;
      }
      verifySiaService(data).then(
        (res) => {
          console.log(res);
          if (res.mensaje === 'already exist'){
            this.notfound = "Ya existe una solicitud con este carnet de identidad."
          }
          if (res.mensaje === "success") {
            this.setSiaData(res);
            this.$router.push("/sia/signin-solicitudservicios");
          }
          if (res.mensaje == "Not found") {
            this.notfound = "No existe ningún dato en el sistema para poder validarlo.";
          }
          setTimeout(()=>{
              this.notfound = null
          }, 2000);
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <a href="index.html" class="d-inline-block auth-logo">
                  <img
                    src="@/assets/images/logo-light2.png"
                    alt="SENASAG"
                    width="100%"
                  />
                </a>
              </div>
              <p class="mt-3 fs-15 fw-medium">PPADRON WEB - SENASAG</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-6 col-xl-6">
            <div class="card">
              <div class="card-body">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Ingreso al sistema</h5>
                  <p class="text-muted">
                    Llene sus datos correctos para ingresar al sistema
                  </p>
                </div>
                <!-- Nav tabs -->
                <ul
                  class="nav nav-pills animation-nav nav-justified gap-2 mb-3"
                  role="tablist"
                >
                  <li class="nav-item waves-effect waves-light">
                    <a
                      class="nav-link active"
                      data-bs-toggle="tab"
                      href="#animation-home"
                      role="tab"
                    >
                      Ingresar
                    </a>
                  </li>
                  <li class="nav-item waves-effect waves-light">
                    <a
                      class="nav-link"
                      data-bs-toggle="tab"
                      href="#animation-profile"
                      role="tab"
                    >
                      Solicitar acceso
                    </a>
                  </li>
                </ul>
                <div class="tab-content text-muted">
                  <div
                    class="tab-pane active"
                    id="animation-home"
                    role="tabpanel"
                  >
                    <div class="mb-3">
                      <label for="iconInput" class="form-label">Usuario</label>
                      <div class="form-icon right">
                        <input
                          type="email"
                          class="form-control form-control-icon"
                          id="iconInput"
                          placeholder="Escriba su nombre de usuario asignado"
                          v-model="username"
                        />
                        <i class="ri-mail-unread-line"></i>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputpassword" class="form-label"
                        >Contraseña</label
                      >
                      <div class="form-icon right">
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputpassword"
                          placeholder="Escriba su contraseña"
                          v-model="password"
                        />
                        <i class="ri-account-circle-line"></i>
                      </div>
                      <div class="container">
                        <div class="row">
                          <div class="col-6 mt-0 izquierda">
                            <a
                              href="signup"
                              class="text-primary text-decoration-underline"
                            >
                            </a>
                          </div>
                          <div class="col-6 derecha-verde mt-1">
                            <a
                              href="#"
                              class="text-primary text-decoration-underline"
                            >
                              Olvidé mi contraseña
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="errors" :style="{ color: 'red' }">
                        Verifique los datos introducidos
                    </h5>
                    <div class="mt-4">
                      <button
                        class="btn btn-success w-100"
                        type="submit"
                        @click.prevent="ingresar"
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                  <div class="tab-pane" id="animation-profile" role="tabpanel">
                    <div class="mb-3">
                      <label for="exampleInputpassword" class="form-label"
                        >Carnet de identidad</label
                      >
                      <div class="form-icon right">
                        <input
                          class="form-control"
                          placeholder="Escriba su número de carnet"
                          v-model="ciValue"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputpassword" class="form-label"
                        >Complemento</label
                      >
                      <div class="form-icon right">
                        <input
                          class="form-control"
                          placeholder="Escriba el complemento"
                          v-model="ciExt"
                        />
                      </div>
                    </div>
                    <div class="mt-4 center">
                      <h5 v-if="notfound" :style="{ color: 'red' }">
                        {{ notfound }}
                      </h5>
                    </div>
                    <div class="mt-4">
                      <button
                        class="btn btn-success w-100"
                        type="submit"
                        @click.prevent="verificar"
                      >
                        Verificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->
            <div class="container">
              <div class="row">
                <div class="col-6 mt-0 izquierda">
                  <a
                    href="signup"
                    class="text-primary text-decoration-underline"
                  ></a>
                </div>
                <div class="col-6 derecha">
                  <a
                    href="#"
                    class="text-primary text-decoration-underline"
                  ></a>
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
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-footer-black">
                &copy; {{ new Date().getFullYear() }} - SENASAG
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
