<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row" v-if="isReady">
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
                                            :requestState="selectedState"
                                            :itemData="procedureData" 
                                            @send-action="selectPreRequest"
                                            :approveModal="approveData" 
                                            :rejectModal="rejectData" 
                                            :extraModal="confirmChangeProcedure" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg col-xxl">
                                            <h5 class="mb-3">DATOS DE PRE-SOLICITUD</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Objetivo de Trámite: </b> {{ procedureData.objetivo_tramite }}
                                                </p>
                                                <p>
                                                    <b>Actividad de Empresa: </b> {{ procedureData.detalle_actividad_empresa }}
                                                </p>
                                                <p>
                                                    <b>Tipo: </b> {{ accountType }}
                                                </p>
                                                <p>
                                                    <b>Estado: </b> 
                                                    <span :class="stateClassAccount">
                                                        <i :class="stateIconAccount + ' fs-17 align-middle'"></i> {{ procedureData.estado }}
                                                    </span>
                                                </p>
                                                <p>
                                                    <b>Fecha de Solicitud: </b> {{ dateFormat }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg col-xxl" v-if="procedureData.empresa !== null ">
                                            <h5 class="mb-3">DATOS DE EMPRESA</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Razón Social: </b>{{ procedureData.empresa.razonsocial }}
                                                </p>
                                                <p>
                                                    <b>NIT: </b>{{ procedureData.empresa.nit }}
                                                </p>
                                                <p>
                                                    <b>Descripción Actividad: </b>{{ procedureData.empresa.descripcionactividad }}
                                                </p>
                                                <p>
                                                    <b>Correo Electrónico: </b><a :href="`mailto:${procedureData.empresa.correoe}`">{{ procedureData.empresa.correoe }}</a>
                                                </p>
                                                <p>
                                                    <b>Dirección: </b> {{ procedureData.empresa.direccion }}
                                                </p>
                                                <p>
                                                    <b>Telefono/Celular: </b> {{ procedureData.empresa.telefonos }} / {{ procedureData.empresa.celular }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg col-xxl" v-if="procedureData.persona !== null">
                                            <h5 class="mb-3">DATOS DE PERSONA</h5>
                                            <div class="mb-2">
                                                <p>
                                                    <b>Nombre Completo: </b>{{ procedureData.persona.nombres }} {{ procedureData.persona.apellido_paterno}} {{ procedureData.persona.apellido_materno}}
                                                </p>
                                                <p>
                                                    <b>Carnet de Identidad: </b>{{ procedureData.persona.idcarnet }}
                                                </p>
                                                <p>
                                                    <b>Correo Electrónico: </b><a :href="`mailto:${procedureData.persona.correoe}`">{{ procedureData.persona.correoe }}</a>
                                                </p>
                                                <p>
                                                    <b>Dirección: </b> {{ procedureData.persona.direccion }}
                                                </p>
                                                <p>
                                                    <b>Telefono/Celular: </b> {{ procedureData.persona.telefonos }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 text-center">
                                        <router-link :to="{ name: 'tramites-pre-solicitados' }" class="btn btn-success btn-label">
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
        :attrs="confirmChangeProcedure" />
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
import { approveRequestedProcedure, changeRequestedProcedure, getRequestedProcedure, rejectRequestedProcedure } from "@/services/tramites";
import { userIsAdmin } from '@/services/user';
import { getUserSessionRequest } from '@/helpers/senasag/user';

export default {
    name: "TramitePreSolicitudDetalle",
    components: {
        Layout,
        PageHeader,
        //
        ApproveConfirmationModal,
        DeleteConfirmationModal,
        EmailConfirmationModal,
        AccionesDetalle,
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
            procedureData: {}, 
            procedureId: undefined,
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
            confirmChangeProcedure: {
                id: "confirmResendEmail", 
                title: "Atención", 
                message: "Esta a punto de REENVIAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?", 
                buttonText: "Aceptar",
                buttonReject: "Cancelar"
            },
            //
            userIsAdmin: userIsAdmin(),
            isReady: false,
            //
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
                show: false
            },
            selectedRequest: getUserSessionRequest("solicitud_tramitador_seleccionado").id_solicitud_cuenta,
            selectedState: getUserSessionRequest("solicitud_tramitador_seleccionado").estado,
        }
    },
    computed: {
        accountType() {
            let types = {
                "E": "Empresa",
                "P": "Persona"
            };
            return types[this.procedureData.tipo];
        },
        dateFormat() {
            let date = new Date(this.procedureData.fecha_solicitud);
            return date.toLocaleDateString();
        },
        stateClassAccount() {
            return this.$store.getters["tipoCuenta/claseTipoCuenta"](this.procedureData.estado);
        },
        stateIconAccount() {
            return this.$store.getters["tipoCuenta/iconoTipoCuenta"](this.procedureData.estado);
        },
    },
    methods: {
        loadRequestedProcedure() {
            this.isReady = false;
            getRequestedProcedure(this.$route.params.requestId)
                .then(
                    res => {
                        this.procedureData = res;
                        this.isReady = true;
                    },
                    err => {
                        console.error(err);
                    }
                )
        },
        // async methods
        approveRequest() {
            approveRequestedProcedure(this.selectedRequest)
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
        rejectProcedure() {
            rejectRequestedProcedure(this.selectedRequest)
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
        changeProcedure() {
            changeRequestedProcedure(this.selectedRequest, this.procedureId)
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
                            this.successAttrs.title = "Solicitud cambiada";
                            this.successAttrs.message = "Su solicitud ha sido cambiada correctamente.";
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
        // emitted-events
        confirmApprove({sent}) {
            if (sent === true) {
                this.approveRequest();
            }
        },
        confirmReject({sent}) {
            if (sent === true) {
                this.rejectProcedure();
            }
        },
        confirmResend({sent}) {
            if (sent === true) {
                this.changeProcedure();
            }
        },
        //
        representativeExists() {
            return !!this.procedureData.fid_persona_propietario;
        },
        selectPreRequest({id_pre_solicitud, tramite}) {
            this.selectedRequest = id_pre_solicitud;
            this.procedureId = tramite;
        },
        changeMessageState({show}) {
            this.successAttrs.show = show;
            this.errorAttrs.show = show;
        }
    },
    mounted() {
        this.loadRequestedProcedure();
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