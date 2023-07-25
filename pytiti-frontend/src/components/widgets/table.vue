<template>
  <div class="card card-soft-border w-100">
    <div class="card-header">
      <slot name="title"></slot>
    </div>
    <div
      class="spinner-grow text-success"
      style="width: 3rem; height: 3rem"
      role="status"
      v-if="loading"
    >
      <span class="visually-hidden">Cargando...</span>
    </div>
    <div class="card-body" v-if="!loading">
      <div class="row g-3 align-items-center">
        <slot name="filters"></slot>
      </div>
      <div class="table-responsive">
        <table class="table align-middle table-nowrapx mb-0" v-if="!loading">
          <thead class="align-middle">
            <slot name="thead"></slot>
          </thead>
          <tbody>
            <slot
              name="row"
              v-for="item in list"
              :key="item"
              :item="item"
            ></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end pt-10 w-100" v-if="!loading">
    <nav>
      <ul class="pagination success" v-if="total > 0">
        <li
          class="page-item"
          :class="{
            disabled: currentPage == 1,
          }"
        >
          <a
            class="page-link"
            @click="currentPage = currentPage - 1"
            tabindex="-1"
            aria-disabled="true"
            >Anterior</a
          >
        </li>
        <li
          :class="['page-item', seq == currentPage ? 'active' : '']"
          v-for="(seq, index) in sequence"
          :key="index"
        >
          <a @click="currentPage = seq" class="page-link">{{ seq }}</a>
        </li>
        <li
          class="page-item"
          :class="{
            disabled: currentPage == sequence[sequence.length - 1],
          }"
        >
          <a class="page-link" @click="currentPage = currentPage + 1"
            >Siguiente</a
          >
        </li>
      </ul>
      <div v-else>No se encontró resultados</div>
    </nav>
  </div>
</template>

<script>
import { generateFromObj } from "@bramus/pagination-sequence";

import { HttpClient } from "@/services/httpClient";

const httpClient = new HttpClient();
import { mapMutations } from "vuex";

import NotificationHelper from "@/helpers/notification";

export default {
  name: "kt-table",
  components: {},
  props: {
    url: {
      type: String,
      required: true,
    },
    currentLimit: {
      type: Number,
      default: 10,
    },
    httpMethod: {
      type: String,
      default: "GET",
    },
    queryParams: {
      type: Object,
      required: false,
      defatul: {},
    },
    keyPage: {
      type: String,
      default: "page",
    },
    keyPageSize: {
      type: String,
      default: "pageSize",
    },
  },
  data() {
    return {
      total: 9999,
      currentPage: 1,
      loading: true,
      list: [],
    };
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
    queryParams: {
      deep: true,
      handler() {
        this.currentPage = 1;
        this.fetchData();
      },
    },
    extraQueryParams: {
      deep: true,
      handler() {
        this.fetchData();
      },
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.SET_LOADER(true);
      let params = {
        [this.keyPage]: this.currentPage,
        [this.keyPageSize]: this.currentLimit,
      };
      Object.assign(params, this.queryParams);
      const { ok, data } = await httpClient.get(this.url, params);

      if (!ok) {
        return NotificationHelper.error("Errores al cargar la tabla");
      }

      this.loading = false;
      this.SET_LOADER(false);

      this.list = data.results;
      this.total = data.count;
      if (!data.count && data.count !== 0)
        console.error("The property 'count' was not found");
    },
    ...mapMutations("loader", ["SET_LOADER"]),
  },
  computed: {
    sequence() {
      if (this.total == 0) return [];
      const sequence = generateFromObj({
        curPage: this.currentPage,
        numPages: Math.ceil(this.total / this.currentLimit),
      });
      return sequence;
    },
  },
};
</script>

<style>
.pagination .page-item:hover {
  cursor: pointer;
}
</style>
