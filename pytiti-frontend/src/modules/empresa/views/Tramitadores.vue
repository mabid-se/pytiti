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
                :url="`empresa/${companyData.id}/tramitadores/`"
                :current-limit="25"
                :query-params="{ search, ordering }"
              >
                <template v-slot:title>
                  <h4 class="card-title mb-0 flex-grow-1">
                    {{ items[1].text }}
                  </h4>
                </template>
                <template v-slot:filters>
                  <div class="col-12">
                    <label class="form-label col-auto fw-bold"
                      >Buscar tramitador:
                    </label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Buscar tramitador"
                        aria-describedby="button-addon2"
                        placeholder="Escriba el número de documento de identidad"
                        v-model="carnet"
                      />
                      <button
                        class="btn btn-info"
                        type="button"
                        id="button-addon2"
                        :disabled="carnet.length == 0"
                        @click.prevent="onSubmit"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                  <div style="display: block" v-if="result">
                    <p><b>Resultado de la búsqueda:</b></p>
                    <div class="col-lg col-xxl" data-v-65a61d00="">
                      <h5 class="mb-3" data-v-65a61d00="">
                        DATOS DEL TRAMITADOR
                      </h5>
                      <div class="mb-2" data-v-65a61d00="">
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Nombre: </b>
                          <span data-v-65a61d00="">{{ result.nombres }}</span>
                        </p>
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Apellidos: </b>
                          <span data-v-65a61d00=""
                            >{{ result.apellido_paterno }}
                            {{ result.apellido_materno }}</span
                          >
                        </p>
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Documento de identidad: </b>
                          <span data-v-65a61d00="">{{ result.idcarnet }}</span>
                        </p>
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Dirección: </b>
                          <span data-v-65a61d00="">{{ result.direccion }}</span>
                        </p>
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Correo electrónico: </b>
                          <span data-v-65a61d00="">{{ result.correoe }}</span>
                        </p>
                        <p data-v-65a61d00="">
                          <b data-v-65a61d00="">Teléfono: </b>
                          <span data-v-65a61d00="">{{ result.telefonos }}</span>
                        </p>
                      </div>
                    </div>
                    <div v-if="errors.tramitador_id" class="error-validation">
                      <span>{{ errors.tramitador_id[0] }}</span>
                    </div>
                    <div class="col-12 btn_cen">
                      <b-button
                        variant="info"
                        class="btn-label waves-effect waves-light"
                        @click="attachProcessor"
                      >
                        <i
                          class="ri-check-double-line label-icon align-middle fs-16 me-2"
                        ></i>
                        Vincular tramitador</b-button
                      >
                    </div>
                  </div>
                  <hr />
                </template>

                <template v-slot:thead>
                  <tr>
                    <th
                      scope="col"
                      v-for="(item, index) in columns"
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
                    <td>
                      {{ item.idcarnet }}
                    </td>
                    <td>
                      {{ fullName(item) }}
                    </td>
                    <td>
                      {{ item.correoe }}<br />T.
                      {{ item.telefonos }}
                    </td>

                    <td>
                      <div class="list-grid-nav hstack gap-1">
                        <a
                          href="javascript:void(0);"
                          class="btn btn-info btn-label right"
                          id="dropdownMenuLink1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div class="d-flex">
                            <div class="flex-shrink-0">
                              <i
                                class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"
                              ></i>
                            </div>
                            <div class="flex-grow-1">Opciones</div>
                          </div>
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuLink1"
                          data-popper-placement="bottom-start"
                        >
                          <!-- <li>
                            <a
                              href="#"
                              class="dropdown-item"
                              data-bs-toogle="tooltip"
                              data-bs-original-title=""
                              title=""
                            >
                              Ver</a
                            >
                          </li> -->
                          <li>
                            <a
                              href="#"
                              class="dropdown-item"
                              data-bs-toogle="tooltip"
                              data-bs-original-title=""
                              title=""
                            >
                              Eliminar</a
                            >
                          </li>
                        </ul>
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

  <DeleteConfirmationModal
    @send-confirmation="confirmDelete"
    :attrs="deleteData"
  />
  <ApproveConfirmationModal
    @send-confirmation="confirmApprove"
    :attrs="approveData"
  />
