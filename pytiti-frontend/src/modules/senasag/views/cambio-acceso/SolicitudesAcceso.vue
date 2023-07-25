<script>
import { mapActions } from "vuex";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../../app.config";
import {
  getRequestUsersPasswordService,
  updateRequestPasswordService,
} from "@/services/sia";

export default {
  page: {
    title: "SOLICITUDES DE CAMBIO DE CONTRANA",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "SOLICITUDES DE CAMBIO DE CONTRANA",
      items: [
        {
          text: "Tables",
          href: "/",
        },
        {
          text: "SOLICITUDES DE CAMBIO DE CONTRANA",
          active: true,
        },
      ],
      data: [],
      page: 1,
      perPage: 5,
      pages: [],
      cancelData: [],
    };
  },
  name: "SolicituesSia",
  components: {
    PageHeader,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.data);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        console.log(search);
        return this.displayedPosts.filter((data) => {
          return (
            data.user.first_name.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  mounted() {
    if (this.$store.state.authfack.user.profile) {
      let admin_groups = Object.values(
        this.$store.state.authfack.user.profile.groups
      );
      if (
        admin_groups.includes("interno-sia-sistemas-departamental") ||
        admin_groups.includes("interno-sia-sistemas-nacional")
      ) {
        this.setSiaSytem(true);
      }
    }
    getRequestUsersPasswordService().then(
      (res) => {
        this.data = res.results;
      },
      (err) => {
        console.error(err);
      }
    );
  },
  methods: {
    ...mapActions("siaOperations", ["setSiaData", "setSiaSytem"]),
    setPages() {
      let numberOfPages = Math.ceil(this.data.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(data) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return data; //.slice(from, to);
    },
    markAsRequest() {
      let d = this.cancelData;
      updateRequestPasswordService(d.id).then(
        (res) => {
          this.data = this.data.map((e) => {
            if (e.id == d.id) {
              e.status = res.status;
            }
            return e;
          });
        },
        (err) => {
          console.error(err);
        }
      );
    },

    openModal_1(d) {
      this.cancelData = d;
      document.getElementById("atenderModal").click();
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row margen-contenido">
      <div class="col-12">
        <!-- end card header -->
        <div class="col-xxl-12">
          <div class="">
            <button
              style="visibility: hidden"
              data-bs-toggle="modal"
              data-bs-target=".bs-example-modal-center"
              id="atenderModal"
            ></button>
            <div
              class="modal fade bs-example-modal-center"
              tabindex="-1"
              role="dialog"
              aria-labelledby="mySmallModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body text-center p-5">
                    <lord-icon
                      src="https://cdn.lordicon.com/hrqwmuhr.json"
                      trigger="loop"
                      colors="primary:#121331,secondary:#08a88a"
                      style="width: 120px; height: 120px"
                    ></lord-icon>
                    <div class="mt-4">
                      <h4 class="mb-3">Marcar como solicidud atendia</h4>
                      <div class="hstack gap-2 justify-content-center">
                        <button
                          type="button"
                          class="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          cerrar
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-dismiss="modal"
                          @click="markAsRequest"
                        >
                          Atender
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Listado de Solicitudes</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <div id="customerList">
              <div class="row g-4 mb-3">
                <div class="col-sm-auto">
                  <div>
                    <div class="search-box ms-2">
                      <input
                        type="text"
                        class="form-control search"
                        placeholder="Buscar..."
                      />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
                  <div class="d-flex justify-content-sm-end"></div>
                </div>
              </div>
              <div class="row">
                <div class="card">
                  <div class="card-body" id="hello">
                    <div class="table-responsive table-card">
                      <table
                        class="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead class="table-light text-muted">
                          <tr>
                            <th
                              class="sort"
                              data-sort="currency_name"
                              scope="col"
                            >
                              Fecha
                            </th>
                            <th
                              class="sort"
                              data-sort="current_value"
                              scope="col"
                            >
                              Nombre
                            </th>
                            <th class="sort" data-sort="market_cap" scope="col">
                              Correo electronico
                            </th>
                            <th class="sort" data-sort="" scope="col">
                              Estado
                            </th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <!--end thead-->
                        <tbody class="list form-check-all">
                          <tr
                            v-for="(data, index) of resultQuery"
                            :key="index"
                            :style="{
                              background:
                                data?.status == 'procesado'
                                  ? '#ccc'
                                  : '',
                            }"
                          >
                            <td class="id">
                              {{
                                new Date(
                                  data.created_at
                                ).toLocaleString()
                              }}
                            </td>
                            <td>
                              {{ data.user.first_name }}
                              {{ data.user.last_name }}
                            </td>
                            <td class="market_cap">
                              {{ data.user.email }}
                            </td>
                            <td class="market_cap">
                              {{ data.status }}
                            </td>
                            <td>
                              <div class="list-grid-nav hstack gap-1">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-info btn-label right"
                                  id="dropdownMenuLink1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <div class="d-flex">
                                    <div class="flex-shrink-0">
                                      <i
                                        class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"
                                      ></i>
                                    </div>
                                    <div class="flex-grow-1">Opciones</div>
                                  </div>
                                </a>
                                <ul
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuLink1"
                                  data-popper-placement="bottom-start"
                                >
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      data-bs-toogle="tooltip"
                                      data-bs-original-title=""
                                      title=""
                                      @click="openModal_1(data)"
                                    >
                                      Marcar como atendido</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      data-bs-toogle="tooltip"
                                      data-bs-original-title=""
                                      title=""
                                      @click="markAsDelete(data)"
                                    >
                                      Eliminar</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <!--end tbody-->
                      </table>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <div class="pagination-wrap hstack gap-2">
                        <a
                          class="page-item pagination-prev disabled"
                          href="#"
                          v-if="page != 1"
                          @click="page--"
                        >
                          Anterior
                        </a>
                        <ul class="pagination listjs-pagination mb-0">
                          <li
                            :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                            v-for="(pageNumber, index) in pages.slice(
                              page - 1,
                              page + 5
                            )"
                            :key="index"
                            @click="page = pageNumber"
                          >
                            <a class="page" href="#">{{ pageNumber }}</a>
                          </li>
                        </ul>
                        <a
                          class="page-item pagination-next"
                          href="#"
                          @click="page++"
                          v-if="page < pages.length"
                        >
                          Siguiente
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
