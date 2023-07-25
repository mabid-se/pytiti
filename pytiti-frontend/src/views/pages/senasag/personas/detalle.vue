<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-3">Solicitud Registro Persona Natural</h4>
                    </div>
                    <div class="card-body" v-if="isReady">
                        <div class="live-preview">
                            <div class="card card-border-grey">
                                <div class="card-header card-border-bottom-grey">
                                    <div class="row">
                                        <div class="col-lg-10">
                                            <h6 class="fs-15 mb-0">Datos</h6>
                                        </div>
                                        <div class="col-lg">
                                            <AccionesDetalle 
                                            v-if="userIsAdmin"
                                            @send-action="selectPerson" 
                                            :requestState="selectedState" 
                                            :itemData="personData" 
                                            :approveModal="approveData" 
                                            :rejectModal="rejectData" 
                                            :extraModal="confirmResendEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row justify-content-md-center">
                                        <div class="col-lg col-xxl">
                                            <h5 class="mb-3">DATOS DE LA PERSONA</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Nombres de la Persona Natural: </b>{{ personData.nombres }}
                                                </p>
                                                <p>
                                                    <b>Apellidos de la Persona Natural: </b>{{ personData.apellido_paterno}} {{ personData.apellido_materno }}
                                                </p>
                                                <p>
                                                    <b>Carnet de Identidad: </b>{{ personData.idcarnet }} - {{ personData.origenci }}
                                                </p>
                                                <p>
                                                    <b>Fecha de Nacimiento: </b>{{ personData.fechanac }}
                                                </p>
                                                <p>
                                                    <b>Correo Eléctronico: </b> <a :href="`email:${ personData.correoe }`">{{ personData.correoe }}</a>
                                                </p>
                                                <p>
                                                    <b>Telefono: </b>{{ personData.telefonos }}
                                                </p>
                                                <p>
                                                    <b>Dirección: </b>{{ personData.direccion }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg col-xxl">
                                            <MapReadField 
                                                :field="{
                                                label:'Ubicación', 
                                                type_field: 'map', 
                                                id: 'ubicacion',
                                                value: `${latitud},${longitud}`
                                            }" />
                                        </div>
                                    </div>
                                    <div class="mt-4 text-center">
                                        <router-link :to="{ name: 'lista-solicitudes-personas' }" class="btn btn-success btn-label">
                                            <i class="ri-arrow-left-s-line label-icon align-middle fs-24 me-2"></i> Regresar al listado
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EmailConfirmationModal 
        @send-confirmation="confirmResend" 
        :attrs="confirmResendEmail" />
        <DeleteConfirmationModal 
        @send-confirmation="confirmDelete" 
        :attrs="rejectData" />
        <ApproveConfirmationModal 
        @send-confirmation="confirmApprove" 
        :attrs="approveData" />
        <!--- messages -->
        <ErrorMessage 
        :attrs="errorAttrs" 
        @change-message-state="changeMessageState" />
        <SuccessMessage 
        :attrs="successAttrs" 
        @change-message-state="changeMessageState" />
        <!--- /messages -->
    </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue"
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import AccionesDetalle from "@/components//tramites/acciones/acciones-detalle.vue";
import MapReadField from "@/components/senasag-forms/form-fields/map-read-field.vue";


// services
import { 
    getPersonAccount,
    approvePersonRequest, 
    rejectUserAccount,
    approveResendEmail
} from "@/services/cuentas";
import { getUserSessionRequest } from '@/helpers/senasag/user';
import { userIsAdmin } from '@/services/user';

