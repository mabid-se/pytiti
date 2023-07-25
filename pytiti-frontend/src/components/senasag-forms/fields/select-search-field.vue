<template>
  <div class="select-field">
    <label :for="field.id">{{ field.label }}</label>
    <div v-if="type === 'json'">
      <div class="form-icon">
        <input
          :value="[
            field.entity_field === null ? undefined : field.entity_field.value,
          ]"
          :readonly="field.read_only || userIsAdmin"
          type="text"
          :name="field.name"
          class="form-control form-control-icon"
          @change="searchOptionList"
          @focus="showListOptions"
          :placeholder="field.placeholder"
        />
        <i class="mdi mdi-magnify search-widget-icon"></i>
        <span
          @click="hideListOptions"
          :class="
            'las la-window-close la-2x ' +
            [optionsVisible ? 'close-icon-show' : 'close-icon-hide']
          "
        ></span>
      </div>
      <ul
        v-if="filteredOptions.length > 0"
        :class="
          'list-options ' +
          [optionsVisible ? 'list-options-show' : 'list-options-hide']
        "
      >
        <li
          v-for="(option, index) in filteredOptions"
          @click="pickOption(option)"
          :key="index"
        >
          {{ option.name }}
        </li>
      </ul>
      <p v-else class="list-options-none">
        No se encontraron coincidencias en la búsqueda.
      </p>
    </div>
    <div v-else-if="type === 'api'">
      <div class="form-icon">
        <input
          :value="this.entityApiValue"
          :readonly="field.read_only || userIsAdmin"
          type="text"
          :name="field.name"
          class="form-control form-control-icon"
          @change="searchOptionList"
          @focus="showListOptions"
          :placeholder="field.placeholder"
        />
        <i class="mdi mdi-magnify search-widget-icon"></i>
        <span
          @click="hideListOptions"
          :class="
            'las la-window-close la-2x ' +
            [optionsVisible ? 'close-icon-show' : 'close-icon-hide']
          "
        ></span>
      </div>
      <ul
        @scroll="increaseByScrolling"
        v-if="filteredOptions.length > 0"
        :class="
          'list-options ' +
          [optionsVisible ? 'list-options-show' : 'list-options-hide']
        "
      >
        <li
          v-for="(option, index) in filteredOptions"
          @click="pickOption(option)"
          :key="index"
        >
          {{ fieldValue(option) }}
        </li>
      </ul>
      <!--<p v-else class="list-options-none">No se encontraron coincidencias en la búsqueda.</p>-->
    </div>
    <div class="form-text">{{ field.title }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getApiOptions } from "@/services/tramites";
export default {
  name: "SelectSearchField",
  props: {
    field: {
      type: Object,
    },
  },
  data() {
    return {
      type: undefined,
      optionsVisible: false,
      optionsLoaded: false,
      filteredOptions: [],
      options: [],
      selectedOption: {},
      searchCoincidence: "",
      pageSize: 15,
      page: 1,
      entityApiValue: undefined,
    };
  },
  computed: {
    ...mapGetters("permissions", ["userIsAdmin"]),
    entityValue() {
      return this.field.entity_field.value;
    },
  },
  methods: {
    // update-change (emits to parent component)
    updateChange() {
      this.$emit("update-change", this.selectedOption);
    },
    // UI behavior
    showListOptions() {
      this.optionsVisible = true;
    },
    hideListOptions() {
      this.optionsVisible = false;
    },
    // UX behavior
    pickOption(option) {
      let selectedElement = document.querySelector(
        `.select-field input[name="${this.field.name}"]`
      );
      selectedElement.value = this.fieldValue(option);
      this.selectedOption = {
        [this.field.entity_field.name]: this.fieldKey(option),
      };
      this.optionsVisible = false;
      this.updateChange();
    },
    searchOptionList(e) {
      this.searchCoincidence = e.target.value;
      if (e.target.value === "") {
        this.loadOptions();
      } else {
        this.options = [];
        this.filteredOptions = [];
        this.page = 1;
        this.pageSize = 15;
        this.loadOptions();
      }
      // this.filteredOptions = this.options.filter(item => {
      //     return e.target.value.toLowerCase().split(" ").every(v => item[this.fieldKeyName(item)].toLowerCase().includes(v))
      // })
    },
    // load options
    loadOptions() {
      if (this.field.options !== null && this.field.api === "") {
        this.type = "json";
        try {
          this.optionsLoaded = true;
          this.filteredOptions = JSON.parse(this.field.options);
          this.options = JSON.parse(this.field.options);
        } catch (err) {
          console.error("Not a JSON format");
        }
      } else if (this.field.api != "") {
        this.type = "api";
        getApiOptions(this.field.api, {
          search: this.searchCoincidence,
          page: this.page,
          pageSize: this.pageSize,
          id: "",
        })
          .then((res) => {
            this.optionsLoaded = true;
            this.options = this.options.concat(...res.data);
            this.filteredOptions = this.filteredOptions.concat(...res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    // dynamic key, value
    fieldKeyName(field) {
      let keys = Object.keys(field);
      let keyName = keys.find((key) => /nombre/.test(key));
      return keyName;
    },
    fieldKey(field) {
      let keys = Object.keys(field);
      let keyId = keys.find((key) => /id/.test(key));
      return field[keyId];
    },
    fieldValue(field) {
      let keys = Object.keys(field);
      let keyName = keys.find((key) => /nombre/.test(key));
      return field[keyName];
    },
    increaseByScrolling(e) {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        this.page += 1;
        this.loadOptions();
        e.target.scrollTop -= e.target.clientHeight - 280;
      }
    },
    getEntityApiValue() {
      getApiOptions(this.field.api, {
        search: "",
        page: 1,
        pageSize: 1,
        id: this.field.entity_field.value,
      }).then(
        (res) => {
          this.entityApiValue = res.data.find(
            (item) => item.id === this.field.entity_field.value
          ).nombre;
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  mounted() {
    this.loadOptions();
    this.getEntityApiValue();
    if (this.field.value !== null) {
      this.$emit("update-change", {
        [this.field.entity_field.name]: this.field.value,
      });
    }
  },
};
</script>

<style scoped>
.select-field {
  position: relative;
}

.select-field p.list-options-none {
  position: absolute;
  background: #fff;
  margin: 0;
  padding: 20px 30px;
  box-shadow: 0px 0px 7px #c5bfbf;
  z-index: 1;
  transition: ease-in 0.2s;
}

.select-field ul.list-options {
  position: absolute;
  background: #fff;
  margin: 0;
  padding: 0;
  box-shadow: 0px 0px 7px #c5bfbf;
  transition: ease-in 0.2s;
  height: 40vh;
  overflow: auto;
  z-index: 1;
}

.select-field ul.list-options.list-options-show {
  display: block;
}

.select-field span.close-icon-hide,
.select-field ul.list-options.list-options-hide {
  display: none;
}

.select-field ul.list-options li {
  border-bottom: 1px solid rgb(228, 228, 228);
  line-height: 2;
  list-style: none;
  padding: 5px 20px;
  transition: ease-in 0.2s;
}

.select-field ul.list-options li:hover {
  cursor: pointer;
  background: rgb(228, 228, 228);
}
.form-icon span {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 10px;
  display: flex;
  align-items: center;
  transition: ease-in 0.1s;
  font-size: 25px;
}

.form-icon span:hover {
  cursor: pointer;
  color: #158463;
  font-size: 28px;
}
</style>
