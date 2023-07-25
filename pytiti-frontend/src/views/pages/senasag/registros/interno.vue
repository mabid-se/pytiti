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
                  <h5 class="text-primary">Elija el tipo de cuenta</h5>
                  <p class="text-muted">Seleccione el tipo de cuenta que desea crear acorde a su actividad</p>
                </div>

                <div class="row gy-4">
                  <div class="col-xxl-6 col-md-6">
                    <div class="card card-body text-center pt-4 pb-4 back-grey">
                      <div class="text-center mt-4 mb-4">
                        <img :src="personIcon" alt="Cuenta Persona Natural" width="72">
                      </div>
                      <h4 class="card-title">Cuenta Distrital</h4>
                      <p class="card-text text-muted">(Distrital / Unidad)</p>
                      <div class="mt-4">
                        <router-link 
                        class="btn btn-success" 
                        :to="{ name: 'registro-cuenta-distrital-oficina' }">Registrar</router-link>
                      </div>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-xxl-6 col-md-6">
                    <div class="card card-body text-center pt-4 pb-4 back-grey">
                      <div class="text-center mt-4 mb-4">
                        <img :src="personIcon" alt="Cuenta Persona Natural" width="72">
                      </div>
                      <h4 class="card-title">Cuenta Unidad</h4>
                      <p class="card-text text-muted">(Unidades)</p>
                      <div class="mt-4">
                        <router-link 
                        class="btn btn-success" 
                        :to="{ name: 'registro-cuenta-unidad' }">Registrar</router-link>
                      </div>
                    </div>
                  </div>
                  <!--end col-->
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

    <!-- footer -->
    <FooterCentered />
    <!-- end Footer -->
  </div>
</template>

<script>
// components
import FooterCentered from "@/components/footer-centered.vue";
import AuthLogo from "@/components/pytiti/auth-logo.vue";

// images
import person from "@/assets/icons/person-icon.png";

export default {
    name: "RegistroCuentaInterna",
    data() {
      return {
        currentYear: new Date().getFullYear(),
        personIcon: person
      }
    },
    components: {
        FooterCentered,
        AuthLogo
    }
}
</script>

<style scoped>
.back-grey {
  background:#E9EBEC;
}
</style>