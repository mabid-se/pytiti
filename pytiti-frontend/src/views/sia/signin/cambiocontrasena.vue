<template>
    <div class="auth-page-wrapper pt-5">        
            <!-- auth page content -->
            <div class="auth-page-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <a href="index.html" class="d-inline-block auth-logo">
                                        <img src="@/assets/images/logo-light2.png" alt="SENASAG" width="100%">
                                    </a>
                                </div>
                                <p class="mt-3 fs-15 fw-medium">PPADRON WEB - SENASAG</p>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                    <div class="card-body">
                                        <div class="text-center mt-2">
                                        <h5 class="text-primary">Actualización de contraseña</h5>
                                        <p class="text-muted">Llene sus datos para actualizar</p>
                                    </div>                                        
                                        <div class="tab-content text-muted">   
                                            <form @submit.prevent="handleSubmit">
                                                <div class="mb-3">
                                                    <label for="iconInput" class="form-label">Usuario</label>
                                                    <div class="form-icon right">
                                                        <input type=""
                                                         v-model="username" id="username" name="username" 
                                                         class="form-control form-control-icon" placeholder="Escriba su nombre de usuario asignado">                                                   
                                                    </div>
                                                    <div v-if="submitted && v$.username.$error">
                                                        <span class="error-msg" >El usuario es requerido</span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 form-group">                                     
                                                    <label for="old_password" class="form-label">Contraseña actual</label>
                                                    <div class="form-icon right">
                                                        <input type="password" class="form-control" v-model="old_password" id="old_password" name="old_password" placeholder="Escriba su contraseña">
                                                    </div>
                                                    <div v-if="submitted && v$.old_password.$error">
                                                        <span class="error-msg" >La contraseña es requerida</span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 form-group">                                              
                                                    <label for="password" class="form-label">Nueva contraseña</label>
                                                    <div class="form-icon right">
                                                        <input
                                                            v-model="password"
                                                            id="password"
                                                            name="password"
                                                            type="password" class="form-control" placeholder="Escriba su nueva contraseña">
                                                    </div>
                                                    <div v-if="submitted && v$.password.$error">
                                                        <div v-for="(error, index) of v$.password.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3 form-group">                                                                                            
                                                    <label for="exampleInputpassword" class="form-label">Repetir contraseña</label>
                                                    <div class="form-icon right">
                                                        <input 
                                                            v-model="confirmPassword"
                                                            id="confirmPassword"
                                                            name="confirmPassword" type="password" class="form-control" placeholder="Repita su nueva contraseña">   
                                                    </div>
                                                    <div v-if="submitted && v$.confirmPassword.$error">
                                                        <div v-for="(error, index) of v$.confirmPassword.$errors" :key="index">
                                                            <div v-if="error.$message === 'The value must be equal to the other value'">
                                                                <div class="error-msg">{{ "La contraseñaa debe coincidir" }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 form-group">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="live-preview">
                                                                <div>                   
                                                                    <button
                                                                        class="btn btn-success w-100"
                                                                        type="submit"
                                                                    >Actualizar contraseña</button>
                                                                </div>
                                                            </div>                      
                                                        </div>
                                                        <!-- end card-body -->
                                                    </div>
                                                    <!-- end card -->
                                                </div> 
                                            </form>                  
                                        </div>
                                    </div><!-- end card-body -->
                                </div>
                            <!-- end card -->
                            <div class="container">                                
                                <div class="row">
                                  <div class="col-6 mt-0 izquierda"><a href="signup" class="text-primary text-decoration-underline"></a></div>
                                  <div class="col-6 derecha"><a href="#" class="text-primary text-decoration-underline" @click="backPage()" >Regresar</a></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- end row -->
                </div>
                <!-- end container -->
            </div>
            <!-- end auth page content -->
            <SuccessModal
                @send-confirmation="confirmDelete"
                :attrs="modalData" />
            <a 
                id="show-confirm"
                :href="`#${modalData.id}`" 
                :data-bs-target="`#${modalData.id}`"
                data-bs-toggle="modal" style="display:none"></a>

            <!-- footer -->
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <p class="mb-0 text-footer-black">&copy; {{new Date().getFullYear()}} - SENASAG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
</template>

<script>
    import useVuelidate from "@vuelidate/core";
    import Layout from "../../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import { required, helpers, sameAs } from "@vuelidate/validators";
    import { updatePasswordUserSiaService } from "@/services/sia";
    //import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
    //import { sameAs } from "vuelidate/lib/validators";
    import SuccessModal from '@/components/pytiti/success-modal.vue';
    import 'prismjs';
    import 'prismjs/themes/prism.css';
    export default {
        setup() {
            return { v$: useVuelidate() };
        },
        data() {
            return {
                title: "Modals",
                items: [
                    {
                        text: "Base UI",
                        href: "/",
                    },
                    {
                        text: "Modals",
                        active: true,
                    },
                ],
                modalData: {
                    id: "deleteRolModal", 
                    title: "Esta cambiando su contraseña", 
                    buttonText: "Aceptar",
                    redirectUrl: "/sia/signin/"
                },
                username: "",
                old_password: "",
                password: "",
                confirmPassword: "",
                submitted: false,
            };
        },
        name: "Modals",
        components: {
            Layout,
            PageHeader,
            SuccessModal,
        },
        validations () {
            return {
                username: { required },
                old_password: { required },
                password: {
                    required: helpers.withMessage("Contraseña es requerida", required),
                },
                confirmPassword: {
                    sameAsPassword: sameAs(this.password),
                }
            }
        },
        methods: {
            backPage() {
                const currentLocation = "/accesosia/solicitudessia";
                window.location = currentLocation;
            },
            openModal: function(data) {
                this.modalData["message"] = "Está seguro de eliminar el Permiso ";// + data.name;
                document.querySelector("#show-confirm").click();
            },

            confirmDelete() {
                console.log("here!");
            },

            handleSubmit(e) {
                this.submitted = true;
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
                let _data = {
                    "username": this.username,
                    "old_password": this.old_password,
                    "new_password": this.password
                }
                updatePasswordUserSiaService(_data).then(
                    (res) => {
                        this.modalData["message"] = res.message;
                        if (res.message === "El recurso solicitado no existe") {
                            this.modalData["redirectUrl"]= "/sia/cambiocontrasena";
                        }
                        document.querySelector("#show-confirm").click();
                    },
                    (err) => {
                        console.error(err);
                    }
                );
            }
        }
    };
</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>