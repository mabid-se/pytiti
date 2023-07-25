<template>
  <div class="flex m-10">
    <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div class="row pt-2 pb-2" v-for="element in list" :key="element.name">
        <div class="col-lg-auto">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cardtableCheck03" value="">
            <label class="form-check-label" for="cardtableCheck03"></label>
          </div>
        </div>
        <div class="col-lg-auto">
          <div>
            {{ element.id }}
          </div>
        </div>
        <div class="col-lg-10">
          {{ element.name }}
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    data() {
      return {
        enabled: true,
        list: [
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 },
        ],
        dragging: false,
      }
    },
    methods: {
      log(event) {
        console.log(event)
      },
    },
  })
</script>