<template>
  <div v-if="field.type_field === 'map'">
    <label 
    :for="field.id">{{ field.label }}</label>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:300px;display:block;">
      <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection"/>
      <ol-tile-layer>
        <ol-source-osm/>
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector ref="vectors">
          <ol-feature>
            <ol-geom-point :coordinates="coordinates"></ol-geom-point>
          </ol-feature>
          <!-- <ol-interaction-draw @drawstart="drawstart" :type="drawType"></ol-interaction-draw> -->
        </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>
    </ol-map>
  </div>
</template>

<script>
    import { ref } from "vue";
    import markerIcon from '@/assets/icons/pin.png';
    export default {
      name: "MapReadField",
      props: {
        field: {
          type: Object,
        },
      },
      setup(props) {
        var center = ref(props.field.value === null ? [-68.1443328, -16.5019648] : props.field.value.split(","));
        const projection = ref('EPSG:4326')
        const zoom = ref(13)
        const rotation = ref(0);

        const markers = ref(null);
        const drawType = ref("Point")

        const drawedMarker = ref()
        const vectors = ref(null);

        var coordinates = ref(props.field.value === null ? [-68.1443328, -16.5019648] : props.field.value.split(","));

        const drawstart = (event) => {
          vectors.value.source.removeFeature(drawedMarker.value);
          drawedMarker.value = event.feature;
          coordinates = event.feature.values_.geometry.flatCoordinates;
        }

        return {
          // events
          drawstart,
          // data
          vectors,
          center,
          projection,
          zoom,
          rotation,
          markerIcon,
          markers,
          drawType,
          coordinates,
        }
      },
    }

</script>
