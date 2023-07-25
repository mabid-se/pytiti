<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg col-xxl margin-cont">
        <div class="card">
          <div class="card-body">
            <div class="live-preview">
              <div class="table-responsive table-card">
                <KTable
                  v-if="isReady"
                  :url="loadProcessorAccounts()"
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
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Escriba su IdPadron"
                          placeholder="Escriba su IdPadron"
                        />
                        <button class="btn btn-primary" type="button">
                          Buscar
                        </button>
                      </div>
                      <div id="passwordHelpBlock" class="form-text">
                        Puede visitar:
                        <a href="https://senasag.gob.bo/padron" target="_new"
                          >senasag.gob.bo/padron</a
                        >
                      </div>
                    </div>
                    <div style="display: block">
                      <p><b>Resultado de la búsqueda:</b></p>
                      <div class="col-lg col-xxl" data-v-65a61d00="">
                        <h5 class="mb-3" data-v-65a61d00="">
                          DATOS DEL TRAMITE
                        </h5>
                        <div class="mb-2" data-v-65a61d00="">
                          <p data-v-65a61d00="">
                            <b data-v-65a61d00="">Código de servicio: </b>
                            <span data-v-65a61d00="">54</span>
                          </p>
                          <p data-v-65a61d00="">
                            <b data-v-65a61d00="">Trámite: </b>
                            <span data-v-65a61d00=""
                              >Registro sanitario de empresas del rubro
                              alimenticio (Procesadoras de alimentos, cámaras
                              frigoríficas, cámaras de maduración de productos
                              vegetales y empresas fraccionadoras de alimentos y
                              bebidas) Categoría artesanal</span
                            >
                          </p>
                        </div>
                      </div>
                      <div class="col-12 btn_cen">
                        <b-button
                          variant="info"
                          class="btn-label waves-effect waves-light"
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
                      <td>{{ dateFormat(item) }}</td>
                      <td>54</td>
                      <td>Trámite</td>
                      <td>
                        <span
                          :class="
                            'fw-normal fs-9 badge ' +
                            [item.esta_aprobado ? 'bg-success' : 'bg-danger']
                          "
                        >
                          <i
                            :class="
                              [
                                item.esta_aprobado
                                  ? 'ri-check-line'
                                  : 'ri-close-line',
                              ] + ' fs-9 align-middle'
                            "
                          ></i>
                          {{ isApproved(item) }}
                        </span>
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
                            <li>
                              <a
                                href="#"
                                class="dropdown-item"
                                data-bs-toogle="tooltip"
                                data-bs-original-title=""
                                title=""
                              >
                                Ver</a
                              >
                            </li>
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
  </Layout>
</template>

<script>
// components
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";

import KTable from "@/components/widgets/table";
// services
import { approveProcessorAccount } from "@/services/cuentas";
import { getUserType, userIsAdmin } from "@/services/user";

export default {
  name: "ListaTramitadores",
  order: 5,
  components: {
    Layout,
    PageHeader,
    KTable,
    //
    DeleteConfirmationModal,
    ApproveConfirmationModal,
  },
  data() {
    return {
      title: "Vinculación de trámites",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Trámites",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Fecha",
          orderKey: "field_fecha_creacion",
          showOrderIcon: true,
        },
        {
          label: "Código de servicio",
          orderKey: "fid_persona__nombres",
          showOrderIcon: true,
        },
        {
          label: "Trámite",
          orderKey: "fid_persona__correoe",
          showOrderIcon: true,
        },
        {
          label: "Estado",
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
      userType: getUserType(),
      isReady: false,
      isAdmin: userIsAdmin(),
      search: "",
      ordering: undefined,
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
      return `${data.fid_persona.nombres} ${data.fid_persona.apellido_paterno} ${data.fid_persona.apellido_materno}`;
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
