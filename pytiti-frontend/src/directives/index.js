import { Tooltip } from "bootstrap";
import Sortable from "sortablejs";
import Choices from "choices.js";

export const tooltip = {
  mounted(el) {
    new Tooltip(el);
  },
};

export const sortableTable = {
  created(el, binding) {
    Sortable.create(el, {
      draggable: ".draggable-row",
      onEnd: (evt) => {
        if (binding.value) binding.value(evt);
      },
    });
  },
};

export const sortableNested = {
  created(el, binding) {
    new Sortable(el, {
      group: binding.value.group,
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      onEnd: (evt) => {
        if (binding.value.f) binding.value.f(evt, binding.value.group);
      },
    });
  },
};

export const choice = {
  mounted(el) {
    new Choices(el, {
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
};
