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
        <div class="row justify-content-center">
          <div class="col-lg-6 col-xl-6 col-md-6">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Establecer Contraseña</h5>
                  <div class="mb-3">
                    <p class="text-justify text-muted">Debes crear una contraseña que tenga {{ size }} o más caracteres. Debes incluir un número, un caracter especial (es decir, símbolos como $ % ! &) y un alfabeto</p>
                  </div>
                </div>
                <!-- form -->
                <form autocomplete="off" @submit.prevent="sendCredentials">
                  <div class="mb-3">
                    <label for="password">Contraseña: </label>
                    <input 
                    @input="validatePassword" 
                    type="password" 
                    class="form-control" 
                    name="password" 
                    id="password" 
                    v-model="form.password" />
                  </div>
                  <div class="mb-3">
                    <label for="password_confirmation">Confirmar contraseña: </label>
                    <input 
                    @input="validatePassword"
                    type="password" 
                    class="form-control" 
                    name="password_confirmation" 
                    id="password_confirmation" 
                    v-model="form.password_confirmation" />
                  </div>
                  <!-- alerts -->
                  <div v-if="error.danger.status" class="box-message alert alert-danger mb-3" role="alert">
                    <p>{{ error.danger.message }}</p>
                  </div>
                  <div v-if="error.warning.status" class="box-message alert alert-warning mb-3" role="alert">
                    <p>{{ error.warning.message }}</p>
                  </div>
                  <!-- /alerts -->
                  <div class="mb-3 text-center">
                    <button v-if="disableSaveButton" 
                    disabled
                    class="btn btn-success w-40-perc">Guardar</button>
                    <button v-else 
                    class="btn btn-success w-40-perc">Guardar</button>
                  </div>
                </form>
                <!-- /form -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a 
    :id="`${modalData.id}_trigger`"
    :href="`#${modalData.id}`" 
    data-bs-toggle="modal" 
    :data-bs-target="`#${modalData.id}`"></a>
    <SuccessModal :attrs="modalData" />
  </div>
</template>

<script>
// components
import AuthLogo from "@/components/pytiti/auth-logo.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue"
// services
import { setPassword } from "@/services/user";

export default {
    name: "PasswordConfirmation",
    components: {
      AuthLogo,
      SuccessModal,
    },
    data() {
      return {
        form: {
          email: undefined,
          password: undefined,
          password_confirmation: undefined
        },
        //
        error: {
          danger: {
            status: false,
            message: undefined
          },
          warning: {
            status: false,
            message: undefined,
          },
        },
        //
        disableSaveButton: false,
        size: 6,
        // modal-data
        modalData: {
          id: "successModal", 
          title: "Contraseña actualizada", 
          message: "Tu contraseña ha sido actualizada satisfactoriamente", 
          buttonText: "Aceptar"
        }
      }
    },
    methods: {
      checkLength(fieldValue) {
        if (fieldValue.length < this.size) {
          this.error.danger.status = true;
          this.error.danger.message = `Se requiere un mínimo de ${this.size} carácteres para tu contraseña.`;
          return true;
        }
        this.error.danger.status = false;
        return false;
      },
      checkMatch() {
        if (this.form.password !== this.form.password_confirmation) {
          this.error.warning.status = true;
          this.error.warning.message = `Las contraseñas no coinciden`;
          return true;
        }
        this.error.warning.status = false;
        return false;
      },
      checkRegex(){
        var passwd = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/;
        if (this.form.password.match(passwd)) {
          this.error.warning.status = false;
          return false;
        }
        this.error.warning.status = true;
        this.error.warning.message = `La contraseña debe contener al menos ${this.size} caracteres y cumplir con las condiciones`;
        return true;
      },
      validatePassword(e) {
        console.log(e.target.value);
        if (this.checkMatch() && this.checkLength(e.target.value) && this.checkRegex()) {
          this.disableSaveButton = true;
        } else {
          this.disableSaveButton = false;
        }
      },
      sendCredentials() {
        setPassword(this.form)
          .then(
            (res) => {
              //document.querySelector(`#${this.modalData.id}_trigger`).click();
              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            },
            err => {
              console.error(err);
            }
          );
      },
      hasQuery() {
         if(!this.$route.query.email) {
          this.$router.push("/login");
         } else {
           this.form.email = this.$route.query.email;
         }
      }
    },
    mounted() {
      this.hasQuery();
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

.box-message {
  transition: 0.2s ease-in;
}
</style>