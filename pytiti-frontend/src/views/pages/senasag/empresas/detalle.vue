<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-3">Solicitud</h4>
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
                                            @send-action="selectCompany" 
                                            :requestState="selectedState" 
                                            :itemData="companyData" 
                                            :approveModal="approveData" 
                                            :rejectModal="rejectData" 
                                            :extraModal="confirmResendEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" v-if="isReady">
                                    <div class="row">
                                        <div class="col-lg col-xxl">
                                            <h5 class="mb-3">DATOS DE LA EMPRESA</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Nombre de la empresa: </b> {{ companyData.razonsocial }}
                                                </p>
                                                <p>
                                                    <b>Número de NIT: </b> {{ companyData.nit }}
                                                </p>
                                                <p>
                                                    <b>Dirección de la empresa: </b> {{ companyData.direccion }}
                                                </p>
                                                <p>
                                                    <b>Correo electrónico de la empresa: </b> {{ companyData.correoe }}
                                                </p>
                                                <p>
                                                    <b>Teléfono: </b> {{ companyData.telefonos }}
                                                </p>
                                                <p>
                                                    <b>Celular: </b> {{ companyData.celular }}
                                                </p>
                                                <p>
                                                    <b>Página web: </b> {{ companyData.direccionweb }}
                                                </p>
                                                <p>
                                                    <b>Descripción de la actividad de la empresa: </b> {{ companyData.descripcionactividad }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg col-xxl">
                                            <h5 class="mb-3">DATOS DEL REPRESENTANTE LEGAL</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Nombre del representante legal: </b> <span v-if="representativeExists()">{{ representativeData.nombres }}</span>
                                                </p>
                                                <p>
                                                    <b>Apellidos del representante legal: </b> <span v-if="representativeExists()">{{ representativeData.apellido_paterno }} {{ representativeData.apellido_materno }}</span>
                                                </p>
                                                <p>
                                                    <b>Número de NIT: </b> <span v-if="representativeExists()">{{ representativeData.idcarnet }}-{{ representativeData.origcenci}}</span>
                                                </p>
                                                <p>
                                                    <b>Dirección del representante: </b> <span v-if="representativeExists()">{{ representativeData.direccion }}</span>
                                                </p>
                                                <p>
                                                    <b>Correo electrónico del representatnte: </b> <span v-if="representativeExists()">{{ representativeData.correoe }}</span>
                                                </p>
                                                <p>
                                                    <b>Teléfono: </b> <span v-if="representativeExists()">{{ representativeData.telefonos }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg col-xxl">
                                            <MapReadField 
                                            v-if="companyData.latitud && companyData.longitud" 
                                            :field="{
                                                label:'Ubicación', 
                                                type_field: 'map', 
                                                id: 'ubicacion',
                                                value: `${companyData.latitud},${companyData.longitud}`
                                            }" />
                                        </div>
                                    </div>
                                    <div class="mt-4 text-center">
                                        <router-link :to="{ name: 'lista-solicitudes-empresas' }" class="btn btn-success btn-label">
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
import AccionesDetalle from "@/components//tramites/acciones/acciones-detalle.vue";
import MapReadField from "@/components/senasag-forms/form-fields/map-read-field.vue";

// services
import { 
    approveEnterpriseAccout, 
    approveResendEmail, 
    getEnterpriseAccount, 
    rejectUserAccount 
} from "@/services/cuentas";
import { userIsAdmin } from '@/services/user';
import { getUserSessionRequest } from '@/helpers/senasag/user';

export default {
    name: "EmpresaDetalle",
    components: {
        Layout,
        PageHeader,
        //
        ApproveConfirmationModal,
        DeleteConfirmationModal,
        EmailConfirmationModal,
        AccionesDetalle,
        MapReadField,
    },
    data(){
        return {
            title: "Detalle Cuenta Empresa",
            items: [
                {
                    text: "Senasag",
                    href: "/",
                },
                {
                    text: "Empresa",
                    active: true,
                },
            ],
            //
            companyData: {},
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
            selectedRequest: getUserSessionRequest("solicitud_empresa_seleccionada").id_solicitud_cuenta,
            selectedState: getUserSessionRequest("solicitud_empresa_seleccionada").estado,
            userIsAdmin: userIsAdmin(),
            isReady: false,
            // errors
            hasFailed: false,
            hasSucceed: false,
            successAttrs: {
                title: undefined,
                message: undefined
            },
            errorAttrs: {
                title: undefined,
                message: undefined
            },
        }
    },
    computed: {
        representativeData() {
            return this.companyData.fid_persona_propietario;
        }
    },
    methods: {
        loadEnterpriseAccount() {
            getEnterpriseAccount(this.$route.params.id)
                .then(
                    res => {
                        this.companyData = res;
                        this.isReady = true;
                    },
                    err => {
                        console.error(err);
                    }
                )
        },
        // async methods
        approveCompany() {
            approveEnterpriseAccout(this.selectedRequest)
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
                );
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
        // emitted events
        confirmApprove({sent}) {
            if (sent === true) {
                this.approveCompany();
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
        selectCompany() {
            //
        },
        changeMessageState({show}) {
            this.successAttrs.show = show;
            this.errorAttrs.show = show;
        }
    },
    mounted() {
        this.loadEnterpriseAccount();
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