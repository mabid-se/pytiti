<template>
  <div v-if="field.type_field === 'map'">
    <label 
    :for="field.id">{{ field.label }}</label>

    <div class="mb-3" style="position:relative;">
      <input 
      style="padding-left: 40px;"
      placeholder="Buscar dirección..."
      type="text" 
      class="form-control" 
      @change="searchAddress">
      <span class="mdi mdi-magnify search-widget-icon fs-18"></span>
    </div>

    <div id="search-map-list" class="list-group" v-if="obj.placesFound">
      <button 
      @click="selectAddress(item)" 
      class="list-group-item list-group-item-action" 
      v-for="(item, index) in obj.address_coincidences" 
      :key="index">
        <i class="ri-map-pin-fill align-middle me-2"></i> {{ item.display_name }} 
      </button>
    </div>

    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:300px;display:block;">
      <ol-view ref="view" :center="center.cnt" :rotation="rotation" :zoom="zoom" :projection="projection"/>
      <ol-tile-layer>
        <ol-source-osm/>
      </ol-tile-layer>

      <!-- geolocation -->
      <ol-geolocation :projection="projection" @positionChanged="geoLocChange">
        <template v-slot="slotProps">
          <ol-vector-layer :zIndex="2">
            <ol-source-vector>
              <ol-feature ref="positionFeature">
                <ol-geom-point :coordinates="slotProps.position"></ol-geom-point>
                  <!--<ol-style>
                    <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
                  </ol-style>-->
                </ol-feature>
            </ol-source-vector>
          </ol-vector-layer>
        </template>
      </ol-geolocation>
      <!-- /geolocation -->

      <ol-vector-layer>
        <ol-source-vector ref="vectors">
          <!-- <ol-feature>
            <ol-geom-point :coordinates="props.field.coordinates"></ol-geom-point>
          </ol-feature> -->
          <ol-interaction-draw @drawstart="drawstart" :type="drawType"></ol-interaction-draw>
        </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>
    </ol-map>
    <!-- toggle-lat-long --->
    <div class="row">
      <div class="col-lg">
        <div class="collabse show" id="latLongCollapse">
          <div class="d-flex flex-wrap gap-2">
            <div class="form-floating">
              <input type="text" :value="long" class="form-control" id="long" @change="changeLong" />
              <label for="long">Latitud</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="lat" @change="changeLat" :value="lat">
              <label for="lat">Longitud</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <button 
        class="btn btn-info collapsed" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#latLongCollapse" 
        aria-expanded="false" 
        aria-controls="latLongCollapse">
          <i class="ri-map-pin-fill"></i>
        </button>
      </div>
    </div>
    <!-- /toggle-lat-long --->

  </div>
</template>

<script>
    import { ref, reactive, onMounted, onUpdated } from "vue";
    import markerIcon from '@/assets/icons/pin.png';

    export default {
      name: "MapWriteField",
      props: {
        field: {
          type: Object,
        },
      },
      data() {
        return {
          dataMap: undefined,
        }
      },
      setup(props, { emit }) {
        // let center = reactive([-68.12861682381676, -16.521280047628807])
        let center = reactive({cnt: [-68.12861682381676, -16.521280047628807]})
        const projection = ref('EPSG:4326')
        const zoom = ref(16)
        const rotation = ref(0)

        const markers = ref(null);
        const drawType = ref("Point")
        const view = ref(null);
        const map = ref(null);
        const count = ref(0);

        const lat = ref(null);
        const long = ref(null);

        const drawedMarker = ref()
        const vectors = ref(null);

        let obj = reactive({
          placesFound: false, 
          address_coincidences: [],
          selected_coincidence: {},
        });

        //var coordinates = ref(props.field.entity_field === null ? null : props.field.entity_field.value.split(","));

        const drawstart = (event) => {
          let latLong;
          vectors.value.source.removeFeature(drawedMarker.value);
          drawedMarker.value = event.feature;
          latLong = event.feature.values_.geometry.flatCoordinates;

          console.log("draw", drawedMarker.value);
          console.log("feat", event.feature);
          //coordinates = event.feature.values_.geometry.flatCoordinates;

          long.value = latLong[1];
          lat.value = latLong[0];

          emit(
            "update-coordinates", 
            {
              longitud: String(latLong[1]),
              latitud: String(latLong[0]),
            }
          );
        }

        const geoLocChange = (loc) => {
          if (count.value === 0) {
            view.value.fit([loc[0], loc[1], loc[0], loc[1]], {
              maxZoom: 16
            })
            obj.lat = loc[0];
            obj.long = loc[1];

            lat.value = loc[0];
            long.value = loc[1];
          } else {
            view.value.fit([lat.value, long.value, lat.value, long.value], {
              maxZoom: 16
            });
          }
          count.value += 1;
          emit("update-coordinates", {
            longitud: String(long.value),
            latitud: String(lat.value),
          });
        }

        const searchAddress = (event) => {{
          let url = `https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2&countrycodes=BO&q=${event.target.value}`;
          fetch(url)
            .then(res => (res.json()))
            .then(
              data => {
                obj.placesFound=true;
                obj.address_coincidences = data;
              },
              err => {
                console.error(err);
              }
            );
          }
        }

        const selectAddress = (selected) => {
          center.cnt = [selected.lon, selected.lat];
          obj.placesFound = false;
          obj.lat = selected.lat,
          obj.long = selected.lon;
        }

        const changeLat = (e) => {
          lat.value = e.target.value;
          vectors.value.source.removeFeature(drawedMarker.value);
          view.value.fit([lat.value, long.value, lat.value, long.value], {
            maxZoom: 18
          });
          /*
          vectors.value.source.removeFeature(drawedMarker.value);
          drawedMarker.value = event.feature;
          latLong = event.feature.values_.geometry.flatCoordinates;
          */

        }

        const changeLong = (e) => {
          long.value = e.target.value;
          vectors.value.source.removeFeature(drawedMarker.value);
          view.value.fit([lat.value, long.value, lat.value, long.value], {
            maxZoom: 18
          });
        }

        onMounted(() => {
          console.log("mounted....");
        });

        onUpdated(() => {
          console.log(count);
        })

        return {
          // events
          drawstart,
          searchAddress,
          selectAddress,
          geoLocChange,
          changeLat, changeLong,
          // reactive
          obj,
          // data
          view, count,
          map,
          lat,long,

          vectors,
          center,
          projection,
          zoom,
          rotation,
          markerIcon,
          markers,
          drawType,
        }
      },
    }

</script>

<style scoped>
#search-map-list {
  position: absolute;
  z-index:1;
}

#search-map-list .list-group-item {
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  transition: 0.2s ease-out;
}

#search-map-list .list-group-item:hover {
  background: rgba(184, 183, 183, 0.8);
}

span.search-widget-icon {
	position: absolute;
	z-index: 10;
	font-size: 18px;
	line-height: 38px;
	left: 13px;
	top: 0;
	color: #878a99;
}
</style>
