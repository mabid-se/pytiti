<template>
  <div>
    <label
      :for="field.id"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 300px; display: block"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector ref="vectors">
          <ol-feature>
            <ol-geom-point
              :coordinates="coordinates"
              v-if="showInitialMarker"
            ></ol-geom-point>
          </ol-feature>
          <ol-interaction-draw
            @drawstart="drawstart"
            :type="drawType"
            v-if="!field.read_only"
          ></ol-interaction-draw>
        </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>
    </ol-map>
    <!-- toggle-lat-long --->
    <div class="row">
      <div class="col-lg">
        <div class="collabse collapse" id="latLongCollapse">
          <div class="d-flex flex-wrap gap-2 mt-1">
            <div class="form-floating">
              <input
                type="text"
                v-model="long"
                class="form-control"
                id="long"
                :readonly="field.read_only"
              />
              <label for="long">Latitud</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="lat"
                v-model="lat"
                :readonly="field.read_only"
              />
              <label for="lat">Longitud</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2 mt-1">
        <button
          class="btn btn-info collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#latLongCollapse"
          aria-expanded="false"
          aria-controls="latLongCollapse"
        >
          <i class="ri-map-pin-fill"></i>
        </button>
      </div>
    </div>
    <!-- /toggle-lat-long --->
    <div
      v-for="(item, index) in errorVuelidate"
      :key="index"
      class="error-validation"
    >
      <span v-if="item.$message">{{ item.$message }}</span>
      <span v-else>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted } from "vue";
import markerIcon from "@/assets/icons/pin.png";
export default {
  name: "MapFormField",

  props: {
    field: {
      type: Object,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
  },
  data() {
    return {
      dataMap: undefined,
    };
  },
  setup(props, { emit }) {
    const showInitialMarker = ref(true);

    const center = ref(
      props.field.value
        ? props.field.value.split(",")
        : [-16.489689, -68.119293].reverse()
    );
    const projection = ref("EPSG:4326");
    const zoom = ref(13);
    const rotation = ref(0);

    const markers = ref(null);
    const drawType = ref("Point");

    const view = ref(null);
    const lat = ref(props.field.value ? props.field.value.split(",")[0] : null);
    const long = ref(
      props.field.value ? props.field.value.split(",")[1] : null
    );

    watch([lat, long], () => {
      // changeLatLng();
      emit("update-coordinates", {
        [props.field.entity_field.id]: `${lat.value},${long.value}`,
      });
    });

    const drawedMarker = ref();
    const vectors = ref(null);

    let coordinates = ref(
      props.field.value ? props.field.value.split(",") : [null, null].reverse()
    );

    const drawstart = (event) => {
      showInitialMarker.value = false;
      let latLong;
      vectors.value.source.removeFeature(drawedMarker.value);
      console.log(event.feature);
      drawedMarker.value = event.feature;
      latLong = event.feature.values_.geometry.flatCoordinates;

      coordinates = event.feature.values_.geometry.flatCoordinates;

      lat.value = String(latLong[0]);
      long.value = String(latLong[1]);
      emit("update-coordinates", {
        [props.field.entity_field.id]: `${lat.value},${long.value}`,
      });
    };

    // const changeLatLng = () => {
    //   vectors.value.source.removeFeature(drawedMarker.value);
    //   view.value.fit([lat.value, long.value, lat.value, long.value], {
    //     maxZoom: 13,
    //   });
    // };

    onMounted(() => {
      if (!props.field.entity_field)
        console.error("Entity field was not provided");

      if (!props.field.value || !props.field.entity_field.id) return;

      let latLongCoordinates = props.field.value
        ? props.field.value.split(",")
        : [null, null].reverse();

      long.value = String(latLongCoordinates[1]);
      lat.value = String(latLongCoordinates[0]);

      emit("update-coordinates", {
        [props.field.entity_field.id]: `${String(
          latLongCoordinates[0]
        )},${String(latLongCoordinates[1])}`,
      });
    });

    return {
      // events
      drawstart,
      // data
      lat,
      long,
      view,
      drawedMarker,
      vectors,
      center,
      projection,
      zoom,
      rotation,
      markerIcon,
      markers,
      drawType,
      coordinates,
      showInitialMarker,
    };
  },
};
</script>
