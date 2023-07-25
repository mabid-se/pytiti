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
                  :url="loadOnCourseProcedures"
                  :current-limit="5"
                  :query-params="{
                    search,
                    ordering,
                  }"
                >
                  <template v-slot:title>
                    <div class="enviar">
                      <a
                        href="/tramites/"
                        class="btn btn-success btn-label waves-effect waves-light"
                        role="button"
                      >
                        <i
                          class="ri-add-line label-icon align-middle fs-16 me-2"
                        ></i>
                        Nuevo trámite</a
                      >
                    </div>
                    <h4 class="card-title mb-0 flex-grow-1">
                      {{ items[1].text }}
                    </h4>
                  </template>
                  <template v-slot:filters>
                    <label class="form-label col-auto fw-bold"
                      >Buscar trámite:</label
                    >
                    <div class="col-4">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        v-model="search"
                        placeholder="Buscar..."
                      />
                    </div>
                    <label class="form-label col-auto fw-bold"> Estado: </label>
                    <div class="col-4">
                      <select
                        name="estado"
                        id="estado"
                        class="form-select"
                        v-model="search"
                      >
                        <option value="" selected>Todos</option>
                        <option value="EN_CURSO">En curso</option>
                        <option value="EN_CURSO">Concluidos</option>
                        <option value="ENVIADO">Pendientes</option>
                        <option value="EN_CURSO">Rechazados</option>
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
                            v-if="item.showOrderIcon"
                            @click="ordering = item.orderKey"
                            class="las la-sort la-lg my-auto pointer"
                          ></i>
                        </div>
                      </th>
                    </tr>
                  </template>
                  <template v-slot:row="{ item }">
                    <tr>
                      <td>{{ dateFormat(item) }}</td>
                      <td>{{ item.fid_tramite.descripcion }}</td>

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
                      <!--td>{{ item.fid_empresa.correoe }}<br/>T. {{ item.fid_empresa.telefonos }}</td-->
                      <td>
                        <div class="list-grid-nav hstack gap-1">
                          <a
                            href="javascript:void(0);"
                            class="btn btn-info btn-label right"
                            id="dropdownMenuLink1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-v-3b9a351b=""
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
                            <li v-if="item.estado === 'ENVIADO'">
                              <router-link
                                class="dropdown-item"
                                :to="{
                                  name: 'tramite-plantilla-leer',
                                  params: {
                                    slug: item.id_solicitud_tramite,
                                  },
                                }"
                                v-b-tooltip.hover
                              >
                                Ver
                              </router-link>
                            </li>
                            <li v-if="item.estado === 'EN_CURSO'">
                              <router-link
                                class="dropdown-item"
                                :to="{
                                  name: 'tramite-plantilla-editar',
                                  params: {
                                    slug: item.id_solicitud_tramite,
                                  },
                                }"
                                v-b-tooltip.hover
                              >
                                Ingresar
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
import { approveEnterpriseAccout } from "@/services/cuentas";
import { getUserType, userIsCompany } from "@/services/user";

export default {
  name: "ListaTramitesCurso",
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
      title: "Mis trámites",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Listado de Trámites",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Fecha Inicio",
          field: this.dateFormat,
          orderKey: "iniciotramite",
          showOrderIcon: true,
        },
        {
          label: "Nombre Trámite",
          field: "fid_empresa.razonsocial",
          orderKey: "fid_tramite__titulo",
          showOrderIcon: true,
        },
        {
          label: "Estado",
          field: "",
          orderKey: "",
          showOrderIcon: true,
        },
        {
          label: "Acciones",
          field: "fid_empresa",
          showOrderIcon: false,
        },
      ],
      userType: getUserType(),
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
      //
      selectedRequest: undefined,
      search: "",
      ordering: undefined,
    };
  },
  computed: {
    loadOnCourseProcedures() {
      if (userIsCompany()) {
        return `empresa/${this.userType}/tramites/`;
      }
      return `persona/${this.userType}/tramites/`;
    },
  },
  methods: {
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
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
    selectProcedure({ id_solicitud_cuenta }) {
      this.selectedRequest = id_solicitud_cuenta;
    },
    // emitted-events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveCompany();
      }
    },
    confirmDelete(data) {
      console.log(data);
    },
  },
  mounted() {
    //
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
