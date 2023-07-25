<template>
  <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row justify-content-md-center">
            <div class="col-xxl-7 col-md-7 col-lg-7">
                <div class="row">
                    <div class="col-lg col-xxl">
                        <div class="card">
                            <div class="card-body p-0">
                                <div class="live-preview">
                                    <div class="card card-border-grey m-0">
                                        <div class="card-header card-border-bottom-grey">
                                            <h6 class="fs-15 mb-0">Nuevo tramitador</h6>
                                        </div>
                                        <div class="card-body">
                                            <form @submit="sendForm" class="needs-validation" novalidate>
                                                <TramitadorForm 
                                                    @update-form-data="updateFormData" 
                                                />
                                                <button class="btn btn-success float-end">Guardar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SuccessModal :attrs="modalData" />
                <a 
                id="show-success-modal"
                :href="`#${modalData.id}`" 
                :data-bs-target="`#${modalData.id}`"
                data-bs-toggle="modal" style="display:none"></a>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import TramitadorForm from "@/components/senasag-forms/registro/tramitador-form.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue";
// services
import { registerProcessorAccount } from "@/services/cuentas";

// validators
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    name: "RegistroTramitador",
    components: {
        Layout,
        PageHeader,
        TramitadorForm,
        SuccessModal,
    },
    data() {
        return {
            title: "Crear solicitud para un nuevo tramitador",
            items: [
                {
                    text: "Solicitud",
                    href: "/",
                },
                {
                    text: "Solicitud Registro Tramitador Nuevo",
                    active: true,
                },
            ],
            //
            formData: {},
            // tramites sin asignar
            tramites: [],
            modalData: {
                id: "successModal", 
                title: "Solicitud enviada", 
                message: "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.", 
                buttonText: "Aceptar",
                redirectUrl: "/tramitadores"
            },
            // errors
            backendErrors: {},
        }
    },
    methods: {
        updateFormData(data) {
            Object.assign(this.formData, data);
        },
        sendForm(e) {
            e.preventDefault();
            if (!e.target.checkValidity()) {
                e.stopPropagation();
                e.target.classList.add("was-validated");
            } else {
                registerProcessorAccount(this.formData)
                    .then(
                        (res) => {
                            if (e.target.checkValidity()) {
                                document.querySelector("#show-success-modal").click();
                            }
                        },
                        err => {
                            console.error(err);
                        }
                    );
            }
        },
        //
    },
}
</script>