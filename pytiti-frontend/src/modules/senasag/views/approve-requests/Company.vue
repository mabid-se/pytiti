<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <KTable
                v-if="isReady"
                :url="`cuenta/empresas/solicitudes/`"
                :current-limit="5"
                :query-params="queryParams"
              >
                <template v-slot:title>
                  <h4 class="card-title mb-0 flex-grow-1">
                    Lista Solicitud Registro Empresas/Personas naturales
                  </h4>
                </template>
                <template v-slot:filters>
                  <label class="form-label col-auto fw-bold"
                    >Filtrar solicitud empresa por:</label
                  >
                  <div class="col-md-3">
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      placeholder=""
                      v-model="search"
                    />
                  </div>
                  <label class="form-label col-auto fw-bold">Estado:</label>
                  <div class="col-md-3">
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="status"
                    >
                      <option value="" selected>MOSTRAR TODO</option>
                      <option value="APROBADO">APROBADO</option>
                      <option value="RECHAZADO">RECHAZADO</option>
                      <option value="SOLICITADO">SOLICITADO</option>
                      <option value="ACTIVADO">ACTIVADO</option>
                    </select>
                  </div>

                  <hr />
                </template>

                <!--Table head-->
                <template v-slot:thead>
                  <tr>
                    <th
                      scope="col"
                      v-for="(item, index) in columns"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between">
                        {{ item.label }}
                        <i
                          v-if="item.show_icon"
                          @click="selectOrderField(item.order_key)"
                          class="las la-sort la-lg my-auto pointer"
                        ></i>
                      </div>
                    </th>
                  </tr>
                </template>
                <!--Table body-->
                <template v-slot:row="{ item }">
                  <tr>
                    <td>
                      <span :title="item.fecha_solicitud" v-b-tooltip.hover>
                        {{ formatDateDMYYYYHHmm(item.fecha_solicitud) }}
                      </span>
                    </td>
                    <td>
                      <h5 class="fs-14 mb-1">
                        <span class="text-dark">{{
                          item.emp_razonsocial
                        }}</span>
                      </h5>
                      <p class="text-muted mb-0">
                        Actividad :
                        <span class="fw-medium">{{
                          item.emp_descripcionactividad
                        }}</span>
                      </p>
                    </td>
                    <td>
                      {{ item.emp_iddistrital }}
                    </td>
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
                    <td>
                      {{ item.per_nombres }}
                      {{ item.per_apellido_paterno }}
                      {{ item.per_apellido_materno }}
                    </td>
                    <td>
                      <a :href="`mailto:${item.emp_correoe}`">
                        {{ item.emp_correoe }} </a
                      ><br />
                      <span v-if="item.emp_telefonos">
                        T. {{ item.emp_telefonos }}<br />
                      </span>
                      <span v-if="item.emp_celular">
                        C. {{ item.emp_celular }}</span
                      >
                    </td>
                    <td>{{ type[item.tipo_solicitud] }}</td>
                    <td>
                      <div class="d-flex flex-wrap gap-2">
                        <!-- v-if="userIsAdmin" -->
                        <AccionesLista
                          @send-action="selectCompany"
                          :itemData="item"
                          :approveModal="approveData"
                          :rejectModal="rejectData"
                          :extraModal="confirmResendEmail"
                        >
                          <template #verDetalle>
                            <router-link
                              class="dropdown-item"
                              :to="{
                                name: 'senasag.detalle.solicitudes.empresas',
                                params: {
                                  id_solicitud_cuenta: item.id_solicitud_cuenta,
                                },
                              }"
                            >
                              Ver Detalle
                            </router-link>
                          </template>
                        </AccionesLista>
                      </div>
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
// components
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import AccionesLista from "@/modules/senasag/components/solicitudes/company/ActionsList.vue";
import formatDatesMixin from "@/mixins/formatDatesMixin";

import KTable from "@/components/widgets/table";
// services
import {
  approveEnterpriseAccout,
  approveResendEmail,
  rejectUserAccount,
} from "@/services/cuentas";
import { userIsAdmin } from "@/services/user";

export default {
  name: "ListaEmpresas",
  mixins: [formatDatesMixin],
  order: 5,
  components: {
    PageHeader,
    KTable,
    //
    DeleteConfirmationModal,
    ApproveConfirmationModal,
    EmailConfirmationModal,
    AccionesLista,
  },
  data() {
    return {
      title: "Listado de Solicitudes de Registro Empresa",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Lista Solicitud Registro Empresas/Sucursales",
          active: true,
        },
      ],
      columns: [
        { label: "Fecha", order_key: "fecha_solicitud", show_icon: false },
        {
          label: "Empresa / Actividad",
          order_key: "fid_empresa__razonsocial",
          show_icon: false,
        },
        {
          label: "Distrital",
          show_icon: false,
        },
        { label: "Estado", order_key: "estado", show_icon: false },
        {
          label: "Representante Legal",
          order_key: "fid_empresa__fid_persona_propietario__nombres",
          show_icon: false,
        },
        { label: "Contacto", order_key: "", show_icon: false },
        { label: "Tipo", order_key: "", show_icon: false },
        { label: "Acciones", order_key: "", show_icon: false },
      ],
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
      selectedRequest: undefined,
      isReady: false,
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
      type: {
        E: "Empresa",
        P: "Persona",
      },
      userIsAdmin: userIsAdmin(),
      search: "",
      ordering: "-field_fecha_creacion",
      status: "",
    };
  },
  methods: {
    companyRepresentative(item) {
      let data = item.fid_empresa.fid_persona_propietario;
      return data === null
        ? "No tiene representante"
        : `${data.nombres} ${data.apellido_paterno} ${data.apellido_materno}`;
    },
    // helpers
    contactColumn(data) {
      return `${data.fid_empresa.correoe}<br/>T. ${data.fid_empresa.telefonos}`;
    },
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
    // events
    approveCompany() {
      approveEnterpriseAccout(this.selectedRequest).then(
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
    resendEmail() {
      approveResendEmail(this.selectedRequest).then(
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
    rejectAccountRequest() {
      rejectUserAccount(this.selectedRequest).then(
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
            this.successAttrs.title = "Solicitud rechazada";
            this.successAttrs.message =
              "Su solicitud ha sido rechazada correctamente.";
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
    selectCompany({ id_solicitud_cuenta, estado }) {
      this.selectedRequest = id_solicitud_cuenta;
      sessionStorage.setItem(
        "solicitud_empresa_seleccionada",
        JSON.stringify({
          id_solicitud_cuenta: id_solicitud_cuenta,
          estado: estado,
        })
      );
    },
    selectOrderField(field) {
      this.orderString = "ordenados";
      this.ordering = field;
    },
    // emitted-events
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
  mounted() {
    this.isReady = true;
  },
  computed: {
    queryParams() {
      return {
        search: this.search,
        ordering: this.ordering,
        estado: this.status,
      };
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
