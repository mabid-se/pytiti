<template>
  <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row justify-content-md-center">
            <div class="col-xxl-7 col-md-7 col-lg-7">
                <div class="row">
                    <div class="col-lg col-xxl margin-cont">
                        <div class="card">
                            <div class="card-body p-0">
                                <div class="live-preview">
                                    <div class="card card-border-grey m-0">
                                        <div class="card-header card-border-bottom-grey">
                                            <h6 class="fs-15 mb-0">Nuevo rol</h6>
                                        </div>
                                        <div class="card-body">
                                            <form @submit="sendForm" class="needs-validation" novalidate>
                                                <RollForm 
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
import RollForm from "@/components/senasag-forms/registro/rol-form.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue";
// services
import { createRolesSiaService } from "@/services/permisos";

export default {
    name: "RegistroTramitador",
    components: {
        Layout,
        PageHeader,
        RollForm,
        SuccessModal,
    },
    data() {
        return {
            title: "Crear nuevo rol",
            items: [
                {
                    text: "Solicitud",
                    href: "/",
                },
                {
                    text: "Nuevo rol",
                    active: true,
                },
            ],
            //
            formData: {},
            tramites: [],
            modalData: {
                id: "successModal", 
                title: "Nuevo Rol", 
                message: "Se registro con exito el rol", 
                buttonText: "Aceptar",
                redirectUrl: "/roles/"
            },
            // errors
            backendErrors: {},
        }
    },
    methods: {
        updateFormData(data) {
            let _data = {
                "name": data['name'],
                "permissions": data['permisos'].map(a => a.id),
            }
            Object.assign(this.formData, _data);
        },
        sendForm(e) {
            e.preventDefault();
            if (!e.target.checkValidity()) {
                e.stopPropagation();
                e.target.classList.add("was-validated");
            } else {
                createRolesSiaService(this.formData)
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