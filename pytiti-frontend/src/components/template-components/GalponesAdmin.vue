<template>
  <Spinner :loading="loading">
    <div class="card">
      <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">Galpones</h4>
      </div>
      <div class="card-body">
        <div class="live-preview">
          <div class="row gy-4">
            <div class="col-sm-12 col-lg-12 col-xxl-12">
              <div class="col-12">
                <div class="table-responsive mt-4 mt-xl-0">
                  <table
                    class="table table-success table-striped table-nowrap- align-middle mb-0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">LatLng</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in results" :key="row.id">
                        <td class="fw-medium">{{ row.numero }}</td>
                        <td>{{ row.direccion }}</td>
                        <td>{{ row.latitud }} {{ row.longitud }}</td>
                        <td>
                          <div class="hstack gap-3 flex-wrap">
                            <a
                              class="link-success fs-15"
                              @click.prevent="setCurrentDeposit(row)"
                              ><i class="mdi mdi-arrow-expand-all mdi-24px"></i
                            ></a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-12">
                <div
                  ref="verDatos"
                  title="Galpón"
                  v-if="modals.verDatos && currentDeposit"
                  @on:close:modal="closeModal('verDatos')"
                  :css-classes="{
                    'modal-dialog-centered': true,
                    'modal-lg': true,
                  }"
                  :show-header="true"
                >
                  <div class="my-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Número:</strong></p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.numero }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Capacidad:</strong></p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.capacidad }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Dirección:</strong></p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.direccion }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0">
                        <strong>Denominativo:</strong>
                      </p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.denominativo }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0">
                        <strong>Titularidad:</strong>
                      </p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.titularidad }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Teléfono:</strong></p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.telefono }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Ciudad:</strong></p>
                      <p class="text-muted mb-0">
                        {{ currentDeposit.ciudad }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Distrital:</strong></p>
                      <p class="text-muted mb-0">
                        {{ city?.nombre }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Provincia:</strong></p>
                      <p class="text-muted mb-0">
                        {{ province?.nombre }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <p class="text-muted mb-0"><strong>Municipio:</strong></p>
                      <p class="text-muted mb-0">
                        {{ town?.nombre }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="flex-grow-1 ms-2">
                      <MapFormField :field="field" ref="map" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Spinner>
</template>

<script>
import { mapState } from "vuex";

import MapFormField from "@/components/form-fields/map-form-field.vue";

import NotificationHelper from "@/helpers/notification";
import Spinner from "@/components/widgets/spinner.vue";

import { getGridData } from "@/modules/empresa/services/PlantillaService";
export default {
  components: {
    Spinner,
    MapFormField,
  },
  props: {
    requestProcedure: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      results: [],
      currentDeposit: null,
      modals: {
        verDatos: false,
      },
    };
  },
  async mounted() {
    const { ok: ok3, data: res3 } = await getGridData(
      this.requestProcedure.id_solicitud_tramite,
      this.requestProcedure.fid_empresa.id,
      "galpones"
    );
    if (!ok3) return NotificationHelper.error("Error al cargar el componente.");
    this.results = res3.results;
    this.loading = false;
  },
  methods: {
    closeModal(nameModal) {
      this.$refs[nameModal].closeModal(false);
      this.modals[nameModal] = false;
      this.currentDeposit = null;
    },
    setCurrentDeposit(deposit) {
      this.currentDeposit = deposit;
      this.modals.verDatos = true;
      this.$nextTick(() => {
        console.log(this.$refs.map.view.value);
      });
    },
  },
  computed: {
    field() {
      return {
        id: 6660,
        entity_field: {
          id: 118,
          created_at: "2022-11-16 08:06:42Z",
          updated_at: "2022-11-16 08:06:42Z",
          deleted_at: "2022-11-16 08:06:42Z",
          name: "latitud,longitud",
          help_detail: null,
          example_file: null,
          type: "COLUMN",
          type_column: "varchar",
          download_example: null,
          entity: 6,
          user_created: 1,
          user_updated: null,
          user_deleted: null,
        },
        created_at: "2022-12-01 03:48:56Z",
        updated_at: "2022-12-01 03:48:56Z",
        deleted_at: "2022-12-01 03:48:56Z",
        name: "latitud,longitud",
        title:
          "Seleccione con el cursor el punto en el mapa donde se encuentra ubicada la empresa",
        type: "text",
        col: null,
        placeholder: "",
        type_field: "map",
        class_field: null,
        required: false,
        hidden: false,
        read_only: true,
        label: "Ubicación geografica",
        options: null,
        max_length: null,
        min_length: null,
        api: null,
        order: 6,
        dependency: null,
        user_created: 1,
        user_updated: null,
        user_deleted: null,
        value: `${this.currentDeposit.longitud},${this.currentDeposit.latitud}`,
      };
    },
    ...mapState("tablasBase", ["cities", "provinces", "towns"]),
    city() {
      return this.currentDeposit
        ? this.cities.find((c) => c.id == this.currentDeposit.iddistrital)
        : null;
    },
    province() {
      return this.currentDeposit
        ? this.provinces.find(
            (p) =>
              p.distrital_id == this.city.id &&
              p.id.replaceAll(" ", "") == this.currentDeposit.idprovincia
          )
        : null;
    },
    town() {
      return this.currentDeposit
        ? this.towns.find(
            (p) =>
              p.distrital_id == this.city.id &&
              p.provincia_id == this.province.id &&
              p.id.replaceAll(" ", "") == this.currentDeposit.idmunicipio
          )
        : null;
    },
  },
};
</script>
