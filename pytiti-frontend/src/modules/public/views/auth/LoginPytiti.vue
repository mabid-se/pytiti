<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-6 col-xl-6">
      <div class="card mt-4">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Ingreso al sistema</h5>
            <p class="text-muted">
              Llene sus datos correctos para ingresar al sistema
            </p>
          </div>

          <div class="row gy-4">
            <div class="col-xxl-12 col-md-12">
              <b-alert
                v-model="isAuthError"
                variant="danger"
                class="mt-3"
                dismissible
              >
                {{ authError }}</b-alert
              >
              <div
                v-if="notification.message"
                :class="'alert ' + notification.type"
              >
                {{ notification.message }}
              </div>
              <form
                @submit.prevent="tryToLogIn"
                :set="(v = v$)"
                novalidate="true"
              >
                <div class="mb-3">
                  <label
                    for="iconInput"
                    class="form-label"
                    :class="{
                      'text-danger': submitted && v.email.$error,
                    }"
                    >Correo electrónico (Administrador)</label
                  >
                  <div class="form-icon right">
                    <input
                      v-model="email"
                      type="email"
                      class="form-control form-control-icon"
                      :class="{
                        'is-invalid': submitted && v.email.$error,
                      }"
                      id="iconInput"
                      placeholder="nombre@empresa.com"
                    />
                    <i class="ri-mail-unread-line"></i>
                    <div
                      v-for="(item, index) in v.email.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputpassword"
                    class="form-label"
                    :class="{
                      'text-danger': submitted && v.password.$error,
                    }"
                    >Contraseña</label
                  >
                  <div class="form-icon right">
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      :class="{
                        'is-invalid': submitted && v.password.$error,
                      }"
                      id="exampleInputpassword"
                      placeholder="Escriba una contraseña"
                    />
                    <i class="ri-account-circle-line"></i>
                    <div
                      v-for="(item, index) in v.password.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="mt-1">
                  <button class="btn btn-success w-100">Ingresar</button>
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
            <a
              href="senasag-terminos_de_uso.html"
              class="fw-semibold text-primary text-decoration-underline"
            >
              Términos de uso
            </a>
          </div>
          <div class="col-6 derecha">
            <router-link :to="{ name: 'registro.cuenta' }">
              Quiero registrarme
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// services
import { mapState } from "vuex";
import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";

export default {
  name: "LoginPytiti",
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      //
      email: undefined,
      password: undefined,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required: helpers.withMessage(
        "Correo electrónico es requerido",
        required
      ),
      email: helpers.withMessage(
        "Por favor ingresar un correo electrónico válido",
        email
      ),
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
    tryToLogIn() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }
      const { email, password } = this;
      if (email && password) {
        this.login({
          email,
          password,
        });
      }
    },
  },
};
</script>

<style scoped>
.text-center a {
  color: #fff;
}
</style>
