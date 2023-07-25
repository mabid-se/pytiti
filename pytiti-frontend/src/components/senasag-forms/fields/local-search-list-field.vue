<template>
  <div>
    <label
      class="form-label"
      :class="{
        required: field.required,
        'text-danger': errorVuelidate && errorVuelidate.length > 0,
      }"
      :for="field.name"
      >{{ field.label }}</label
    >
    <div style="position: relative">
      <input
        :readonly="readOnly || field.read_only"
        @click="toggleSearch"
        :disabled="disabled"
        :placeholder="field.placeholder"
        :name="field.name"
        :id="field.name"
        :value="valueName"
        type="text"
        style="padding-left: 40px"
        class="form-control"
        :class="{
          'is-invalid': errorVuelidate && errorVuelidate.length > 0,
        }"
      />
      <span class="mdi mdi-magnify search-widget-icon fs-18"></span>
    </div>
    <div class="form-text">{{ field.title }}</div>
    <div class="mb-3" style="position: relative" v-if="onSearch && !readOnlyV">
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
    readOnly: {
      type: Boolean,
      default: false,
    },
    modelValue: () => "",
  },
  data() {
    return {
      results: undefined,
      fieldValue: undefined,
      //
      isReady: false,
      onSearch: false,
      //
      selectedItem: undefined,
      //
      state: undefined,
    };
  },
  computed: {
    valueName() {
      if (this.field.entity_field.name === "idprovincia") {
        return this.$store.getters["tablasBase/getProvinces"].find(
          (d) => d.id.trim() == this.modelValue || d.id == this.modelValue
        )?.nombre;
      } else if (this.field.entity_field.name === "idmunicipio") {
        return this.$store.getters["tablasBase/getTowns"].find(
          (d) => d.id.trim() == this.modelValue || d.id == this.modelValue
        )?.nombre;
      } else if (this.field.entity_field.name === "iddistrital") {
        return this.$store.getters["tablasBase/getCities"].find(
          (d) => d.id.trim() == this.modelValue || d.id == this.modelValue
        )?.nombre;
      }
      return "";
    },
    ...mapGetters("tablasBase", ["getCity", "getProvince", "getTown"]),
    filteredResults() {
      if (this.field.entity_field) {
        if (this.field.entity_field.name === "idprovincia") {
          return this.$store.getters["tablasBase/getProvinces"];
        } else if (this.field.entity_field.name === "idmunicipio") {
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
      if (this.readOnly || this.field.read_only) return;
      this.onSearch = !this.onSearch;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.fieldValue = item;
      if (this.field.entity_field.name === "iddistrital") {
        this.clearProvince();
        this.clearTown();
        this.setCity(item.id);
        this.onSearch = false;
      }
      if (this.field.entity_field.name === "idprovincia") {
        this.clearTown();
        this.setProvince(item.id);
        this.onSearch = false;
      }
      if (this.field.entity_field.name === "idmunicipio") {
        this.setTown(item.id);
        this.onSearch = false;
      }
      this.$emit("update-change", { [this.field.entity_field.id]: item.id });
      this.$emit("on:reset-nested-selects", this.field.entity_field.name);
    },
    loadResults() {
      if (this.field.entity_field.name === "iddistrital") {
        this.results = this.$store.getters["tablasBase/getCities"];
      }
      if (this.field.entity_field.name === "idprovincia") {
        this.results = this.$store.getters["tablasBase/getProvinces"];
      }
      if (this.field.entity_field.name === "idmunicipio") {
        this.results = this.$store.getters["tablasBase/getTowns"];
      }
    },
    loadField() {
      if (this.state === "started") {
        if (this.field.entity_field.name === "iddistrital") {
          this.setCity(this.field.value);
        }
        if (this.field.entity_field.name === "idprovincia") {
          this.setProvince(this.field.value);
        }
        if (this.field.entity_field.name === "idmunicipio") {
          this.setTown(this.field.value);
        }
        this.fieldValue = this.results.find((item) =>
          item.id.includes(this.field.value)
        );
      }
      if (this.state === "new") {
        if (this.field.entity_field.name === "iddistrital") {
          this.fieldValue = {
            ...this.fieldValue,
            ...{ nombre: "Seleccionar distrital" },
          };
        }
        if (this.field.entity_field.name === "idprovincia") {
          this.fieldValue = {
            ...this.fieldValue,
            ...{ nombre: "Seleccionar provincia" },
          };
        }
        if (this.field.entity_field.name === "idmunicipio") {
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
  mounted() {
    if (!this.field.entity_field)
      console.error("Entity field was not provided");
    if (this.field.entity_field) {
      this.loadResults();
      this.loadFieldState();
      this.loadField();
      this.$emit("update-change", {
        [this.field.entity_field.id]: this.field.value,
      });
      this.$emit("on:load", {
        id: this.field.entity_field.id,
        type: this.field.entity_field.name,
      });
    } else {
      this.fieldValue = {
        ...this.fieldValue,
        ...{ nombre: this.field.placeholder },
      };
    }
  },
};
</script>

<style scoped>
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
