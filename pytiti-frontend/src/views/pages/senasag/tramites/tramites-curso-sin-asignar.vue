<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg col-xxl">
        <div class="card">
          <div class="card-body">
            <div class="live-preview">
              <div class="table-responsive table-card mt-3 mb-1">
                <KTable
                  :url="`tramites/${userType}/iniciados/sin-asignar/`"
                  :current-limit="5"
                >
                  <template v-slot:title>
                    <h4 class="card-title mb-0 flex-grow-1">
                      Lista Solicitud Registro Empresas
                    </h4>
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
                          }}<i class="las la-sort la-lg my-auto pointer"></i>
                        </div>
                      </th>
                    </tr>
                  </template>
                  <template v-slot:row="{ item }">
                    <tr>
                      <td>{{ dateFormat(item) }}</td>
                      <td>{{ item.fid_empresa.razonsocial }}</td>
                      <td>{{ item.fid_empresa.descripcionactividad }}</td>
                      <td>
                        {{ item.fid_empresa.correoe }}<br />T.
                        {{ item.fid_empresa.telefonos }}
                      </td>
                      <td>
                        <div class="d-flex flex-wrap gap-2">
                          <router-link
                            class="btn btn-success btn-icon"
                            :to="`/empresa/${item.fid_empresa.idempresa}`"
                            v-b-tooltip.hover
                            title="Ver"
                          >
                            <i
                              class="bx bx-list-ul"
                              style="font-size: 20px"
                            ></i>
                          </router-link>
                          <a
                            @click="selectProcedure(item.id_solicitud_cuenta)"
                            href="#approveRecordModal"
                            class="btn btn-success btn-icon"
                            data-bs-toggle="modal"
                            data-bs-target="#approveRecordModal"
                            v-b-tooltip.hover
                            title="Aprobar"
                          >
                            <i
                              class="ri-user-add-line"
                              style="font-size: 20px"
                            ></i>
                          </a>
                          <a
                            @click="selectProcedure(item.id_solicitud_cuenta)"
                            class="btn btn-danger btn-icon"
                            href="#deleteRecordModal"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteRecordModal"
                            v-b-tooltip.hover
                            title="Rechazar"
                          >
                            <i class="bx bx-x" style="font-size: 20px"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </template>
                </KTable>
                <!--<vue-good-table
                                :columns="columns"
                                :rows="rows">
                                    <template #table-row="props">
                                        <span v-if="props.column.field === 'fid_empresa'">
                                            <div class="d-flex flex-wrap gap-2">
                                                <router-link 
                                                class="btn btn-success"
                                                :to="`/empresa/${props.formattedRow.fid_empresa.idempresa}`" 
                                                v-b-tooltip.hover 
                                                title="Ver">
                                                    <i class="bx bx-list-ul" style="font-size: 20px"></i>
                                                </router-link>
                                                <a 
                                                @click="selectCompany(props.row.id_solicitud_cuenta)" 
                                                href="#approveRecordModal" 
                                                class="btn btn-success" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#approveRecordModal" 
                                                v-b-tooltip.hover
                                                title="Aprobar">
                                                    <i class="ri-user-add-line" style="font-size: 20px"></i>
                                                </a>
                                                <a 
                                                @click="selectCompany(props.row.id_solicitud_cuenta)" 
                                                class="btn btn-danger" 
                                                href="#deleteRecordModal" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#deleteRecordModal" 
                                                v-b-tooltip.hover
                                                title="Rechazar">
                                                    <i class="bx bx-x" style="font-size: 20px"></i>
                                                </a>
                                            </div>
                                        </span>
                                    </template>
                                </vue-good-table>-->
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
import { getUnasignedCompanyProcedures } from "@/services/tramites";
import { approveEnterpriseAccout } from "@/services/cuentas";
import { getUserType } from "@/services/user";

export default {
  name: "ListaTramitesCursoNoAsignados",
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
      title: "Listado de Trámites en Curso (sin asignar)",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Lista Trámites en Curso Sin Asignar a Tramitador",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Fecha Inicio",
          field: this.dateFormat,
        },
        {
          label: "Nombre Trámite",
          field: "fid_empresa.razonsocial",
        },
        {
          label: "Objetivo",
          field: "fid_empresa.descripcionactividad",
        },
        {
          label: "Contacto",
          field: this.contactColumn,
          html: true,
        },
        {
          label: "Acciones",
          field: "fid_empresa",
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
      userType: getUserType(),
      //
      selectedRequest: undefined,
    };
  },
  methods: {
    // load data
    loadStartedProcedures() {
      getUnasignedCompanyProcedures().then(
        (res) => {
          this.rows = res;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    // vue-good-table
    contactColumn(data) {
      return `${data.fid_empresa.correoe}<br/>T. ${data.fid_empresa.telefonos}`;
    },
    dateFormat(data) {
      let date = new Date(data.iniciotramite);
      return date.toLocaleDateString();
    },
    // events
    approveCompany() {
      approveEnterpriseAccout(this.selectedRequest).then(
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
    selectCompany(requestId) {
      console.log(requestId);
      this.selectedRequest = requestId;
    },
    // emitted-events
    confirmApprove(data) {
      if (data.sent === true) {
        this.approveCompany();
      }
    },
    confirmDelete(data) {
      console.log(data);
    },
  },
  mounted() {
    //this.loadStartedProcedures();
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
