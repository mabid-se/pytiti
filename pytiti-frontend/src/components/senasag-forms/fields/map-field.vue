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
          <ol-interaction-draw @drawstart="drawstart" :type="drawType"></ol-interaction-draw>
        </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="0.1"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>
    </ol-map>
  </div>
</template>

<script>
    import { ref, 
    //onMounted 
    } from "vue";
    import markerIcon from '@/assets/icons/pin.png';
    export default {
      name: "MapField",
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
      setup(/*props, { emit }*/) {
        const center = ref([-68.1443328, -16.5019648])
        const projection = ref('EPSG:4326')
        const zoom = ref(13)
        const rotation = ref(0)

        const markers = ref(null);
        const drawType = ref("Point")

        const drawedMarker = ref()
        const vectors = ref(null);
        let coordinates = ref([-68.1443328, -16.5019648]);

        const drawstart = (event) => {
          // let latLong;
          vectors.value.source.removeFeature(drawedMarker.value);
          drawedMarker.value = event.feature;
          coordinates = event.feature.values_.geometry.flatCoordinates;
          // latLong = event.feature.values_.geometry.flatCoordinates;
        }

        // onMounted(() => {
        //   console.log("map entity_field", props.entity_field);

        //   let latLongCoordinates = props.field.entity_field === null ? 
        //     [0, 0] : 
        //     props.field.entity_field.value.split(",");
        //   emit(
        //     "update-coordinates", 
        //     {
        //       longitud: String(latLongCoordinates[1]),
        //       latitud: String(latLongCoordinates[0]),
        //     }
        //   );
        // })

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
