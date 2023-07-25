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
                :url="`empresa/${companyData.id}/sucursales/`"
                :current-limit="5"
                :query-params="queryParams"
              >
                <template v-slot:title>
                  <div class="enviar">
                    <router-link
                      :to="{ name: 'empresa.lista.sucursales.create' }"
                      class="btn btn-success btn-label waves-effect waves-light"
                    >
                      <i
                        class="ri-add-line label-icon align-middle fs-16 me-2"
                      ></i>
                      Nueva Sucursal</router-link
                    >
                  </div>
                  <h4 class="card-title mb-0 flex-grow-1">
                    Lista de Sucursales
                  </h4>
                </template>
                <template v-slot:filters>
                  <label class="form-label col-auto fw-bold">Estado:</label>
                  <div class="col-md-3">
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="status"
                    >
                      <option value="">MOSTRAR TODO</option>
                      <option value="SOLICITUDES">SOLICITUDES</option>
                      <option value="SUCURSALES">SUCURSALES</option>
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
                      <span :title="item.fecharegistro" v-b-tooltip.hover>
                        {{
                          item.fecha_solicitud
                            ? formatDateDMYYYYHHmm(item.fecha_solicitud)
                            : ""
                        }}
                      </span>
                    </td>
                    <td>
                      <h5 class="fs-14 mb-1">
                        <span class="text-dark">{{
                          companyData.razon_social
                        }}</span>
                      </h5>
                      <p class="text-muted mb-0">
                        Actividad :
                        <span class="fw-medium">{{
                          companyData.descripcionactividad
                        }}</span>
                      </p>
                    </td>

                    <td>
                      <span
                        class="fw-normal fs-9"
                        :class="
                          stateClassAccount({ estado: item.estado_solicitud })
                        "
                      >
                        <i
                          :class="stateIconAccount(item) + ' fs-9 align-middle'"
                        ></i>
                        {{ item.estado_solicitud }}
                      </span>
                    </td>
                    <td>
                      {{ item.nombre_sucursal }}
                    </td>
                    <td>
                      {{ item.fid_persona_propietario?.nombres }}
                      {{ item.fid_persona_propietario?.apellido_paterno }}
                      {{ item.fid_persona_propietario?.apellido_materno }}
                      <br />
                      <a
                        :href="`mailto:${item.fid_persona_propietario?.correoe}`"
                        v-if="item.fid_persona_propietario?.correoe"
                      >
                        C. {{ item.fid_persona_propietario?.correoe }} </a
                      ><br />
                      <span v-if="item.fid_persona_propietario?.telefonos">
                        T. {{ item.fid_persona_propietario?.telefonos }}<br />
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
import formatDatesMixin from "@/mixins/formatDatesMixin";
import KTable from "@/components/widgets/table";
import {
  approveEnterpriseAccout,
  approveResendEmail,
  rejectUserAccount,
} from "@/services/cuentas";
import { userIsAdmin, userData } from "@/services/user";

export default {
  name: "ListaSucursales",
  order: 5,
  mixins: [formatDatesMixin],
  components: {
    PageHeader,
    KTable,
  },

  data() {
    return {
      title: "Listado de Sucursales y Solicitudes de Registro de Sucursal",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Lista solicitud y registro de Sucursales",
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
        { label: "Estado", order_key: "estado", show_icon: false },
        {
          label: "Nombre sucursal",
          order_key: "fid_empresa__fid_persona_propietario__nombres",
          show_icon: false,
        },
        { label: "Contacto", order_key: "", show_icon: false },
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
      userIsAdmin: userIsAdmin(),
      ordering: undefined,
      // status: "SUCURSALES",
      status: "",
      companyData: userData(),
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
    dateFormat(d) {
      let date = new Date(d);
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
  },
  mounted() {
    this.isReady = true;
  },
  computed: {
    queryParams() {
      const queryParams = {
        ordering: "nombre_sucursal",
        active: "true",
      };

      if (this.status === "SUCURSALES") queryParams["sucursales"] = "true";
      if (this.status === "SOLICITUDES") queryParams["solicitudes"] = "true";

      return queryParams;
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
