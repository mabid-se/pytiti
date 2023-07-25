<template>
  <PageHeader :title="title" :items="items" />
  <div class="row">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <KTable
                v-if="isReady"
                url="tramitador/pre-solicitudes"
                :current-limit="25"
                :query-params="{ search, ordering }"
              >
                <template v-slot:title>
                  <h4 class="card-title mb-0 flex-grow-1">
                    Lista Pre-Solicitud de Trámites
                  </h4>
                </template>
                <template v-slot:filters>
                  <label class="form-label col-auto fw-bold"
                    >Filtrar pre-solicitud de trámites por:</label
                  >
                  <div class="col-md-3">
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      v-model="search"
                    />
                  </div>
                  <label class="form-label col-auto fw-bold">Estado:</label>
                  <div class="col-md-3">
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="search"
                    >
                      <option value="" disabled selected>
                        Seleccionar estado
                      </option>
                      <option value="APROBADO">APROBADO</option>
                      <option value="RECHAZADO">RECHAZADO</option>
                      <option value="SOLICITADO">SOLICITADO</option>
                    </select>
                  </div>
                  <hr />
                </template>
                <template v-slot:thead>
                  <tr v-if="userIsAdmin">
                    <th
                      scope="col"
                      v-for="(item, index) in columns"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between">
                        {{ item.label }}
                        <i
                          @click="ordering = item.orderKey"
                          class="las la-sort la-lg my-auto pointer"
                          v-if="item.showOrderIcon"
                        ></i>
                      </div>
                    </th>
                  </tr>
                  <tr v-if="userIsCompany || userIsPerson">
                    <th
                      scope="col"
                      v-for="(item, index) in unprivilegedColumns"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between">
                        {{ item.label
                        }}<i
                          @click="ordering = item.orderKey"
                          class="las la-sort la-lg my-auto pointer"
                          v-if="item.showOrderIcon"
                        ></i>
                      </div>
                    </th>
                  </tr>
                </template>
                <template v-slot:row="{ item }">
                  <tr>
                    <td>{{ formatDateMDYYYY(item.fecha_solicitud) }}</td>
                    <td>
                      <div class="fw-bold text-muted">
                        {{ accountType(item) }}:
                      </div>
                      <div>
                        {{ userAccount(item) }}
                      </div>
                    </td>
                    <td>{{ item.objetivo_tramite }}</td>
                    <td>
                      <span
                        class="fw-normal fs-9"
                        :class="stateClassAccount(item)"
                      >
                        <i
                          :class="stateIconAccount(item) + ' fs-9 align-middle'"
                        ></i>
                        {{ item.estado }}
                      </span>
                    </td>
                  </tr>
                </template>
              </KTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EmailConfirmationModal
    @send-confirmation="confirmResend"
    :attrs="confirmChangeProcedure"
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
// components
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import formatDatesMixin from "@/mixins/formatDatesMixin";

import KTable from "@/components/widgets/table";
// services
import {
  approveRequestedProcedure,
  rejectRequestedProcedure,
  changeRequestedProcedure,
} from "@/services/tramites";

import { getUserType, userIsAdmin, userIsCompany } from "@/services/user";

