<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <KTable url="tramites/" :query-params="queryParams">
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
                    <select id="area" class="form-select" v-model="unit">
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
                            <router-link
                              class="dropdown-item"
                              :to="{
                                name: 'empresa.plantilla.vistaPrevia',
                                params: {
                                  slug: item.plantilla_tramite,
                                },
                              }"
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
</template>

<script>
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import KTable from "@/components/widgets/table";

export default {
  name: "TramitesListaEmpresa",
  order: 5,
  components: {
    PageHeader,
    KTable,
    DeleteConfirmationModal,
    ApproveConfirmationModal,
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
      preRequest: {
        id: "preRequestModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      search: "",
      ordering: null,
      unit: "",
    };
  },
  methods: {
    toggleOrder(order) {
      if (order.includes("-")) {
        this.ordering = order.slice(1);
      } else {
        this.ordering = "-" + order;
      }
    },
  },
  computed: {
    queryParams() {
      return {
        unidad: this.unit,
        search: this.search,
        ordering: this.ordering,
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