export default {
    name: "PersonaDetalle",
    components: {
        Layout,
        PageHeader,
        //
        MapReadField,
        ApproveConfirmationModal,
        DeleteConfirmationModal,
        EmailConfirmationModal,
        AccionesDetalle,
    },
    data(){
        return {
            title: "Detalle Cuenta Persona",
            items: [
                {
                    text: "Solicitudes",
                    href: "/",
                },
                {
                    text: "Persona",
                    active: true,
                },
            ],
            //
            rejectData: {
                id: "deleteRecordModal", 
                title: "¿Estás seguro?", 
                message: "Está seguro de rechazar éste registro", 
                buttonText: "Sí, rechazar registro"
            },
            approveData: {
                id: "approveRecordModal", 
                title: "Atención", 
                message: "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?", 
                buttonText: "Aceptar"
            },
            confirmResendEmail: {
                id: "confirmResendEmail", 
                title: "Atención", 
                message: "Esta a punto de REENVIAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?", 
                buttonText: "Aceptar",
                buttonReject: "Cancelar"
            },
            //
            personData: {},
            selectedRequest: getUserSessionRequest("solicitud_persona_seleccionada").id_solicitud_cuenta,
            selectedState: getUserSessionRequest("solicitud_persona_seleccionada").estado,
            userIsAdmin: userIsAdmin(),
            isReady: false,
            // errors
            hasFailed: false,
            hasSucceed: false,
            successAttrs: {
                title: undefined,
                message: undefined,
                show: false
            },
            errorAttrs: {
                title: undefined,
                message: undefined,
                show: false,
            },
        }
    },
    computed: {
        latitud(){
            let lat = this.personData.metadata.find(item => item.clave === "latitud");
            return lat.valor;
        },
        longitud(){
            let long = this.personData.metadata.find(item => item.clave === "longitud");
            return long.valor;
        }
    },
    methods: {
        loadPersonAccountData() {
            getPersonAccount(this.$route.params.id)
                .then(
                    res => {
                        this.isReady = true;
                        this.personData = res;
                    },
                    err => {
                        console.error(err);
                    }
                );
        },
        // events
        approveAccountRequest() {
            approvePersonRequest(this.selectedRequest)
                .then(
                    res => {
                        if (res.error) {
                            this.isReady = false;
                            this.errorAttrs.title = "Error para aceptar solicitud";
                            this.errorAttrs.message = "Ocurrió un error al aprobar la solicitud";
                            this.errorAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Solicitud aceptada";
                            this.successAttrs.message = "Su solicitud ha sido aceptada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } 
                    },
                    err => {
                        this.hasFailed = false;
                        if (err) {
                            this.hasFailed = true;
                        }
                    }
                )
        },
        rejectAccountRequest() {
            rejectUserAccount(this.selectedRequest)
                .then(
                    res => {
                        if (res.error) {
                            this.isReady = false;
                            this.errorAttrs.title = "Error para rechazar solicitud";
                            this.errorAttrs.message = "Ocurrió un error al rechazar la solicitud";
                            this.errorAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Solicitud rechazada";
                            this.successAttrs.message = "Su solicitud ha sido rechazada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } 
                    },
                    err => {
                        this.hasFailed = false;
                        if (err) {
                            this.hasFailed = true;
                        }
                    }
                )
        },
        resendEmail() {
            approveResendEmail(this.selectedRequest)
                .then(
                    res => {
                        if (res.error) {
                            this.isReady = false;
                            this.errorAttrs.title = "Error para reenviar solicitud";
                            this.errorAttrs.message = "Ocurrió un error al reenviar la solicitud";
                            this.errorAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Reenvío de solicitud aceptada";
                            this.successAttrs.message = "Su reenvío de solicitud ha sido aceptada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 1500)
                        } 
                    },
                    err => {
                        this.hasFailed = false;
                        if (err) {
                            this.hasFailed = true;
                        }
                    }
                )
        },
        selectPerson() {
            //
        },
        // emitted-events
        confirmApprove({sent}) {
            if (sent === true) {
                this.approveAccountRequest();
            }
        },
        confirmDelete({sent}) {
            if (sent === true) {
                this.rejectAccountRequest();
            }
        },
        confirmResend({sent}) {
            if (sent === true) {
                this.resendEmail();
            }
        },
        changeMessageState({show}) {
            this.successAttrs.show = show;
            this.errorAttrs.show = show;
        }
    },
    mounted() {
        this.loadPersonAccountData();
    }
}
</script>

<style scoped>
.card-border-grey {
    border: 2px solid #e1e1e1;
}

.card-border-bottom-grey {
    border-bottom: 2px solid #e1e1e1;
}
</style>