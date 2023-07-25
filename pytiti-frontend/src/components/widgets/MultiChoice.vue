<template>
  <select
    ref="sel"
    class="form-control"
    :id="id"
    :name="name"
    multiple
    v-model="defaultMultichoice"
  >
    <option
      :value="o[keyValue]"
      v-for="(o, index) in options"
      :key="`option.${index}`"
    >
      {{ o[keyTitle] }}
    </option>
  </select>
</template>
<script>
import Choices from "choices.js";
export default {
  name: "MultiChoice",
  props: {
    options: {
      type: Array,
      required: true,
    },
    keyValue: {
      type: String,
      required: true,
    },
    keyTitle: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const elm = this.$refs.sel;

    this.choiceInstance = new Choices(elm, {
      searchEnabled: true,
      removeItems: true,
      removeItemButton: true,
      classNames: {
        containerInner: "choices__inner success",
      },
      noResultsText: "No se encontró resultados.",
      noChoicesText: "No hay opciones para elegir.",
      itemSelectText: "Presione para seleccionar.",
      addItemText: (value) => {
        return `Enter para agregar <b>"${value}"</b>`;
      },
    });
  },
  data() {
    return {
      choiceInstance: null,
    };
  },
  methods: {
    reset() {
      this.choiceInstance.destroy();
      const elm = this.$refs.sel;
      this.choiceInstance = new Choices(elm, {
        searchEnabled: true,
        removeItems: true,
        removeItemButton: true,
        classNames: {
          containerInner: "choices__inner success",
        },
        noResultsText: "No se encontró resultados.",
        noChoicesText: "No hay opciones para elegir.",
        itemSelectText: "Presione para seleccionar.",
        addItemText: (value) => {
          return `Enter para agregar <b>"${value}"</b>`;
        },
      });
    },
    disable() {
      this.choiceInstance.disable();
    },
    setInitialData(data) {
      this.choiceInstance.setChoiceByValue(data);
    },
  },
  computed: {
    defaultMultichoice: {
      get: function () {
        return this.modelValue;
      },
      set: function (newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>
