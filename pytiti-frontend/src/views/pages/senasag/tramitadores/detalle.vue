<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-3">{{ mainTitle }}</h4>
                    </div>
                    <div class="card-body">
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
                                            @send-action="selectProcessor" 
                                            :requestState="selectedState" 
                                            :itemData="processorData" 
                                            :approveModal="approveData" 
                                            :rejectModal="rejectData" 
                                            :extraModal="confirmResendEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row justify-content-md-center">
                                        <div class="col-lg col-xxl">
                                            <h5 class="mb-3">DATOS DEL TRAMITADOR</h5>
                                            <div class="mb-2" v-if="processorExists">
                                                <p>
                                                    <b>Nombres de la Persona Natural: </b><span v-if="processorAccount.nombres">{{ processorAccount.nombres }}</span>
                                                </p>
                                                <p>
                                                    <b>Apellidos de la Persona Natural: </b><span v-if="processorAccount.apellido_paterno && processorAccount.apellido_materno">{{ processorAccount.apellido_paterno }} {{ processorAccount.apellido_materno }}</span>
                                                </p>
                                                <p>
                                                    <b>Carnet de Identidad: </b>
                                                    <span v-if="processorAccount.idcarnet">{{ processorAccount.idcarnet }} 
                                                    </span>
                                                    <span v-if="processorAccount.origenci">- {{ processorAccount.origenci }}
                                                    </span>
                                                </p>
                                                <p>
                                                    <b>Fecha de Nacimiento: </b><span v-if="processorAccount.fechanac">{{ processorAccount.fechanac }}</span>
                                                </p>
                                                <p>
                                                    <b>Correo Eléctronico: </b> <span v-if="processorAccount.correoe"><a :href="`email:${ processorAccount.correoe }`">{{ processorAccount.correoe }}</a></span>
                                                </p>
                                                <p>
                                                    <b>Telefono: </b><span v-if="processorAccount.telefonos">{{ processorAccount.telefonos }}</span>
                                                </p>
                                                <p>
                                                    <b>Dirección: </b><span v-if="processorAccount.direccion">{{ processorAccount.direccion }}</span>
                                                </p>
                                                <!-- -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 text-center">
                                        <router-link
                                        v-if="userIsAdmin" :to="{ name: 'lista-solicitudes-tramitadores' }" class="btn btn-success btn-label">
                                            <i class="ri-arrow-left-s-line label-icon align-middle fs-24 me-2"></i> Regresar al listado
                                        </router-link>
                                        <router-link
                                        v-else :to="{ name: 'tramitadores-empresa' }" class="btn btn-success btn-label">
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
        @send-confirmation="confirmReject" 
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
import AccionesDetalle from "@/components//tramites/acciones/acciones-detalle.vue"
// services
import { 
    // getProcessorAccount, 
    getPersonAccount } from "@/services/cuentas";
import { userIsAdmin } from '@/services/user';
import { 
    approveProcessorAccount, 
    approveResendEmail, 
    rejectUserAccount
} from "@/services/cuentas";
import { getUserSessionRequest } from '@/helpers/senasag/user';

export default {
    name: "TramitadorDetalle",
    components: {
        Layout,
        PageHeader,
        //
        AccionesDetalle,
        DeleteConfirmationModal,
        ApproveConfirmationModal,
        EmailConfirmationModal,
    },
    data(){
        return {
            title: "Detalle Cuenta Tramitador",
            items: [
                {
                    text: "Solicitudes",
                    href: "/",
                },
                {
                    text: "Tramitador",
                    active: true,
                },
            ],
            //
            processorData: {},
            //
            userIsAdmin: userIsAdmin(),
            selectedRequest: getUserSessionRequest("solicitud_tramitador_seleccionado").id_solicitud_cuenta,
            selectedState: getUserSessionRequest("solicitud_tramitador_seleccionado").estado,
            //
            successAttrs: {
                title: undefined,
                message: undefined,
                show: false,
            },
            errorAttrs: {
                title: undefined,
                message: undefined,
                show: false,
            },
            // modal-data
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
        }
    },
    computed: {
        processorAccount() {
            return this.processorData;
        },
        mainTitle() {
            if(!userIsAdmin()) {
                return "Detalle Tramitador"
            }
            return "Solicitud Registro Tramitador";
        }
    },
    methods: {
        loadProcessorAccount() {
            getPersonAccount(this.$route.params.id)
                .then(
                    res => {
                        this.processorData = res;
                    },
                    err => {
                        console.error(err);
                    }
                )
            // if (!this.userIsAdmin) {
            // } else {
            //     getProcessorAccount(this.$route.params.id)
            //         .then(
            //             res => {
            //                 this.processorData = res.fid_persona;
            //             },
            //             err => {
            //                 console.error(err);
            //             }
            //         );
            // }
        },
        //
        approveAccountRequest() {
            approveProcessorAccount(this.selectedRequest)
                .then(
                    res => {
                        if (res.error) {
                            this.isReady = false;
                            this.errorAttrs.title = "Error para aceptar solicitud";
                            this.errorAttrs.message = "Ocurrió un error al aprobar la solicitud";
                            this.errorAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Solicitud aceptada";
                            this.successAttrs.message = "Su solicitud ha sido aceptada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 500)
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
                            }, 500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Solicitud rechazada";
                            this.successAttrs.message = "Su solicitud ha sido rechazada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 500)
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
                            }, 500)
                        } else {
                            this.isReady = false;
                            this.successAttrs.title = "Reenvío de solicitud aceptada";
                            this.successAttrs.message = "Su reenvío de solicitud ha sido aceptada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                this.isReady = true;
                            }, 500)
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
        processorExists() {
            return false;
        },
        // emitted events
        confirmApprove({sent}) {
            if (sent === true) {
                this.approveAccountRequest();
            }
        },
        confirmReject({sent}) {
            if (sent === true) {
                this.rejectAccountRequest();
            }
        },
        confirmResend({sent}) {
            if (sent === true) {
                this.resendEmail();
            }
        },
        //
        representativeExists() {
            return !!this.companyData.fid_persona_propietario;
        },
        selectProcessor() {
            //
        },
        changeMessageState({show}) {
            this.successAttrs.show = show;
            this.errorAttrs.show = show;
        }
    },
    mounted() {
        this.loadProcessorAccount();
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