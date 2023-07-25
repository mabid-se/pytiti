<template>
  <div>
    <label
      class="form-label required"
      :for="field.name"
      :class="{
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      >{{ field.label }}</label
    >
    <div style="position: relative">
      <input
        readonly
        @click="toggleSearch"
        :disabled="disabled"
        :placeholder="field.placeholder"
        :name="field.name"
        :id="field.name"
        :value="selectedItem?.nombre"
        type="text"
        style="padding-left: 40px"
        class="form-control"
        :class="{
          'is-invalid': errorVuelidate && errorVuelidate.length > 0,
        }"
      />
      <div
        class="invalid-feedback"
        v-if="errorVuelidate && errorVuelidate[0] && errorVuelidate[0].$message"
      >
        {{ errorVuelidate[0].$message }}
      </div>
      <div
        class="invalid-feedback"
        v-else-if="errorVuelidate && errorVuelidate[0]"
      >
        {{ errorVuelidate[0] }}
      </div>
      <div class="invalid-feedback" v-else>
        {{ errorVuelidate }}
      </div>
      <span class="mdi mdi-magnify search-widget-icon fs-18"></span>
    </div>
    <div class="form-text">{{ field.title }}</div>
    <div class="mb-3" style="position: relative" v-if="onSearch">
      <ul class="list-group search-results w-100">
        <li
          v-for="(item, index) in filteredResults"
          :key="index"
          @click="selectItem(item)"
          class="list-group-item"
        >
          {{ item.nombre }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LocalSearchListField",

  props: {
    field: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
  },
  data() {
    return {
      results: undefined,
      fieldValue: undefined,
      isReady: false,
      onSearch: false,
      selectedItem: undefined,
      state: undefined,
    };
  },
  computed: {
    ...mapGetters("tablasBase", ["getCity", "getProvince", "getTown"]),
    filteredResults() {
      if (this.field.entity_field) {
        if (this.field.entity_field.name.includes("idprovincia")) {
          return this.$store.getters["tablasBase/getProvinces"];
        } else if (this.field.entity_field.name.includes("idmunicipio")) {
          return this.$store.getters["tablasBase/getTowns"];
        }
        return this.$store.getters["tablasBase/getCities"];
      }
      return [];
    },
  },
  methods: {
    ...mapActions("tablasBase", [
      "setCity",
      "setProvince",
      "setTown",
      "clearCity",
      "clearProvince",
      "clearTown",
    ]),
    toggleSearch() {
      this.onSearch = !this.onSearch;
    },
    resetItem() {
      this.selectItem(null);
    },
    selectItem(item) {
      this.selectedItem = item;
      this.fieldValue = item;
      if (this.field.entity_field.name.includes("iddistrital")) {
        this.clearProvince();
        this.clearTown();
        this.setCity(item?.id);
        this.$emit("reset-nesteds");
      }
      if (this.field.entity_field.name.includes("idprovincia")) {
        this.clearTown();
        this.setProvince(item?.id);
        this.$emit("reset-nesteds");
      }
      if (this.field.entity_field.name.includes("idmunicipio")) {
        this.setTown(item?.id);
      }
      if (item) this.toggleSearch();
      this.$emit("update-change", { [this.field.entity_field.name]: item?.id });
    },
    loadResults() {
      console.log(this.field.entity_field.name.includes("iddistrital"));
      if (this.field.entity_field.name.includes("iddistrital")) {
        this.results = this.$store.getters["tablasBase/getCities"];
      }
      console.log(this.field.entity_field.name.includes("idprovincia"));

      if (this.field.entity_field.name.includes("idprovincia")) {
        this.results = this.$store.getters["tablasBase/getProvinces"];
      }
      console.log(this.field.entity_field.name.includes("idmunicipio"));

      if (this.field.entity_field.name.includes("idmunicipio")) {
        this.results = this.$store.getters["tablasBase/getTowns"];
      }
    },
    loadField() {
      if (this.state === "started") {
        if (this.field.entity_field.name.includes("iddistrital")) {
          this.setCity(this.field.value);
        }
        if (this.field.entity_field.name.includes("idprovincia")) {
          this.setProvince(this.field.value);
        }
        if (this.field.entity_field.name.includes("idmunicipio")) {
          this.setTown(this.field.value);
        }
        this.fieldValue = this.results.find((item) =>
          item.id.includes(this.field.value)
        );
      }
      if (this.state === "new") {
        if (this.field.entity_field.name.includes("iddistrital")) {
          this.fieldValue = {
            ...this.fieldValue,
            ...{ nombre: "Seleccionar distrital" },
          };
        }
        if (this.field.entity_field.name.includes("idprovincia")) {
          this.fieldValue = {
            ...this.fieldValue,
            ...{ nombre: "Seleccionar provincia" },
          };
        }
        if (this.field.entity_field.name.includes("idmunicipio")) {
          this.fieldValue = {
            ...this.fieldValue,
            ...{ nombre: "Seleccionar municipio" },
          };
        }
      }
      this.isReady = true;
    },
    loadFieldState() {
      if (this.field.value === null || this.field.value === undefined) {
        this.state = "new";
      } else {
        this.state = "started";
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.form-control {
  background-color: white;
}
span.search-widget-icon {
  position: absolute;
  font-size: 18px;
  line-height: 38px;
  left: 13px;
  top: 0;
  color: #878a99;
}

.search-results {
  position: absolute;
  height: 205px;
  overflow: auto;
  z-index: 12;
  transition: ease-in 2s;
}

.list-group.search-results:hover {
  cursor: pointer;
}
</style>
