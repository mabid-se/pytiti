<script>
import { mapGetters } from "vuex";
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import { saveRequestSiaService } from "@/services/sia";
import _ from "lodash";

export default {
  page: {
    title: "Grid Js",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      pages: [],
      usersiadata: {},
      user: {},
      grouped_system: {},
      checkeditems: {},
      checkedtramits: {},
      correo_institucional: false,
      internet: false,
      solicitudes_adicionales: "",
      tramites: [],
      search: "",
    };
  },
  name: "Widgets",
  components: {
    Layout,
    PageHeader,
  },
  computed: {
    ...mapGetters("siaOperations", {
      siaData: "siaData",
    }),
    
    displayedPosts() {
      if (Object.keys(this.tramites).length > 1) {
        return this.paginate(this.tramites);
      }
      return this.tramites;
    },

    resultQuery() {
      if (this.search && this.tramites !== undefined) {        
        const search = this.search.toLowerCase();
        let tempTramites = this.tramites;
        tempTramites = Object.values(tempTramites).filter((data) => {
          return (
            data?.titulo?.toLowerCase().includes(search) ||
            data?.fid_servicio.toLowerCase().includes(search)
          );
        });
        return tempTramites;

      } else {
        return this.displayedPosts;
      }
    },
  },
  methods: {
    setPages() {
      if (this.tramites !== undefined){
        let numberOfPages = Math.ceil(Object.keys(this.tramites).length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      }
    },    
    paginate(data) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return Object.values(data).slice(from, to);
    },

    updateCheck(event) {
      this.checkeditems = this.grouped_system;
    },
    updateCheck2(event) {
      this.checkedtramits = this.tramites;
    },
    login: function () {
      this.$router.push("/sia/signin");
    },
    continuar: function (event) {
      let _items = Object.values(this.checkeditems);
      let _tramits = Object.values(this.checkedtramits);
      const fn = _.spread(_.union);
      let data = {
        items: fn(_items),
        tramites: _tramits, //to be create only checks //_.filter(_tramits, function(o) { return o.checked; }),
        correo_institucional: this.correo_institucional,
        internet: this.internet,
        solicitudes_adicionales: this.solicitudes_adicionales,
        usuario: this.user,
      };
      saveRequestSiaService(data).then(
        (res) => {
          if (res.mensaje === "success") {
            //this.setSiaData(res);
            //this.$router.push('/sia/signin-modal');
          }
          if (res.mensaje == "Not found") {
            console.log("Open modal where show the message.");
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  mounted() {
    this.usersiadata = this.$store.getters["siaOperations/siaData"].datos;
    this.user = this.$store.getters["siaOperations/siaData"].usuario;
    const items = JSON.parse(
      JSON.stringify(this.$store.getters["siaOperations/siaData"])
    );
    this.grouped_system = _.groupBy(
      items.solicitudes,
      (item) => item.system["sis_name"]
    );
    let _tramits = _.mapValues(items.tramites, function (val, key) {
      val.enabled = false;
      return val;
    }); 
    //this.tramites = _tramits;
    //const tt = JSON.parse(JSON.stringify(_tramits));
    console.log(typeof(_tramits));
    this.tramites = _tramits;
    this.setPages();
    // load initial datas to sent;
    this.checkeditems = this.grouped_system;
    this.checkedtramits = _tramits;
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <!-- end row -->
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-12 col-xl-12">
            <div class="card">
              <div class="card-body">
                <div class="text-center mt-2">
                  <h5 class="text-verde">Solicitud de acceso a sistemas</h5>
                  <p class="text-muted">Seleccione los sistemas y servicios</p>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="live-preview">
                          <div>
                            <h5 class="text-muted text-uppercase fs-13 mb-4">
                              Datos personales
                            </h5>
                            <div class="row g-3 mb-3">
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >CI:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.nroci
                                }}</span>
                              </div>
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Email:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.correo
                                }}</span>
                              </div>
                              <div class="col-lg-12 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Nombres:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.nombres
                                }}</span>
                              </div>
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Apellido Paterno:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.apellidoPaterno
                                }}</span>
                              </div>
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Apellido Materno:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.apellidoMaterno
                                }}</span>
                              </div>
                            </div>
                            <h5 class="text-muted text-uppercase fs-13 mb-4">
                              Datos institucionales
                            </h5>
                            <div class="row g-3 mb-3">
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Oficina:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.oficina
                                }}</span>
                              </div>
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Departamental:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.distrital
                                }}</span>
                              </div>
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Cargo:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.cargo
                                }}</span>
                              </div>
                              <!-- <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Unidad:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.distrital
                                }}</span>
                              </div> -->
                              <div class="col-lg-6 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Área:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.area
                                }}</span>
                              </div>
                              <!-- <div class="col-lg-12 mt-menor">
                                <label for="basic-url" class="form-label"
                                  >Profesión/Ocupación:</label
                                >
                                <span class="text-muted ml-1 mb-0">{{
                                  usersiadata.distrital
                                }}</span>
                              </div> -->
                            </div>
                            <h5 class="text-muted text-uppercase fs-13">
                              Servicios
                            </h5>
                            <div class="row g-3 mb-3 ml-sm">
                              <div class="form-check mb-2 col-lg-4">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="formCheck1"
                                  v-model="internet"
                                  value="internet"
                                />
                                <label
                                  class="form-check-label"
                                  for="formCheck1"
                                >
                                  INTERNET</label
                                >
                              </div>
                              <div class="form-check mb-2 col-lg-4">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="formCheck3"
                                  v-model="correo_institucional"
                                  value="correo_institucional"
                                />
                                <label
                                  class="form-check-label"
                                  for="formCheck2"
                                >
                                  CORREO INSTITUCIONAL</label
                                >
                              </div>
                            </div>
                            <h5 class="text-muted text-uppercase fs-13">
                              Aplicaciones
                            </h5>
                            <div class="row g-3 mb-3">
                              <div class="col-12">
                                <div class="card">
                                  <!-- end card header -->
                                  <div class="card-body-full">
                                    <div class="live-preview">
                                      <b-accordion>
                                        <b-accordion-item
                                          title="PAITITI (PPadron)"
                                          visible
                                        >
                                          <div class="row">
                                            <div class="card-full">
                                              <div class="card-body" id="hello">
                                                <div
                                                  class="table-responsive table-card"
                                                >
                                                  <label
                                                    class="form-label col-auto fw-bold"
                                                    >Buscar trámite:</label
                                                  >
                                                  <div class="col-md-3 mb-3">
                                                    <input
                                                      type="text"
                                                      id="name"
                                                      class="form-control"
                                                      v-model="search"
                                                    />
                                                  </div>
                                                  <table
                                                    class="table align-middle table-striped table-nowrap-"
                                                    id="customerTable"
                                                  >
                                                    <thead
                                                      class="table-light text-muted"
                                                    >
                                                      <tr>
                                                        <th
                                                          class="sort"
                                                          data-sort="currency_name"
                                                          scope="col"
                                                        >
                                                          Código
                                                        </th>
                                                        <th
                                                          class="sort"
                                                          data-sort="current_value"
                                                          scope="col"
                                                        >
                                                          Trámite
                                                        </th>
                                                        <th scope="col">
                                                          Solicitud
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <!--end thead-->
                                                    <tbody class="list form-check-all" >
                                                      <tr v-for="( data, index ) of resultQuery" :key="index">
                                                        <td class="id"> {{ data.fid_servicio }} </td>
                                                        <td> {{ data.titulo }} </td>
                                                        <td>
                                                          <div
                                                            class="form-check mb-2"
                                                          >
                                                            <input
                                                              class="form-check-input mr-1"
                                                              type="checkbox"
                                                              :value="data.id"
                                                              v-model="
                                                                data.enabled
                                                              "
                                                              :checked="
                                                                data.enabled
                                                              "
                                                              @input="
                                                                updateCheck2
                                                              "
                                                            />
                                                            <label
                                                              class="form-check-label"
                                                              for="formCheck1"
                                                            ></label>
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
                                                        class="page-item pagination-prev"
                                                        v-if="page != 1"
                                                        @click="page--"
                                                      >
                                                        Previous
                                                      </a>
                                                      <ul class="pagination listjs-pagination mb-0">
                                                        <li
                                                        :class="{ active: pageNumber == page, disabled: pageNumber == '...',}"
                                                          v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                                                          :key="index"
                                                          @click="page = pageNumber"
                                                        >
                                                          <a class="page">{{ pageNumber }}</a>
                                                        </li>
                                                      </ul>
                                                      <a
                                                        class="page-item pagination-next"
                                                        @click="page++"
                                                        v-if="page < pages.length"
                                                      >
                                                        Next
                                                      </a>
                                                    </div>
                                                 </div>
                                              </div>
                                            </div>
                                          </div>
                                        </b-accordion-item>
                                        <b-accordion-item
                                          v-for="(
                                            data, title
                                          ) of grouped_system"
                                          :title="title"
                                        >
                                          <div
                                            class="form-check mb-2 col-lg-6"
                                            v-for="(d, i) of data"
                                            :key="i"
                                          >
                                            <input
                                              class="form-check-input"
                                              type="checkbox"
                                              :value="d.id"
                                              v-model="d.checked"
                                              :checked="d.checked"
                                              @input="updateCheck"
                                            />
                                            <label class="form-check-label">
                                              {{ d.system.item }}</label
                                            >
                                          </div>
                                        </b-accordion-item>
                                      </b-accordion>
                                    </div>
                                  </div>
                                  <!-- end card-body -->
                                </div>
                                <!-- end card -->
                              </div>
                              <!--end col-->
                              <h5 class="text-muted text-uppercase fs-13">
                                OTRAS APLICACIONES U BD
                              </h5>
                              <div class="col-lg-12">
                                <label
                                  for="exampleFormControlTextarea5"
                                  class="form-label"
                                  >Escriba sus solicitudes adicionales</label
                                >
                                <textarea
                                  class="form-control"
                                  id="exampleFormControlTextarea5"
                                  v-model="solicitudes_adicionales"
                                  rows="3"
                                ></textarea>
                              </div>
                              <div class="text-center mt-3">
                                <button
                                  type="button"
                                  class="btn btn-success waves-effect waves-light"
                                  v-on:click="continuar"
                                  data-bs-toggle="modal"
                                  data-bs-target=".bs-example-modal-center"
                                >
                                  Enviar solicitud
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end col-->
                </div>
                <!--end row-->
              </div>
              <!-- end card-body -->
            </div>
            <div class="col-xxl-12">
              <div class="">
                <div>
                  <!-- center modal
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".bs-example-modal-center">Center Modal</button> 
                        -->
                  <teleport to="#modals">
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
                              <h4 class="mb-3">Solicitud enviada</h4>
                              <p class="text-muted mb-4">
                                Se procedera a verificar y validarlo.
                              </p>
                              <div class="hstack gap-2 justify-content-center">
                                <button
                                  type="button"
                                  class="btn btn-light"
                                  data-bs-dismiss="modal"
                                  v-on:click="login"
                                >
                                  Cerrar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                      <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
                  </teleport>
                </div>
              </div>
              <!-- end card-body -->
              <!-- end card -->
            </div>
            <!-- end card -->
            <div class="container">
              <div class="row">
                <div class="col-6 mt-0 izquierda">
                  <a
                    href="signup"
                    class="text-primary text-decoration-underline"
                  ></a>
                </div>
                <div class="col-6 derecha">
                  <a
                    href="#"
                    class="text-primary text-decoration-underline"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-footer-black">
                &copy; {{ new Date().getFullYear() }} - SENASAG
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
