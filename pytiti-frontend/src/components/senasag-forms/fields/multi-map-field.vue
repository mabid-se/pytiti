<template>
  <div v-if="field.type_field === 'multimapField'">
    <div class="row">
      <div class="col-xxl-12 col-lg-12">
        <label 
          :for="field.id"
          :class="{
            'required':field.required,
            'text-danger': errorVuelidate && errorVuelidate.length > 0,
          }"
        >{{ field.label }}</label>
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:300px;display:block;">
          <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection"/>
          <ol-tile-layer>
            <ol-source-osm/>
          </ol-tile-layer>
          <ol-vector-layer>
            <ol-source-vector ref="vectors">
              <ol-interaction-draw @drawstart="drawstart" :type="drawType" v-if="!readOnlyV||!forceReadOnly"></ol-interaction-draw>
            </ol-source-vector>
            <ol-style>
              <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
            </ol-style>
          </ol-vector-layer>
        </ol-map>
        <div class="form-text">{{ field.title }}</div>
        <div
            v-for="(item, index) in errorVuelidate"
            :key="index"
            class="error-validation"
        >
            <span v-if="item.$message">{{ item.$message }}</span>
            <span v-else>{{ item }}</span>
       </div>
      </div>
      <div class="col-12">
        <div class="derecha">
          <!-- try to send -->
          <button :disabled="userIsAdmin" @click="addToTable" type="button" class="btn btn-success btn-label right">
            <i class="ri-file-edit-line label-icon align-middle fs-16 ms-2"></i> Agregar almacén 
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-5" v-if="table.length > 0">
      <div class="col-lg-12 col-xxl-12">
        <table class="table table-success table-striped align-middle table-nowrap mb-0">
          <thead>
              <tr>
                  <th scope="col">N°</th>
                  <th>Capacidad</th>
                  <th>Superficie</th>
                  <th>Dirección</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th scope="col">Opciones</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(row, index) in table" :key="index">
                  <th scope="row">{{ index + 1}}</th>
                  <td>{{row.capacidad}}</td>
                  <td>{{row.numero}}</td>
                  <td>{{row.direccion}}</td>
                  <td>{{row.latitud}}</td>
                  <td>{{row.longitud}}</td>
                  <td>
                      <div class="hstack gap-3 flex-wrap">
                          <a href="javascript:void(0);" class="link-success fs-15"><i class="ri-edit-2-line"></i></a>
                          <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line"></i></a>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
    import { ref } from "vue";
    import markerIcon from '@/assets/icons/pin.png';
    import { mapGetters } from 'vuex';
    export default {
      name: "MultiMapField",
      props: {
        field: {
          type: Object,
        },
        table: {
          type: Array
        },
        errorVuelidate:{
          type: [Array],
          required:false
        },
        readOnlyForce: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        table_headers() {
          return Object.keys(this.table[0]);
        },
        ...mapGetters("permissions", ["userIsAdmin"])
      },
      setup(props, { emit }) {
        const center = ref([-68.1443328, -16.5019648])
        const projection = ref('EPSG:4326')
        const zoom = ref(13)
        const rotation = ref(0)

        const markers = ref(null);
        const drawType = ref("Point")

        const drawedMarker = ref()
        const vectors = ref(null);

        var coordinates = ref();
        //

        const drawstart = (event) => {
          let latLong;
          vectors.value.source.removeFeature(drawedMarker.value);
          drawedMarker.value = event.feature;
          latLong = event.feature.values_.geometry.flatCoordinates;

          // emit("update-change", {longitud: String(latLong[1]),latitud: String(latLong[0])})
          emit("update-change", String(latLong[1])+","+String(latLong[0]))
        }

        const addToTable = () => {
          // emit("make-table");
          emit("on:submit")
        }

        return {
          vectors,
          drawstart,
          center,
          projection,
          zoom,
          rotation,
          markerIcon,
          markers,
          drawType,
          coordinates,
          //
          addToTable
        }
      },
    }

</script>
