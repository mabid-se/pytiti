<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row margin-contenido">
      <div class="col-lg col-xxl">
        <div class="card">
          <div class="card-body">
            <div class="live-preview">
              <div class="table-responsive table-card">
                <KTable
                  v-if="isReady"
                  :url="`cuenta/empresas/solicitudes/${orderString}`"
                  :current-limit="5"
                  :query-params="{
                    search,
                    ordering,
                  }"
                >
                  <template v-slot:title>
                    <h4 class="card-title mb-0 flex-grow-1">
                      Lista Solicitud Registro de Sucursales
                    </h4>
                  </template>
                  <template v-slot:filters>
                    <label class="form-label col-auto fw-bold">Buscar:</label>
                    <div class="col-md-3">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        @input="searchCoincidence"
                        placeholder=""
                      />
                    </div>
                    <label class="form-label col-auto fw-bold">Estado:</label>
                    <div class="col-md-3">
                      <select
                        name="estado"
                        id="estado"
                        class="form-select"
                        @click="searchCoincidence"
                      >
                        <option value="" disabled selected>
                          Seleccionar estado
                        </option>
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
                        <span
                          :title="item.id_solicitud_cuenta"
                          v-b-tooltip.hover
                        >
                          {{ dateFormat(item) }}
                        </span>
                      </td>
                      <td>
                        <h5 class="fs-14 mb-1">
                          <span class="text-dark">{{
                            item.fid_empresa.razonsocial
                          }}</span>
                        </h5>
                        <p class="text-muted mb-0">
                          Actividad :
                          <span class="fw-medium">{{
                            item.fid_empresa.descripcionactividad
                          }}</span>
                        </p>
                      </td>
                      <td>
                        <span
                          class="fw-normal fs-9"
                          :class="stateClassAccount(item)"
                        >
                          <i
                            :class="
                              stateIconAccount(item) + ' fs-9 align-middle'
                            "
                          ></i>
                          {{ item.estado }}
                        </span>
                      </td>
                      <td>{{ companyRepresentative(item) }}</td>
                      <td>
                        <a :href="`mailto:${item.fid_empresa.correoe}`">
                          {{ item.fid_empresa.correoe }} </a
                        ><br />
                        T. {{ item.fid_empresa.telefonos }}<br />C.
                        {{ item.fid_empresa.celular }}
                      </td>
                      <td>
                        <div class="d-flex flex-wrap gap-2">
                          <AccionesLista
                            v-if="userIsAdmin"
                            @send-action="selectCompany"
                            :itemData="item"
                            :approveModal="approveData"
                            :rejectModal="rejectData"
                            :extraModal="confirmResendEmail"
                          >
                            <template #verDetalle>
                              <router-link
                                class="dropdown-item"
                                :to="`/empresa/${item.fid_empresa.idempresa}`"
                                @click="selectCompany(item)"
                              >
                                <!-- <i class="bx bx-list-ul" style="font-size: 20px"></i> -->
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
  </Layout>
</template>

<script>
// components
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import AccionesLista from "@/components/tramites/acciones/acciones-lista.vue";

import KTable from "@/components/widgets/table";
// services
import {
  approveEnterpriseAccout,
  approveResendEmail,
  rejectUserAccount,
} from "@/services/cuentas";
import { userIsAdmin } from "@/services/user";

export default {
  name: "ListaSucursales",
  order: 5,
  components: {
    Layout,
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
      title: "Listado de Solicitudes de Registro Sucursal",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Lista Solicitud Registro Sucursales",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        { label: "Fecha", order_key: "fecha_solicitud" },
        { label: "Empresa / Actividad", order_key: "fid_empresa__razonsocial" }, // label name is more accurate than below
        //{ label: 'Empresa / Persona natural' },
        //{ label: 'Actividad de la empresa' },
        { label: "Estado", order_key: "estado" },
        {
          label: "Representante Legal",
          order_key: "fid_empresa__fid_persona_propietario__nombres",
        },
        { label: "Contacto", order_key: "" },
        { label: "Acciones", order_key: "" },
      ],
      // modal-data
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
      //
      selectedRequest: undefined,
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
      userIsAdmin: userIsAdmin(),
      search: "",
      ordering: undefined,
      orderString: "",
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
    dateFormat(data) {
      let date = new Date(data.fid_empresa.fecharegistro);
      return date.toLocaleDateString();
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
    //
    searchCoincidence(e) {
      this.orderString = "";
      this.search = e.target.value;
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
