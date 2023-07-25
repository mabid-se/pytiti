<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg col-xxl">
        <div class="card card-mt">
          <div class="card-body">
            <div class="live-preview">
              <div class="table-responsive table-card">
                <KTable url="tramites/" :query-params="{ search, ordering }">
                  <template v-slot:title>
                    <h4 class="card-title mb-0 flex-grow-1">
                      {{ items[1].text }}
                    </h4>
                  </template>
                  <template v-slot:filters>
                    <label class="form-label col-auto fw-bold"
                      >Filtrar trámites por:</label
                    >
                    <div class="col-md-3">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        v-model="search"
                      />
                    </div>
                    <label class="form-label col-auto fw-bold">Áreas</label>
                    <div class="col-md-3">
                      <select id="area" class="form-select" v-model="search">
                        <option value="" selected disabled>Seleccionar</option>
                        <option value="IA">Inocuidad Alimentaria</option>
                        <option value="SV">Sanidad Vegetal</option>
                        <option value="SA">Sanidad Animal</option>
                      </select>
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
                            @click="toggleOrder(item.orderKey)"
                            class="las la-sort la-lg my-auto pointer"
                            v-if="item.showOrderIcon"
                          ></i>
                        </div>
                      </th>
                    </tr>
                  </template>
                  <template v-slot:row="{ item }">
                    <tr>
                      <td>{{ item.titulo }}</td>
                      <td>{{ item.descripcion }}</td>
                      <td>{{ item.unidad }}</td>
                      <td>
                        <div class="d-flex flex-wrap gap-2">
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
                                @click="selectProcedure(item.id)"
                                :href="`#${preRequest.id}`"
                                :data-bs-target="`#${preRequest.id}`"
                                class="dropdown-item"
                                data-bs-toggle="modal"
                                :to="`/tramites/previa/${item.id_solicitud_tramite}`"
                                v-b-tooltip.hover
                              >
                                Solicitar inicio de trámite
                              </a>
                            </li>
                            <li>
                              <router-link
                                class="dropdown-item"
                                :to="`/plantilla/previa/${item.plantilla_tramite}`"
                                v-b-tooltip.hover
                              >
                                Ver requisitos
                              </router-link>
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
    <Modal
      ref="modal"
      title=""
      @on:close:modal="closePresolicitudModal"
      v-if="!!selectedProcedure"
      :css-classes="{ 'modal-dialog-centered': true, 'modal-lg': true }"
    >
      <PreSolicitudModal
        :procedureId="selectedProcedure"
        :attrs="preRequest"
        @on:close:modal="closePresolicitudModal"
      />
    </Modal>
  </Layout>
</template>

<script>
// components
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import KTable from "@/components/widgets/table";
import PreSolicitudModal from "@/components/pytiti/tramites/pre-solicitud-modal.vue";
// services
import {
  // getProceduresList,
  asignationProcedure,
} from "@/services/tramites";
import { getUserType } from "@/services/user";
import Modal from "@/components/widgets/modal";

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
    PreSolicitudModal,
    Modal,
  },
  data() {
    return {
      title: "Listado de trámites para iniciar pre-solicitud",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Lista de trámites",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Nombre trámite",
          orderKey: "titulo",
          showOrderIcon: true,
        },
        {
          label: "Descripción",
          orderKey: "descripcion",
          showOrderIcon: true,
        },
        {
          label: "Área",
          orderKey: "unidad",
          showOrderIcon: true,
        },
        {
          label: "Acciones",
          showOrderIcon: false,
        },
      ],
      rows: [],
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
      preRequest: {
        id: "preRequestModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      //
      selectedProcedure: undefined,
      userType: getUserType(),
      search: "",
      ordering: undefined,
      currentPreSolicitudModal: null,
    };
  },
  methods: {
    // vue-good-table
    dateFormat(data) {
      let date = new Date(data.fid_persona.fecharegistro);
      return date.toLocaleDateString();
    },
    fullName(data) {
      return `${data.fid_persona.nombres} ${data.fid_persona.apellido_paterno} ${data.fid_persona.apellido_materno}`;
    },
    // events
    asignProcedure() {
      asignationProcedure(
        { idempadronamiento: 11 },
        this.selectedProcedure
      ).then(
        (res) => {
          console.log(res);
          this.$forceUpdate();
          //window.location.href = this.$route.path;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    selectProcedure(procedureId) {
      this.selectedProcedure = procedureId;
      // this.$nextTick(() => {
      //   try{
      //   this.currentPreSolicitudModal = new Modal(`#${this.preRequest.id}`,{
      //     keyboard: false
      //   });
      //   }catch(e) {
      //     console.log(e);
      //   }
      //   this.currentPreSolicitudModal.show();
      // });
    },
    // emitted-events
    confirmApprove(data) {
      if (data.sent === true) {
        this.asignProcedure();
      }
    },
    confirmDelete(data) {
      console.log(data);
    },
    toggleOrder(order) {
      if (order.includes("-")) {
        this.ordering = order.slice(1);
      } else {
        this.ordering = "-" + order;
      }
    },
    closePresolicitudModal() {
      this.$refs.modal.closeModal(false);
      this.selectedProcedure = null;
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
