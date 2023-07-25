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
                        :branch-account-request="branchAccountRequest"
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
                      <h5 class="mb-3">DATOS DE LA EMPRESA</h5>
                      <div class="mb-2">
                        <p>
                          <b>Nombre de la empresa: </b>
                          {{ branchAccountRequest.fid_empresa?.razon_social }}
                        </p>
                        <p>
                          <b>Número de NIT: </b>
                          {{ branchAccountRequest.fid_empresa?.nit }}
                        </p>
                        <p>
                          <b>Dirección de la sucursal: </b>
                          {{ branchAccountRequest.direccion }}
                        </p>
                        <p>
                          <b>Correo electrónico de la empresa: </b>
                          {{ branchAccountRequest.fid_empresa?.correo }}
                        </p>
                        <p>
                          <b>Teléfono Sucursal: </b>
                          {{ branchAccountRequest.telefonos }}
                        </p>

                        <p>
                          <b>Página web: </b>
                          {{ branchAccountRequest.fid_empresa?.direccion_web }}
                        </p>
                        <p>
                          <b>Descripción de la actividad de la empresa: </b>
                          {{
                            branchAccountRequest.fid_empresa
                              ?.descripcionactividad
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-lg col-xxl">
                      <h5 class="mb-3">DATOS DEL REPRESENTANTE LEGAL</h5>
                      <div class="mb-2">
                        <p>
                          <b>Nombre del representante legal: </b>
                          <span
                            >{{
                              branchAccountRequest.fid_persona_propietario
                                ?.nombres
                            }}
                          </span>
                        </p>
                        <p>
                          <b>Apellidos del representante legal: </b>
                          <span
                            >{{
                              branchAccountRequest.fid_persona_propietario
                                ?.apellido_paterno
                            }}
                            {{
                              branchAccountRequest.fid_persona_propietario
                                ?.apellido_materno
                            }}</span
                          >
                        </p>

                        <p>
                          <b>Correo electrónico del representatnte: </b>
                          <span>{{
                            branchAccountRequest.fid_persona_propietario
                              ?.correoe
                          }}</span>
                        </p>

                        <p>
                          <b>Teléfono: </b>
                          <span>{{
                            branchAccountRequest.fid_persona_propietario
                              ?.telefonos
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg col-xxl">
                      <MapReadField
                        v-if="
                          branchAccountRequest.latitud &&
                          branchAccountRequest.longitud
                        "
                        :field="{
                          label: 'Ubicación',
                          type_field: 'map',
                          id: 'ubicacion',
                          value: `${branchAccountRequest.longitud},${branchAccountRequest.latitud}`,
                        }"
                      />
                    </div>
                  </div>
                  <div class="mt-4 text-center">
                    <router-link
                      :to="{ name: 'senasag.lista.solicitudes.sucursales' }"
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
import MapReadField from "@/components/senasag-forms/form-fields/map-read-field.vue";
import Spinner from "@/components/widgets/spinner";
import ActionsDetail from "@/modules/senasag/components/solicitudes/sucursal/ActionsDetail.vue";
import {
  answerBranchAccountRequest,
  getSucursalRequestAccount,
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
    MapReadField,
    Spinner,
    ActionsDetail,
  },
  data() {
    return {
      title: "Detalle Cuenta Sucursal",
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
      branchAccountRequest: {},
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
    this.loadBranchAccountRequest();
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
      this.modal = new Modal(`#${this.resendEmail.id}`);
      this.modal.show();
    },
    loadBranchAccountRequest() {
      getSucursalRequestAccount(this.$route.params.id_sucursal).then(
        ({ ok, data }) => {
          if (!ok)
            return NotificationHelper.error(
              null,
              "Error al cargar la solicitud de cuenta de sucursal."
            );
          this.branchAccountRequest = data;
          this.loading = false;
        }
      );
    },
    // async methods
    approveCompany() {
      answerBranchAccountRequest(
        this.$route.params.id_sucursal,
        "aprobar"
      ).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al aprobar solicitud.");
        NotificationHelper.success(null, "Solicitud aprobada exitosamente");
        this.loadBranchAccountRequest();
      });
    },

    rejectAccountRequest() {
      answerBranchAccountRequest(
        this.$route.params.id_sucursal,
        "rechazar"
      ).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al rechazar solicitud.");
        NotificationHelper.success(null, "Solicitud rechazada exitosamente");
        this.loadBranchAccountRequest();
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
