<template>
  <div class="row">
    <div class="col-lg col-xxl">
      <div class="card" v-show="!isInAdvancedMode">
        <div class="card-header">
          <div class="d-flex flex-row align-items-center flex-wrap">
            <h4 class="card-title mb-0 pb-1 px-3">Buscar trámite</h4>
            <div class="w-50 input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Nombre o descripción del trámite"
                v-model="data.title"
              />
              <button
                class="btn btn-success icon-content"
                type="button"
                style="padding: 0px 8px 0px 8px"
              >
                <i class="mdi mdi-magnify search-widget-icon mr-0"></i>
              </button>
            </div>
            <div class="d-flex flex-grow-1 justify-content-end icon-content">
              <i class="mdi mdi-filter-outline primary mr-0"></i>
              <p style="margin-top: 8px" @click="isInAdvancedMode = true">
                Búsqueda avanzada
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-show="isInAdvancedMode && !loading">
        <div class="card-header">
          <h4 class="card-title mb-0 flex-grow-1">Buscar trámite</h4>
        </div>
        <!-- end card header -->
        <div class="card-body row">
          <div class="col-lg-4">
            <label for="name" class="form-label"
              >Nombre o descripción del trámite</label
            >
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="data.title"
            />
          </div>

          <div class="col-lg-2">
            <label for="service" class="form-label">Código de servicio</label>
            <select class="form-select" id="service" v-model="data.codeService">
              <option value=""></option>
              <option
                :value="cs"
                v-for="(cs, index) in codigosServicio"
                :key="`cs_option.${index}`"
              >
                {{ cs }}
              </option>
            </select>
          </div>

          <div class="col-lg-2">
            <label for="area" class="form-label">Área</label>
            <select
              class="form-select"
              id="area"
              name="area"
              v-model="data.area"
            >
              <option value=""></option>
              <option
                :value="area.id_unidad"
                v-for="(area, index) in areas"
                :key="`area.${index}`"
              >
                {{ area.nombre }}
              </option>
            </select>
          </div>

          <div class="col-lg-2">
            <label for="validity" class="form-label">Vigencia</label>
            <select
              class="form-select"
              id="validity"
              name="validity"
              v-model="data.validity"
            >
              <option value="all">Todos</option>
              <option value="vigente">Vigente</option>
              <option value="no-vigente">No vigente</option>
            </select>
          </div>

          <div class="col-lg-2 d-flex">
            <button class="mt-auto btn-right-text primary btn--hover-icon mb-0">
              <i class="mdi mdi-magnify search-widget-icon mr-0"></i>

              <span class="text">Buscar</span>
            </button>
          </div>
        </div>
        <!-- end card-body -->
      </div>

      <KCard>
        <template v-slot:title>
          <h4 class="card-title mb-0 flex-grow-1">
            Proceso de creación de trámites
          </h4>

          <router-link
            :to="{ name: 'creador-tramites-crear' }"
            class="btn-right-text primary btn--hover-icon"
          >
            <i class="mdi mdi-plus"></i>
            <span class="text">Nuevo</span></router-link
          >
        </template>
        <KTable
          url="admin-tramites/"
          :current-limit="10"
          keyPage="pagina"
          keyPageSize="por-pagina"
          :query-params="queryParams"
        >
          <template v-slot:title>
            <h4 class="card-title mb-0 flex-grow-1">Lista de trámites</h4>
          </template>

          <template v-slot:thead>
            <tr>
              <th scope="col">
                <div class="d-flex justify-content-between">
                  Nombre del trámite
                  <i
                    class="las la-sort la-lg my-auto pointer"
                    @click="sortByField('titulo')"
                  ></i>
                </div>
              </th>
              <th scope="col">
                <div class="d-flex justify-content-between">
                  Descripción
                  <i
                    class="las la-sort la-lg my-auto pointer"
                    @click="sortByField('descripcion')"
                  ></i>
                </div>
              </th>
              <th scope="col">
                <div
                  class="d-flex justify-content-between"
                  @click="sortByField('fid_servicio')"
                >
                  Servicio
                  <i class="las la-sort la-lg my-auto pointer"></i>
                </div>
              </th>
              <th scope="col">
                <div
                  class="d-flex justify-content-between"
                  @click="sortByField('fid_unidad')"
                >
                  Área <i class="las la-sort la-lg my-auto pointer"></i>
                </div>
              </th>
              <th scope="col">
                <div
                  class="d-flex justify-content-between"
                  @click="sortByField('vigencia')"
                >
                  Vigencia
                  <i class="las la-sort la-lg my-auto pointer"></i>
                </div>
              </th>
              <th scope="col">
                <div
                  class="d-flex justify-content-between"
                  @click="sortByField('fecha_creacion')"
                >
                  Fecha
                  <i class="las la-sort la-lg my-auto pointer"></i>
                </div>
              </th>
              <th scope="col">
                <div class="d-flex justify-content-between">Acciones</div>
              </th>
            </tr>
          </template>
          <template v-slot:row="{ item }">
            <tr>
              <td>
                {{ item.titulo }}
              </td>
              <td>
                {{ item.descripcion }}
              </td>
              <td>{{ item.fid_servicio }}</td>
              <td>{{ item.fid_unidad }}</td>
              <td>{{ item.anio_vigencia || "-" }}</td>
              <td>{{ item.fecha_creacion }}</td>
              <td>
                <div class="container-buttons">
                  <button class="btn-hover primary btn--hover-icon">
                    <i class="mdi mdi-plus-box-multiple-outline"></i>
                    <span>Clonar</span>
                  </button>

                  <button
                    class="btn-hover primary btn--hover-icon"
                    @click="
                      $router.push({
                        name: 'creador-tramites-show',
                        params: { idTramite: item.id },
                      })
                    "
                  >
                    <i class="mdi mdi-cog-outline"></i>
                    <span>Editar</span>
                  </button>

                  <button class="btn-hover danger btn--hover-icon">
                    <i class="mdi mdi-trash-can-outline"></i>
                    <span>Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </KTable>
      </KCard>
    </div>
  </div>
