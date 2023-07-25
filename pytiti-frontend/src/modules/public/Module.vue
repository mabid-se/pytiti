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

        <router-view />
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
import { mapMutations, mapState } from "vuex";
import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";

export default {
  name: "Public",
  components: {
    FooterCentered,
    AuthLogo,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      loading: false,
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
    ...mapMutations("tablasBase", ["SET_START_DATA"]),
    tryToLogIn() {
      this.submitted = true;
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
    // loadBaseTables() {
    //   const SELECT_APIS = [
    //     {
    //       name: "distrital",
    //       endpoint: "api/v1/select-options/distrital/",
    //     },
    //     {
    //       name: "provincias",
    //       endpoint: "api/v1/select-options/provincias/",
    //     },
    //     {
    //       name: "municipios",
    //       endpoint: "api/v1/select-options/municipios/",
    //     },
    //   ];

    //   Promise.all(SELECT_APIS.map((api) => getSelectList(api.endpoint))).then(
    //     ([r1, r2, r3]) => {
    //       localStorage.setItem(
    //         `${SELECT_APIS[0].name}`,
    //         JSON.stringify(r1.results)
    //       );
    //       localStorage.setItem(
    //         `${SELECT_APIS[1].name}`,
    //         JSON.stringify(r2.results)
    //       );
    //       localStorage.setItem(
    //         `${SELECT_APIS[2].name}`,
    //         JSON.stringify(r3.results)
    //       );

    //       this.SET_START_DATA({
    //         cities: getList("distrital"),
    //         provinces: getList("provincias"),
    //         towns: getList("municipios"),
    //       });
    //       this.loading = false;
    //     }
    //   );
    // },
  },

  mounted() {
    // this.loadBaseTables();
  },
};
</script>

<style scoped>
.text-center a {
  color: #fff;
}
</style>
