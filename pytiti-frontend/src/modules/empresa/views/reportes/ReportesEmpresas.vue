<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <h4 class="card-title mb-0 flex-grow-1">Reporte de Empresas</h4>

              <div class="mt-4 mb-2">
                <div class="row">
                  <div class="col-4">
                    <label class="form-label text-muted">IDPadron</label>
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="status"
                    >
                      <option value="">Seleccione la opción 1</option>
                      <option value="">Seleccione la opción 2</option>
                      <option value="">Seleccione la opción 3</option>
                    </select>
                  </div>
                  <div class="col-8">
                    <label class="form-label text-muted">Area Tecnica</label>
                    <select
                      name="ariaTecnica"
                      id="ariaTecnica"
                      class="form-select"
                      v-model="areaSelected"
                    >
                      <option disabled>Select an Area</option>
                      <option
                        v-for="(name, index) in computedArea"
                        :key="index"
                        :value="name.area"
                      >
                        {{ name.nombre }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="row">
                  <div class="col-8">
                    <label class="form-label text-muted">Servicio</label>
                    <select
                      name="losServicios"
                      id="losServicios"
                      class="form-select"
                      v-model="servicesSelected"
                    >
                      <option disabled selected>Select a Service</option>
                      <option
                        v-for="(serviceName, index) in computedServices"
                        :value="serviceName.fid_servicio"
                        :key="index"
                      >
                        {{ serviceName.titulo }}
                      </option>
                    </select>
                  </div>
                  <div class="col-4">
                    <label class="form-label text-muted">Rubro</label>
                    <select
                      name="losRubros"
                      id="losRubros"
                      class="form-select"
                      v-model="rubroSelected"
                    >
                      <option
                        v-for="(rubroItem, index) in computedRubro"
                        :key="index"
                        :value="rubroItem.nombrerubro"
                      >
                        {{ rubroItem.nombrerubro }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="row">
                  <div class="col-8">
                    <label class="form-label text-muted">Estado</label>
                    <select
                      name="losEstados"
                      id="losEstados"
                      class="form-select"
                      v-model="estadoSelected"
                    >
                      <option
                        v-for="(estadoItem, index) in computedEstado"
                        :key="index"
                        :value="estadoItem.estado"
                      >
                        {{ estadoItem.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-4">
                    <label class="form-label text-muted">Distrital</label>
                    <select
                      name="distrital"
                      id="distrital"
                      class="form-select"
                      v-model="distritalSelected"
                    >
                      <option
                        v-for="(distralItem, index) in computedDistrital"
                        :key="index"
                        :value="distralItem.iddistrital"
                      >
                        {{ distralItem.nombredistrital }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mt-4 mb-2">
                <h5 class="fw-bold">Fecha:</h5>

                <div class="row mb-2">
                  <div class="col-3">
                    <div class="col">
                      <div>
                        <label class="form-label text-muted">Desde</label>
                      </div>
                      <div>
                        <flatPickr
                          v-model="dateStart"
                          id="desdeDate"
                          placeholder="dd/mm/aa"
                          name="desdeDate"
                          class="form-control flatpickr-input"
                        >
                          <i class="ri-calendar-line"></i>
                        </flatPickr>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="col">
                      <div>
                        <label class="form-label text-muted">Hasta</label>
                      </div>
                      <div>
                        <flatPickr
                          v-model="dateStart"
                          id="hastaDate"
                          placeholder="dd/mm/aa"
                          name="hastaDate"
                          class="form-control flatpickr-input"
                        >
                        </flatPickr>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row d-flex">
                  <div :style="{ textAlign: `right` }">
                    <button
                      class="btn btn-success waves-effect waves-light"
                      @click="onGenerateReport"
                    >
                      Generar reporte
                      <i
                        class="ri-file-chart-line label-icon align-middle fs-18 px-1 push-right"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-body">
          <div class="live-preview">
            <KTable
              v-if="isReady"
              url="empresa/pre-solicitudes"
              :current-limit="25"
              :query-params="queryParams"
            >
              <template v-slot:title>
                <div class="row">
                  <div class="col-7">
                    <h4 class="card-title mt-2 flex-grow-1 text-muted">
                      Tabla de resultados
                    </h4>
                  </div>
                  <div class="col-5">
                    <div class="row">
                      <div class="col-6" :style="{ textAlign: `right` }">
                        <button
                          class="btn waves-effect waves-light"
                          :style="{
                            color: `#1DA99C`,
                            backgroundColor: `#E5F6F5`,
                            border: `none`,
                          }"
                        >
                          Imprimir Reporte
                          <i
                            class="ri-printer-line label-icon align-middle fs-18 px-1 me-2 push-right"
                          ></i>
                        </button>
                      </div>
                      <div class="col-6" :style="{ textAlign: `right` }">
                        <button
                          class="btn waves-effect waves-light"
                          :style="{
                            color: `#1DA99C`,
                            backgroundColor: `#E5F6F5`,
                            border: `none`,
                          }"
                        >
                          Descargar Excel
                          <i
                            class="ri-file-excel-line label-icon align-middle fs-18 px-1 me-2 push-right"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-slot:filters>
                <div class="mt-3">
                  <div
                    :style="{
                      maxWidth: `fit-content`,
                      height: `fit-content`,
                      maxHeight: `70vh`,
                      overflowX: `scroll`,
                      overflowY: `scroll`,
                    }"
                  >
                    <table
                      class="table table-striped"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr class="table-success">
                          <th :is="headData.type" v-for="item in genReportes">
                            {{ item }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          :is="recordsData"
                          v-for="(data, index) in recordsData"
                          :key="index"
                          :class="{
                            'table-info': index % 2 === 0,
                            'table-success': index % 2 === 1,
                          }"
                        >
                          <th
                            :is="data.type"
                            v-for="(record, index) in data"
                            :item="record"
                            :index="index"
                            :key="record.id"
                          >
                            {{ record }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>
            </KTable>
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { getToken } from "../../../../services/token";
import axios from "axios";

import KTable from "@/components/widgets/table";

export default {
  name: "TramitesPresolicitadosEmpresa",
  mixins: [formatDatesMixin],
  order: 5,
  components: {
    PageHeader,
    KTable,
    flatPickr,
  },
  data() {
    return {
      title: "Reportes",

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
      headData: [
        "Distrital",
        "No. Padron",
        "R. S.",
        "Razon Social",
        "Provincia",
        "Municipio",
        "Localidad",
        "Direccion",
        "Telefonos",
        "Correo Electronico",
        "R. S.",
        "Razon Social",
        "Provincia",
        "Municipio",
        "Localidad",
        "Direccion",
        "Telefonos",
        "Correo Electronico",
      ],
      recordsData: [
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
        [
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
          "Dato",
          "Bajo Pamahasi C5 Num6",
          "79675379",
          "correo@correo.com",
          "Andres Ramirez",
          "Pablo Urquieta",
          "Dato",
          "Dato",
          "15485945",
          "ALYSAL Alimentosy Salud SRL",
          "Dato",
          "Murillo",
        ],
      ],

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      // helpers
      isReady: false,
      search: "",
      ordering: "-fecha_solicitud",
      status: "",
      areaSelected: null,
      area: [],
      servicesSelected: null,
      services: [],
      rubroSelected: null,
      rubro: [],
      estadoSelected: null,
      estado: [],
      distritalSelected: null,
      distrital: [],
      idPadronSelected: null,
      idPadron: "01-0008",
      genReportesSelected: null,
      genReportes: [],
    };
  },
  computed: {
    computedArea() {
      return this.area;
    },
    computedServices() {
      return this.services;
    },
    computedRubro() {
      return this.rubro;
    },
    computedEstado() {
      return this.estado;
    },
    computedDistrital() {
      return this.distrital;
    },
    computedIsPadron() {
      return this.isPadron;
    },
    computedGenReportes() {
      return this.genReportes;
    },
  },
  methods: {
    thisisReady: true,
    async calledArea() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/select-options/areas-tecnicas/`;

      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          this.area = res.data;
        });
    },
    async onChangeArea() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/select-options/tramites/?area=${this.area}`;

      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          this.services = res.data;
        });
    },

    async onChangeServicio() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/select-options/rubros/?servicio=${this.services}`;

      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          this.rubro = res.data;
        });
    },

    async calledEstado() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/select-options/estados-reportes/`;

      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          this.estado = res.data;
        });
    },

    async calledDistrital() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/select-options/distritales/`;

      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          this.distrital = res.data;
          console.log(res);
        });
    },

    async calledGenReprt() {
      const url = `https://pytiti.thiswebsite.info/proxy-bk/api/v1//admin/solicitud-tramite/reporte-empresas/csv/?idpadron=01-0008?area=${this.area}?${this.services}?${this.rubro}?${this.estado}?${this.distrital}`;
      console.log("api hit");
      axios
        .get(url, {
          headers: this.headers,
        })
        .then((res) => {
          console.log(res);
          this.genReportes = res.data;
        });
      console.log("report: ", JSON.parse(this.genReportes));
    },

    onGenerateReport() {
      this.calledGenReprt();
    },

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
    // this.calledArea();
    // this.onChangeArea();
    // this.onChangeServicio();
    // this.calledEstado();
    // this.calledDistrital();
  },

  created() {
    this.calledArea();
    this.onChangeArea();
    this.onChangeServicio();
    this.calledEstado();
    this.calledDistrital();
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