</template>

<script>
// import Layout from "@/layouts/main.vue";
// import PageHeader from "@/components/page-header";
// import TramiteForm from "@/components/tramites/forms/tramite-form.vue";

import KCard from "@/components/widgets/card";
import KTable from "@/components/widgets/table";

import NotificationHelper from "@/helpers/notification";

import { getAreas } from "@/services/creador-tramites/areas";
import { getRubros } from "@/services/creador-tramites/rubros";

export default {
  name: "TramitesListado",
  components: {
    KCard,
    KTable,
  },
  data() {
    return {
      isInAdvancedMode: false,
      data: {
        title: "",
        codeService: "",
        area: "",
        validity: "all",
        sort: "",
      },
      loading: true,
      areas: [],
      codigosServicio: [],
    };
  },
  methods: {
    sortByField(field) {
      this.data.sort = this.data.sort === field ? `-${field}` : field;
    },
  },
  mounted() {
    Promise.all([getAreas(), getRubros()]).then(
      ([{ ok, data }, { ok: ok2, data: data2 }]) => {
        if (!ok || !ok2)
          return NotificationHelper.error(
            "Errores al cargar datos para los filtros"
          );
        this.areas = data;
        this.codigosServicio = [
          ...new Set(data2.map((r) => r.codigoservicio)),
        ].sort((a, b) => parseInt(a) - parseInt(b));
        this.loading = false;
      }
    );
  },
  computed: {
    queryParams() {
      const queries = {
        search: this.data.title,
      };

      queries.fid_servicio = this.data.codeService;
      queries.fid_unidad = this.data.area;
      queries.validity = this.data.validity;

      if (this.data.titulo_sort) queries.titulo_sort = this.data.titulo_sort;

      if (this.data.descripcion_sort)
        queries.descripcion_sort = this.data.descripcion_sort;

      if (this.data.servicio_sort)
        queries.servicio_sort = this.data.servicio_sort;

      if (this.data.area_sort) queries.area_sort = this.data.area_sort;

      if (this.data.vigencia_sort)
        queries.vigencia_sort = this.data.vigencia_sort;

      if (this.data.fecha_sort) queries.fecha_sort = this.data.fecha_sort;

      if (this.data.sort) queries.ordering = this.data.sort;

      return queries;
    },
  },
};
</script>
