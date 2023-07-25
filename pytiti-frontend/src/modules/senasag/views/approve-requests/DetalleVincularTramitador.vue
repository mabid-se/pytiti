<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-3">Solicitud</h4>
        </div>
        <div class="card-body mt-48">
          <Spinner :loading="loading">
            <div class="live-preview">
              <div class="card card-border-grey">
                <div class="card-header card-border-bottom-grey">
                  <div class="row">
                    <div class="col-lg-10">
                      <h6 class="fs-15 mb-0">Datos</h6>
                    </div>
                    <div class="col-lg">
                      <ActionsDetail
                        :request-attach-processor="requestAttachProcessor"
                        @show:approve-modal="showApproveModal"
                        @show:reject-modal="showRejectModal"
                      ></ActionsDetail>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg col-xxl">
                      <h5 class="mb-3">DATOS DEL TRAMITADOR</h5>
                      <div class="mb-2">
                        <p>
                          <b>Nombres de la Persona Natural: </b
                          ><span
                            v-if="requestAttachProcessor.fid_tramitador.nombres"
                            >{{
                              requestAttachProcessor.fid_tramitador.nombres
                            }}</span
                          >
                        </p>
                        <p>
                          <b>Apellidos de la Persona Natural: </b
                          ><span
                            >{{
                              requestAttachProcessor.fid_tramitador
                                .apellido_paterno
                            }}
                            {{
                              requestAttachProcessor.fid_tramitador
                                .apellido_materno
                            }}</span
                          >
                        </p>
                        <p>
                          <b>Carnet de Identidad: </b>
                          <span
                            >{{
                              requestAttachProcessor.fid_tramitador.idcarnet
                            }}
                          </span>
                          <span
                            >-
                            {{ requestAttachProcessor.fid_tramitador.origenci }}
                          </span>
                        </p>
                        <p>
                          <b>Fecha de Nacimiento: </b
                          ><span>{{
                            requestAttachProcessor.fid_tramitador.fechanac
                          }}</span>
                        </p>
                        <p>
                          <b>Correo Eléctronico: </b>
                          <span
                            ><a
                              :href="`email:${requestAttachProcessor.fid_tramitador.correoe}`"
                              >{{
                                requestAttachProcessor.fid_tramitador.correoe
                              }}</a
                            ></span
                          >
                        </p>
                        <p>
                          <b>Telefono: </b
                          ><span>{{
                            requestAttachProcessor.fid_tramitador.telefonos
                          }}</span>
                        </p>
                        <p>
                          <b>Dirección: </b
                          ><span>{{
                            requestAttachProcessor.fid_tramitador.direccion
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 text-center">
                    <router-link
                      :to="{
                        name: 'senasag.lista.solicitudes.tramitador-vincular',
                      }"
                      class="btn btn-success btn-label"
                    >
                      <i
                        class="ri-arrow-left-s-line label-icon align-middle fs-24 me-2"
                      ></i>
                      Regresar al listado
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </Spinner>
        </div>
      </div>
    </div>
  </div>
  <EmailConfirmationModal
    @send-confirmation="confirmResend"
    :attrs="confirmResendEmail"
  />
  <DeleteConfirmationModal
    @send-confirmation="confirmReject"
    :attrs="rejectData"
  />
  <ApproveConfirmationModal
    @send-confirmation="confirmApprove"
    :attrs="approveData"
  />
  <!--- messages -->
  <ErrorMessage
    :attrs="errorAttrs"
    @change-message-state="changeMessageState"
  />
  <SuccessMessage
    :attrs="successAttrs"
    @change-message-state="changeMessageState"
  />
  <!--- /messages -->
</template>

<script>
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import Spinner from "@/components/widgets/spinner";
import ActionsDetail from "@/modules/senasag/components/solicitudes/vincular-tramitador/ActionsDetail.vue";
import {
  getRequestAttachProcessor,
  answerAttachProcessorRequest,
} from "@/modules/senasag/services/SolicitudesService";
import { Modal } from "bootstrap";

import NotificationHelper from "@/helpers/notification";

export default {
  name: "EmpresaDetalle",
  components: {
    PageHeader,
    ApproveConfirmationModal,
    DeleteConfirmationModal,
    EmailConfirmationModal,
    // MapReadField,
    Spinner,
    ActionsDetail,
  },
  data() {
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
      requestAttachProcessor: {},
      rejectData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de rechazar éste registro",
        buttonText: "Sí, rechazar registro",
      },
      approveData: {
        id: "approveRecordModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      confirmResendEmail: {
        id: "confirmResendEmail",
        title: "Atención",
        message:
          "Esta a punto de REENVIAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
        buttonReject: "Cancelar",
      },
      isReady: false,
      // errors
      hasFailed: false,
      hasSucceed: false,
      successAttrs: {
        title: undefined,
        message: undefined,
      },
      errorAttrs: {
        title: undefined,
        message: undefined,
      },
      loading: true,
    };
  },
  computed: {
    representativeData() {
      return this.requestAttachProcessor.emp_fid_persona_propietario;
    },
  },
  mounted() {
    this.loadCompanyAccountRequest();
  },
  methods: {
    showApproveModal() {
      this.modal = new Modal(`#${this.approveData.id}`);
      this.modal.show();
    },
    showRejectModal() {
      this.modal = new Modal(`#${this.rejectData.id}`);
      this.modal.show();
    },
    loadCompanyAccountRequest() {
      getRequestAttachProcessor(
        this.$route.params.id_solicitud_vincular_tramitador
      ).then(({ ok, data }) => {
        if (!ok)
          return NotificationHelper.error(
            null,
            "Error al cargar la solicitud de cuenta de empresa."
          );
        this.requestAttachProcessor = data;
        this.loading = false;
      });
    },
    // async methods
    approveCompany() {
      answerAttachProcessorRequest(
        this.$route.params.id_solicitud_vincular_tramitador,
        "aprobar"
      ).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al aprobar solicitud.");
        NotificationHelper.success(null, "Solicitud aprobada exitosamente");
        this.loadCompanyAccountRequest();
      });
    },

    rejectAccountRequest() {
      answerAttachProcessorRequest(
        this.$route.params.id_solicitud_vincular_tramitador,
        "rechazar"
      ).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al rechazar solicitud.");
        NotificationHelper.success(null, "Solicitud rechazada exitosamente");
        this.loadCompanyAccountRequest();
      });
    },
    // emitted events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveCompany();
      }
    },
    confirmReject({ sent }) {
      if (sent === true) {
        this.rejectAccountRequest();
      }
    },
    confirmResend({ sent }) {
      if (sent === true) {
        this.resendEmail();
      }
    },
    //
    representativeExists() {
      return !!this.requestAttachProcessor.emp_fid_persona_propietario;
    },
    selectCompany() {
      //
    },
    changeMessageState({ show }) {
      this.successAttrs.show = show;
      this.errorAttrs.show = show;
    },
  },
};
</script>

<style scoped>
.card-border-grey {
  border: 2px solid #e1e1e1;
}

.card-border-bottom-grey {
  border-bottom: 2px solid #e1e1e1;
}
</style>
