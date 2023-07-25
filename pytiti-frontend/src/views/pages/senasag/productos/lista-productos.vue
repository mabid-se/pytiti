<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg col-xxl">
        <div class="card">
          <div class="card-body">
            <div class="live-preview">
              <div class="card card-border-grey">
                <div class="card-header card-border-bottom-grey">
                  <h6 class="fs-15 mb-0">{{ items[1].text }}</h6>
                  <p class="mt-3 mb-3">
                    Ésta sección le permitirá seleccionar los datos del producto
                    vegetal al importar
                  </p>
                </div>
                <div class="card">
                  <div class="row">
                    <div class="col-lg-2">
                      <div class="mb-3">
                        <label for="categoria">Categorías: </label>
                        <select
                          v-model="params.categoria"
                          name="categoria"
                          id="categoria"
                          class="form-control"
                        >
                          <option>Seleccionar categoría</option>
                          <option
                            v-for="(item, index) in categories"
                            :key="index"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <div class="form-icon right">
                          <i class="ri-search-line"></i>
                          <input
                            type="text"
                            v-model="params.nombre"
                            class="form-control"
                            id="nombre"
                            name="nombre"
                            placeholder="Escribir nombre de país..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <KTable
                    :queryParams="params"
                    :current-limit="10"
                    url="api-products/list"
                    httpMethod="GET"
                  >
                    <template v-slot:title>
                      <h4 class="card-title mb-0 flex-grow-1">
                        Productos habilitados
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
                            {{ item
                            }}<i class="las la-sort la-lg my-auto pointer"></i>
                          </div>
                        </th>
                      </tr>
                    </template>
                    <template v-slot:row="{ item }">
                      <tr>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.pais }}</td>
                        <td>{{ item.categoria }}</td>
                        <td><!-- medida --></td>
                        <td><!-- costo --></td>
                      </tr>
                    </template>
                  </KTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// components
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";

import KTable from "@/components/widgets/table";

export default {
  name: "ListaProductos",
  components: {
    Layout,
    PageHeader,
    //
    KTable,
  },
  data() {
    return {
      title: "Listado de Productos",
      items: [
        {
          text: "Productos",
          href: "/",
        },
        {
          text: "Lista de Productos",
          active: true,
        },
      ],
      //
      columns: [
        "Productos",
        "País",
        "Categoría",
        "Medida",
        "Costo Bs.",
        "Acciones",
      ],
      categories: [1, 2, 3, 4, 5],
      params: {
        categoria: 3,
        nombre: "bolivia",
      },
    };
  },
};
</script>
