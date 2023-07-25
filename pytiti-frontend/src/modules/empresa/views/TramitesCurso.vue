<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <KTable
                :url="loadOnCourseProcedures"
                :current-limit="5"
                :query-params="queryParams"
              >
                <template v-slot:title>
                  <div class="enviar">
                    <router-link
                      class="btn btn-info btn-label me-2"
                      :to="{
                        name: 'empresa.lista.tramites',
                      }"
                      ><div class="d-flex">
                        <div class="flex-shrink-0">
                          <i
                            class="ri-file-text-line label-icon align-middle fs-16 me-2"
                          ></i>
                        </div>
                        <div class="flex-grow-1">Trámites y requisitos</div>
                      </div>
                    </router-link>
                    <button
                      class="btn btn-success btn-label waves-effect waves-light"
                      role="button"
                      @click="openPrerequestModal()"
                    >
                      <i
                        class="ri-add-line label-icon align-middle fs-16 me-2"
                      ></i>
                      Nuevo trámite
                    </button>
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
                    <StatusSelect v-model="status"></StatusSelect>
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
                    <td>{{ formatDateDMYYYYHHmm(item.iniciotramite) }}</td>
                    <td>{{ item.fid_tramite?.descripcion }}</td>

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
                      <div class="list-grid-nav hstack gap-1">
                        <a
                          v-if="item.estado === 'EN_CURSO'"
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
                          <li>
                            <router-link
                              class="dropdown-item"
                              :to="{
                                name: 'empresa.editar.tramites.curso',
                                params: {
                                  slug: item.id_solicitud_tramite,
                                },
                              }"
                              v-b-tooltip.hover
                            >
                              <span v-if="item.estado === 'EN_CURSO'">
                                Ingresar
                              </span>
                              <span v-if="item.estado === 'ENVIADO'">
                                Ver
                              </span>
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
  <Modal
    id-modal="aqgcfidf"
    ref="modal"
    title=""
    @on:close:modal="closePresolicitudModal"
    v-if="modals.preRequest"
    :css-classes="{ 'modal-dialog-centered': true, 'modal-lg': true }"
  >
    <PreSolicitudModal
      :processors="processors"
      :branches="branches"
      :attrs="preRequest"
      @on:close:modal="closePresolicitudModal"
      :id-modal="`#aqgcfidf .modal-content`"
    />
  </Modal>
</template>

<script>
// components
import PageHeader from "@/components/page-header";
import KTable from "@/components/widgets/table";
import StatusSelect from "@/components/solicitud-tramite/StatusSelect.vue";
// services
import { getUserType } from "@/services/user";
import { userData } from "@/services/user";
import formatDatesMixin from "@/mixins/formatDatesMixin";
import { mapGetters } from "vuex";
import Modal from "@/components/widgets/modal";
import PreSolicitudModal from "@/modules/empresa/components/modals/tramite/PreSolicitud.vue";

import { getBranches } from "@/modules/empresa/services/BranchService";
import { getProcessors } from "@/modules/empresa/services/ProcessorService";

export default {
  name: "ListaTramitesCurso",
  order: 5,
  mixins: [formatDatesMixin],
  components: {
    PageHeader,
    KTable,
    StatusSelect,
    PreSolicitudModal,
    Modal,
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
      selectedRequest: undefined,
      search: "",
      ordering: "-iniciotramite",
      companyData: userData(),
      status: "",
      modals: {
        preRequest: false,
      },
    };
  },
  computed: {
    loadOnCourseProcedures() {
      return `empresa/${this.companyData.id}/tramites/`;
    },
    queryParams() {
      const data = {
        ordering: this.ordering,
        search: this.search,
      };
      if (this.status != "") data["estado"] = this.status;
      return data;
    },
    ...mapGetters("authfack", ["user"]),
  },
  methods: {
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
    dateFormat(data) {
      let date = new Date(data.iniciotramite);
      return date.toLocaleDateString();
    },
    // events
    selectProcedure({ id_solicitud_cuenta }) {
      this.selectedRequest = id_solicitud_cuenta;
    },
    // emitted-events
    async openPrerequestModal(procedureId) {
      Promise.all([
        getBranches(this.user.data.id),
        getProcessors(this.user.data.id),
      ]).then(([{ ok: ok2, data: data2 }, { ok: ok3, data: data3 }]) => {
        if (!ok2 || !ok3)
          return NotificationHelper.error("Errores al cargar la trámite");
        this.branches = data2.results;
        this.processors = data3.results;
        this.modals.preRequest = true;
      });
    },

    closePresolicitudModal() {
      this.$refs.modal.closeModal(false);
      this.modals.preRequest = false;
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
