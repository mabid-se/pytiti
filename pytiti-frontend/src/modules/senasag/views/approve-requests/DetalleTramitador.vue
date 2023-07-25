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
                        :processor-account-request="processorAccountRequest"
                        @show:approve-modal="showApproveModal"
                        @show:resend-email-modal="showResendEmailModal"
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
                          ><span v-if="processorAccountRequest.nombres">{{
                            processorAccountRequest.nombres
                          }}</span>
                        </p>
                        <p>
                          <b>Apellidos de la Persona Natural: </b
                          ><span
                            v-if="
                              processorAccountRequest.apellido_paterno &&
                              processorAccountRequest.apellido_materno
                            "
                            >{{ processorAccountRequest.apellido_paterno }}
                            {{ processorAccountRequest.apellido_materno }}</span
                          >
                        </p>
                        <p>
                          <b>Carnet de Identidad: </b>
                          <span v-if="processorAccountRequest.idcarnet"
                            >{{ processorAccountRequest.idcarnet }}
                          </span>
                          <span v-if="processorAccountRequest.origenci"
                            >- {{ processorAccountRequest.origenci }}
                          </span>
                        </p>
                        <p>
                          <b>Fecha de Nacimiento: </b
                          ><span v-if="processorAccountRequest.fechanac">{{
                            processorAccountRequest.fechanac
                          }}</span>
                        </p>
                        <p>
                          <b>Correo Eléctronico: </b>
                          <span v-if="processorAccountRequest.correoe"
                            ><a
                              :href="`email:${processorAccountRequest.correoe}`"
                              >{{ processorAccountRequest.correoe }}</a
                            ></span
                          >
                        </p>
                        <p>
                          <b>Telefono: </b
                          ><span v-if="processorAccountRequest.telefonos">{{
                            processorAccountRequest.telefonos
                          }}</span>
                        </p>
                        <p>
                          <b>Dirección: </b
                          ><span v-if="processorAccountRequest.direccion">{{
                            processorAccountRequest.direccion
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 text-center">
                    <router-link
                      :to="{ name: 'senasag.lista.solicitudes.tramitador' }"
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
</template>

<script>
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
// import MapReadField from "@/components/senasag-forms/form-fields/map-read-field.vue";
import Spinner from "@/components/widgets/spinner";
import ActionsDetail from "@/modules/senasag/components/solicitudes/tramitador/ActionsDetail.vue";
import {
  getCompanyRequestAccount,
  answerCompanyAccountRequest,
  resendEmailPassword,
} from "@/modules/senasag/services/SolicitudesService";
import { Modal } from "bootstrap";

import { userIsAdmin } from "@/services/user";
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
      processorAccountRequest: {},
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
          "Esta a punto de REENVIAR el email de configuración de contraseña ¿Desea confirmar?",
        buttonText: "Aceptar",
        buttonReject: "Cancelar",
      },
      userIsAdmin: userIsAdmin(),
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
  mounted() {
    this.loadProcessorAccountRequest();
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
    showResendEmailModal() {
      this.modal = new Modal(`#${this.confirmResendEmail.id}`);
      this.modal.show();
    },
    loadProcessorAccountRequest() {
      getCompanyRequestAccount(this.$route.params.id_solicitud_cuenta).then(
        ({ ok, data }) => {
          if (!ok)
            return NotificationHelper.error(
              null,
              "Error al cargar la solicitud de cuenta de empresa."
            );
          this.processorAccountRequest = data;
          this.loading = false;
        }
      );
    },
    // async methods
    approveCompany() {
      answerCompanyAccountRequest(this.$route.params.id_solicitud_cuenta, {
        estado: "APROBADO",
      }).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al aprobar solicitud.");
        NotificationHelper.success(null, "Solicitud aprobada exitosamente");
        this.loadProcessorAccountRequest();
      });
    },

    rejectAccountRequest() {
      answerCompanyAccountRequest(this.$route.params.id_solicitud_cuenta, {
        estado: "RECHAZADO",
      }).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al rechazar solicitud.");
        NotificationHelper.success(null, "Solicitud rechazada exitosamente");
        this.loadProcessorAccountRequest();
      });
    },
    resendEmail() {
      resendEmailPassword(this.$route.params.id_solicitud_cuenta).then(
        ({ ok }) => {
          if (!ok)
            return NotificationHelper.error(null, "Error al reenviar email.");
          NotificationHelper.success(null, "Email reenviado exitosamente");
          this.loadProcessorAccountRequest();
        }
      );
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
      if (sent === true) this.resendEmail();
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
