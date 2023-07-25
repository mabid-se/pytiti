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
                url="empresa/pre-solicitudes"
                :current-limit="25"
                :query-params="queryParams"
              >
                <template v-slot:title>
                  <h4 class="card-title mb-0 flex-grow-1">
                    Lista Pre-Solicitud de Trámites
                  </h4>
                </template>
                <template v-slot:filters>
                  <label class="form-label col-auto fw-bold"
                    >Filtrar pre-solicitud de trámites por:</label
                  >
                  <div class="col-md-3">
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      v-model="search"
                    />
                  </div>
                  <label class="form-label col-auto fw-bold">Estado:</label>
                  <div class="col-md-3">
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="status"
                    >
                      <option value="" selected>MOSTRAR TODO</option>
                      <option value="APROBADO">APROBADO</option>
                      <option value="RECHAZADO">RECHAZADO</option>
                      <option value="SOLICITADO">SOLICITADO</option>
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
                          @click="changeOrdering(item.orderKey)"
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
                      {{ formatDateDMYYYYHHmm(item.fecha_solicitud) }}
                    </td>
                    <td>
                      <div class="fw-bold text-muted">
                        {{ accountType(item) }}:
                      </div>
                      <div>
                        {{ userAccount(item) }}
                      </div>
                    </td>
                    <td>{{ item.objetivo_tramite }}</td>
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
// components
import PageHeader from "@/components/page-header";
import formatDatesMixin from "@/mixins/formatDatesMixin";

import KTable from "@/components/widgets/table";

export default {
  name: "TramitesPresolicitadosEmpresa",
  mixins: [formatDatesMixin],
  order: 5,
  components: {
    PageHeader,
    KTable,
  },
  data() {
    return {
      title: "Listado de Trámites Pre-Solicitados",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Lista trámites pre-solicitados",
          active: true,
        },
      ],
      columns: [
        {
          label: "Fecha solicitud",
          orderKey: "fecha_solicitud",
          showOrderIcon: true,
        },
        {
          label: "Encargado",
          orderKey: "empresa__razon_social,",
          showOrderIcon: true,
        },
        {
          label: "Objetivo",
          orderKey: "objetivo_tramite",
          showOrderIcon: true,
        },
        {
          label: "Estado",
          orderKey: "estado",
          showOrderIcon: true,
        },
      ],
      // helpers
      isReady: false,
      search: "",
      ordering: "-fecha_solicitud",
      status: "",
    };
  },
  computed: {
    queryParams() {
      const queryParams = {
        search: this.search,
        ordering: this.ordering,
      };
      if (this.status) {
        queryParams["estado"] = this.status;
      }
      return queryParams;
    },
  },
  methods: {
    userAccount(item) {
      return item.empresa?.razon_social;
    },
    dateFormat(data) {
      let date = new Date(data.fecha_solicitud);
      return date.toLocaleDateString();
    },
    fullName(data) {
      return `${data.fid_persona.nombres} ${data.fid_persona.apellido_paterno} ${data.fid_persona.apellido_paterno}`;
    },
    accountType({ tipo }) {
      let types = {
        E: "Empresa",
        P: "Persona",
      };
      return types[tipo];
    },
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
    changeOrdering(value) {
      this.ordering = `${!this.ordering.startsWith("-") ? "-" : ""}${value}`;
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