export default {
  name: "TramitesPresolicitadosTramitador",
  mixins: [formatDatesMixin],
  order: 5,
  components: {
    PageHeader,
    KTable,
    DeleteConfirmationModal,
    ApproveConfirmationModal,
    EmailConfirmationModal,
  },
  data() {
    return {
      title: "Listado de Trámites Pre-Solicitados",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Lista trámites pre-solicitados",
          active: true,
        },
      ],
      columns: [
        {
          label: "Fecha solicitud",
          orderKey: "fecha_solicitud",
          showOrderIcon: true,
        },
        {
          label: "Encargado",
          orderKey: "tramitador__fid_persona__nombres",
          showOrderIcon: true,
        },
        {
          label: "Objetivo",
          orderKey: "objetivo_tramite",
          showOrderIcon: true,
        },
        {
          label: "Estado",
          orderKey: "estado",
          showOrderIcon: true,
        },
      ],
      // modal-data
      rejectData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de rechazar éste trámite",
        buttonText: "Sí, rechazar trámite",
      },
      approveData: {
        id: "approveRecordModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud de trámite. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      confirmChangeProcedure: {
        id: "confirmChangeProcedure",
        title: "Atención",
        message:
          "Esta a punto de CAMBIAR esta solicitud de trámite. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
        buttonReject: "Cancelar",
      },
      // helpers
      selectedRequest: undefined,
      procedureId: undefined,
      userType: getUserType(),
      userIsAdmin: userIsAdmin(),
      userIsCompany: userIsCompany(),
      isReady: false,
      // errors
      hasFailed: false,
      hasSucceed: false,
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
      search: "",
      ordering: undefined,
    };
  },
  computed: {
    loadProceduresUrl() {
      return "lista-pre-solicitudes";
    },
    unprivilegedColumns() {
      return this.columns.filter((item) => item.label !== "Tipo");
    },
  },
  methods: {
    userAccount(item) {
      return item.empresa?.razon_social;
    },
    dateFormat(data) {
      let date = new Date(data.fecha_solicitud);
      return date.toLocaleDateString();
    },
    fullName(data) {
      return `${data.fid_persona.nombres} ${data.fid_persona.apellido_paterno} ${data.fid_persona.apellido_paterno}`;
    },
    accountType({ tipo }) {
      let types = {
        E: "Empresa",
        P: "Persona",
      };
      return types[tipo];
    },
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
    // events
    approveRequest() {
      approveRequestedProcedure(this.selectedRequest).then(
        (res) => {
          if (res.error) {
            this.isReady = false;
            this.errorAttrs.title = "Error para aceptar solicitud";
            this.errorAttrs.message =
              "Ocurrió un error al aprobar la solicitud";
            this.errorAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          } else {
            this.isReady = false;
            this.successAttrs.title = "Solicitud aceptada";
            this.successAttrs.message =
              "Su solicitud ha sido aceptada correctamente.";
            this.successAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          }
        },
        (err) => {
          this.hasFailed = false;
          if (err) {
            this.hasFailed = true;
          }
        }
      );
    },
    rejectProcedure() {
      rejectRequestedProcedure(this.selectedRequest).then(
        (res) => {
          if (res.error) {
            this.isReady = false;
            this.errorAttrs.title = "Error para reenviar solicitud";
            this.errorAttrs.message =
              "Ocurrió un error al reenviar la solicitud";
            this.errorAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          } else {
            this.isReady = false;
            this.successAttrs.title = "Reenvío de solicitud aceptada";
            this.successAttrs.message =
              "Su reenvío de solicitud ha sido aceptada correctamente.";
            this.successAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          }
        },
        (err) => {
          this.hasFailed = false;
          if (err) {
            this.hasFailed = true;
          }
        }
      );
    },
    changeProcedure() {
      changeRequestedProcedure(this.selectedRequest, this.procedureId).then(
        (res) => {
          if (res.error) {
            this.isReady = false;
            this.errorAttrs.title = "Error para rechazar solicitud";
            this.errorAttrs.message =
              "Ocurrió un error al rechazar la solicitud";
            this.errorAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          } else {
            this.isReady = false;
            this.successAttrs.title = "Solicitud cambiada";
            this.successAttrs.message =
              "Su solicitud ha sido cambiada correctamente.";
            this.successAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          }
        },
        (err) => {
          this.hasFailed = false;
          if (err) {
            this.hasFailed = true;
          }
        }
      );
    },
    selectPreRequest({ id_pre_solicitud, tramite, estado }) {
      this.selectedRequest = id_pre_solicitud;
      this.procedureId = tramite;
      sessionStorage.setItem(
        "solicitud_tramitador_seleccionado",
        JSON.stringify({
          id_pre_solicitud: id_pre_solicitud,
          tramite: tramite,
          estado: estado,
        })
      );
    },
    // emitted-events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveRequest();
      }
    },
    confirmReject({ sent }) {
      if (sent === true) {
        this.rejectProcedure();
      }
    },
    confirmResend({ sent }) {
      if (sent === true) {
        this.changeProcedure();
      }
    },
    changeMessageState({ show }) {
      this.successAttrs.show = show;
      this.errorAttrs.show = show;
    },
  },
  mounted() {
    this.isReady = true;
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
