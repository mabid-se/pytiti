<template>
  <div class="d-flex gap-2">
    <div>
      <label for="productos_numero_certificado" class="form-label">
        Número de certificado de aprobación
      </label>
      <input
        name="codigo"
        type="text"
        class="form-control"
        id="codigo"
        v-model="codigo"
      />
      <div class="form-text">
        Escriba el número de certificado de aprobación de cualquier producto
        para buscar sus etiquetas
      </div>
    </div>
    <div>
      <br />
      <button
        @click="loadTable"
        class="btn btn-success btn-label mt-2"
        type="button"
      >
        <i class="ri-search-line label-icon align-middle fs-16 me-2"></i>
        Buscar
      </button>
    </div>
  </div>
  <div class="table-responsive" v-if="field.type_field === 'nestedTable'">
    <label :for="field.name">{{ field.label }}</label>
    <table class="table table-nowrap mb-0" v-if="isReady">
      <thead class="table-light">
        <tr>
          <th scope="col">Codigo</th>
          <th scope="col">Nombre</th>
          <th scope="col">Marca</th>
          <th scope="col">Vida Útil</th>
          <th scope="col">Observaciones</th>
        </tr>
      </thead>
      <tbody v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <tr @click="toggleShow(rowIndex)" class="parent-row">
          <td class="fw-medium">{{ row.codigo }}</td>
          <td>{{ row.nombre }}</td>
          <td>{{ row.marca }}</td>
          <td>{{ row.vida_util }}</td>
          <td>{{ row.observaciones }}</td>
        </tr>
        <tr v-if="row.ingredientes.length > 0 && show && selected === rowIndex">
          <td colspan="5">
            <table class="table table-nowrap mb-0">
              <thead class="table-light">
                <tr>
                  <th scope="col">Características</th>
                  <th scope="col">Ingredientes</th>
                  <th scope="col">OGM</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(subRow, subIndex) in row.ingredientes"
                  :key="subIndex"
                >
                  <td>{{ subRow.caracteristica }}</td>
                  <td>{{ subRow.ingrediente }}</td>
                  <td>{{ subRow.ogm }}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NotificationHelper from "@/helpers/notification";
import { getToken } from "@/services/token";
export default {
  name: "NestedTableField",
  props: {
    field: {
      type: Object,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: undefined,
      isReady: false,
      selected: 0,
      show: false,
      codigo: undefined,
    };
  },
  methods: {
    async loadTable() {
      const host = process.env.VUE_APP_PROD_URL;
      fetch(`${host}${this.field.api}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ codigo: this.codigo }),
      })
        .then(async (res) => {
          const content = await res.json();
          const ok = res.status < 400;
          if (!ok) return NotificationHelper.error(content.error);

          this.isReady = true;
          this.tableData = content;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    toggleShow(index) {
      this.show = !this.show;
      this.selected = index;
    },
  },
};
</script>

<style>
.parent-row:hover {
  cursor: pointer;
}
</style>