</template>

<script>
import NotificationHelper from "@/helpers/notification";

// components
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import { userIsAdmin, userData } from "@/services/user";

import { searchProcessor } from "@/services/TramitadorService";

import KTable from "@/components/widgets/table";
// services
import { approveProcessorAccount } from "@/services/cuentas";

import { create } from "@/modules/empresa/services/SolicitudVincularTramitador";

export default {
  name: "ListaTramitadoresEmpresa",
  order: 5,
  components: {
    PageHeader,
    KTable,
    //
    DeleteConfirmationModal,
    ApproveConfirmationModal,
  },
  data() {
    return {
      title: "Listado de Tramitadores de la Empresa",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Tramitadores vinculados",
          active: true,
        },
      ],
      carnet: "",
      // vue-good-table
      columns: [
        {
          label: "Carnet",
          orderKey: "carnet",
          showOrderIcon: true,
        },
        {
          label: "Nombre y Apellido",
          orderKey: "fid_persona__nombres",
          showOrderIcon: true,
        },
        {
          label: "Contacto",
          orderKey: "fid_persona__correoe",
          showOrderIcon: true,
        },
        {
          label: "Acciones",
          showOrderIcon: false,
        },
      ],
      // modal-data
      deleteData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de eliminar este registro",
        buttonText: "Si, eliminar registro",
      },
      approveData: {
        id: "approveRecordModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      //
      selectedRequest: undefined,
      // userType: getUserType(),
      isReady: false,
      isAdmin: userIsAdmin(),
      search: "",
      ordering: undefined,
      companyData: userData(),
      result: null,
      errors: {},
    };
  },
  methods: {
    // load data
    loadProcessorAccounts() {
      if (userIsAdmin()) {
        return "cuenta/tramitadores/solicitudes/";
      } else {
        return `empresa/${this.userType}/tramitadores/`;
      }
    },
    // vue-good-table
    contactColumn(data) {
      return `${data.fid_persona.correoe}<br/>T. ${data.fid_persona.telefonos}`;
    },
    dateFormat(data) {
      let date = new Date(data.fid_persona.fecharegistro);
      return date.toLocaleDateString();
    },
    fullName(data) {
      return `${data.nombres} ${data.apellido_paterno} ${
        data.apellido_materno ?? ""
      }`;
    },
    // events
    approveAccountRequest() {
      approveProcessorAccount(this.selectedRequest).then(
        (res) => {
          if (res) {
            this.isReady = false;
            setTimeout(() => {
              this.isReady = true;
            }, 1000);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    selectProcessor({ id_solicitud_cuenta, estado }) {
      this.selectedRequest = id_solicitud_cuenta;
      sessionStorage.setItem(
        "solicitud_tramitador_seleccionado",
        JSON.stringify({
          id_solicitud_cuenta: id_solicitud_cuenta,
          estado: estado,
        })
      );
    },
    // emitted-events
    confirmApprove(data) {
      if (data.sent === true) {
        this.approveAccountRequest();
      }
    },
    confirmDelete({ sent }) {
      console.log(sent);
    },
    isApproved(item) {
      return item.esta_aprobado ? "APROBADO" : "NO_APROBADO";
    },
    async onSubmit() {
      this.result = null;
      this.errors = {};
      const { ok, errors, data } = await searchProcessor(this.carnet);
      if (!ok) {
        return NotificationHelper.error(null, errors.message, 10000);
      }
      this.result = data;
    },
    async attachProcessor() {
      this.errors = {};
      const { ok, errors } = await create(
        this.companyData.id,
        this.result.idpersona
      );
      if (!ok) {
        this.errors = errors.errors;
        return NotificationHelper.error(null, errors.message, 10000);
      }
      NotificationHelper.success(
        null,
        "Solicitud de vinculación creada exitosamente",
        10000
      );
      this.result = null;
      this.search = "";
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
