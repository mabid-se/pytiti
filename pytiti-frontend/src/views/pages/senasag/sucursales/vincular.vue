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
                    <div class="live-preview enviar">
                      <div>
                        <!-- center modal -->
                        <button
                          type="button"
                          class="btn btn-primary btn-label waves-effect waves-light"
                          data-bs-toggle="modal"
                          data-bs-target=".bs-example-modal-center"
                        >
                          <i
                            class="ri-add-line label-icon align-middle fs-16 me-2"
                          ></i>
                          Vincular seleccionados
                        </button>

                        <div
                          class="modal fade bs-example-modal-center"
                          tabindex="-1"
                          aria-labelledby="mySmallModalLabel"
                          aria-hidden="true"
                          style="display: none"
                        >
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-body text-center p-5">
                                <lord-icon
                                  src="https://cdn.lordicon.com/hrqwmuhr.json"
                                  trigger="loop"
                                  colors="primary:#121331,secondary:#08a88a"
                                  style="width: 120px; height: 120px"
                                >
                                </lord-icon>
                                <div class="mt-4">
                                  <h4 class="mb-3">Confirmación!</h4>
                                  <p class="text-muted mb-4">
                                    Confirma que desea vincular las sucursales a
                                    su empresa.
                                  </p>
                                  <div
                                    class="hstack gap-2 justify-content-center"
                                  >
                                    <button
                                      type="button"
                                      class="btn btn-light"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancelar
                                    </button>
                                    <a
                                      href="javascript:void(0);"
                                      class="btn btn-danger"
                                      >Aceptar</a
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- /.modal-content -->
                          </div>
                          <!-- /.modal-dialog -->
                        </div>
                        <!-- /.modal -->
                      </div>
                    </div>

                    <h4 class="card-title mb-0 flex-grow-1">
                      {{ items[1].text }}
                    </h4>
                  </template>
                  <template v-slot:filters>
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
                        <div class="form-check form-check-success mb-3">
                          <input
                            class="form-check-input mr-1"
                            type="checkbox"
                            id="formCheck8"
                          />
                          <label class="form-check-label" for="formCheck8">
                            Seleccionar
                          </label>
                        </div>
                      </td>
                      <td>{{ fullName(item) }}</td>
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
      title: "Sucursales",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Listado de sucursales de la Empresa",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Seleccionar",
          orderKey: "field_fecha_creacion",
          showOrderIcon: true,
        },
        {
          label: "Nombre de la Sucursal",
          orderKey: "fid_persona__nombres",
          showOrderIcon: true,
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
