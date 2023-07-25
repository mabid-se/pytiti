<template>
  <div class="tab-content text-muted mt-3 mt-lg-0">
    <div
      class="tab-pane fade active show"
      id="home-3e2361761f"
      role="tabpanel"
      aria-labelledby="home-tab-3e2361761f"
    >
      <div class="card">
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
                        <tr v-for="row in data" :key="row.id">
                          <td class="fw-medium">{{ row.numero }}</td>
                          <td>{{ row.direccion }}</td>
                          <td>{{ row.latitud }} {{ row.longitud }}</td>
                          <td>
                            <div class="hstack gap-3 flex-wrap">
                              <a
                                v-if="!readOnly"
                                @click.prevent="
                                  $emit('on:click:update', {
                                    instance: row,
                                    id: row.id_galpones,
                                  })
                                "
                                class="link-success fs-15"
                                ><i class="ri-edit-2-line"></i
                              ></a>
                              <a
                                v-if="!readOnly"
                                @click.prevent="
                                  $emit('on:click:delete', row.id_galpones)
                                "
                                class="link-danger fs-15"
                                ><i class="ri-delete-bin-line"></i
                              ></a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
