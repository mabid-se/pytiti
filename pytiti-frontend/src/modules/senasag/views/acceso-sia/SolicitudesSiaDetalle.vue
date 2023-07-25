<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../../app.config";
import SuccessModal from "@/components/pytiti/success-modal.vue";
//import { getToken } from "./token";

import {
  retrieveUserRequestSiaService,
  approveRequestSiaService,
  attachedAndApproveService,
  retrieveUserTramitesSiaService,
  retrieveUserData,
  updateTramitUserSiaService,
  updatePermisionUserSiaService,
  userDataPDFSiaService,
} from "@/services/sia";
import {
  getRolesSiaService,
  getPermissionsSiaService,
} from "@/services/permisos";
import _ from "lodash";
export default {
  page: {
    title: "SOLICITUDES SIA",
    meta: [{ name: "description", content: appConfig.description }],
  },
  props: {
    uid: {
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      iframeSrc: "form/form_sia_v2.html",
      page: 1,
      perPage: 5,
      pages: [],
      grouped_system: {},
      usersiadata: {},
      checkeditems: {},
      internet: false,
      correo_institucional: false,
      solicitudes_adicionales: "",
      sia_is_system: false,
      attached_file: false,
      file: "",
      tramites: {},
      search: "",
      options_roles: [],
      groups: [],
      all_selected_group: false,
      modalData: {
        id: "createModal",
        title: "Validación de usuario correcta.",
        buttonText: "Aceptar",
        redirectUrl: "/senasag/accesosia/solicitudes-sia",
      },
    };
  },
  name: "Widgets",
  components: {
    PageHeader,
    SuccessModal,
  },
  computed: {
    displayedPosts() {
      if (this.tramites.length > 1) {
        return this.paginate(this.tramites);
      }
      return this.tramites;
    },
    resultQuery() {
      if (this.search) {
        const search = this.search.toLowerCase();
        return this.tramites.filter((data) => {
          console.log(data);
          return (
            data.tramite.title?.toLowerCase().includes(search) ||
            data.tramite?.fid_servicio?.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {},
  filters: {},
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.tramites.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(data) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return data.slice(from, to);
    },
    backPage() {
      this.$router.replace({
        name: "solicitudes.sia",
      });
    },
    formatApellido(value, pos) {
      if (value) return value.split(" ")[pos];
      return value;
    },
    updateCheckSystem(event) {
      this.checkeditems = this.grouped_system;
    },
    updateCheckTramit(data) {
      this.updateTramitOperations(data.id, data);
    },
    reviewed_aprobar: function (event) {
      let _items = Object.values(this.checkeditems);
      const fn = _.spread(_.union);
      const result = fn(_items);
      let data = {
        items_to_validate: result,
        //services: _services,
        internet: this.internet,
        correo_institucional: this.correo_institucional,
        solicitudes_adicionales: this.solicitudes_adicionales,
      }; // "is_vo_bo": this.vo_bo};
      approveRequestSiaService(data, this.uid).then(
        (res) => {
          if (!this.sia_is_system) {
            document.getElementById("close").click();
          } else {
            this.attached_file = true;
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.file = files;
    },
    approve() {
      console.log(this.groups);
      if (!this.file || !this.file[0]) {
        this.$notify({
          title: "Validación",
          text: "Es necesario adjuntar un archivo para validar la aprobación",
          type: "error",
        });
        return;
      }

      attachedAndApproveService(
        this.file[0],
        this.usersiadata.id,
        this.uid
      ).then(
        (res) => {
          if (res.result["message"] == "successfully") {
            this.modalData["message"] =
              "El usuario " +
              this.usersiadata.user.first_name +
              " se valido correctamente.";
            document.querySelector("#show-confirm").click();
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    onChangeRol(data) {
      this.updateTramitOperations(data.id, data);
    },
    updateTramitOperations(id, data) {
      updateTramitUserSiaService(id, data).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    updateGrandPermisions(id, data) {
      updatePermisionUserSiaService(id, data).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    selectAll: function () {
      if (!this.all_selected_group) {
        this.groups = _.mapValues(this.groups, function (val) {
          val.checked = true;
          return val;
        });
      } else {
        this.groups = _.mapValues(this.groups, function (val) {
          val.checked = false;
          return val;
        });
      }
      this.updateGrandPermisions(this.usersiadata.id, { data: this.groups });
    },
    addPermision: function (data) {
      this.groups = _.mapValues(this.groups, function (val) {
        if (val.value == data.value) {
          val.checked = data.checked;
        }
        return val;
      });
      this.updateGrandPermisions(this.usersiadata.id, { data: this.groups });
    },
    downloadFile(response, filename) {
        var url = window.URL.createObjectURL(response);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename + '.pdf';
        document.body.appendChild(a);
        a.click();    
        a.remove();
    },
    print() {
      userDataPDFSiaService(this.uid)
      .then(response => response.blob())
      .then(blob => {
            this.downloadFile(blob, this.uid);
      });
    },
    retrieve_groups(gps) {
      let tmp_groups = this.groups;
      this.groups = _.mapValues(tmp_groups, function (val) {
        if (gps.includes(val.value)) {
          val.checked = true;
        }
        return val;
      });
    },
  },
  mounted() {
    getRolesSiaService().then(
      (res) => {
        const items = JSON.parse(JSON.stringify(res.results));
        this.options_roles = items;
      },
      (err) => {
        console.error(err);
      }
    );
    getPermissionsSiaService().then(
      (res) => {
        const items = JSON.parse(JSON.stringify(res.results));
        let admins_roles = _.filter(items, function (o) {
          return o.permission_type == "administration";
        });
        let tmp_usersiadata =
          this.$store.getters["siaOperations/siaData"].user_request;
        this.groups = _.mapValues(admins_roles, function (val) {
          val.checked = false;
          if (tmp_usersiadata !== undefined) {
            if (tmp_usersiadata.user.groups.includes(val.value)) {
              val.checked = true;
            }
          }
          return val;
        });
      },
      (err) => {
        console.error(err);
      }
    );

    if (this.$store.state.authfack.user.profile) {
      let admin_groups = Object.values(
        this.$store.state.authfack.user.profile.groups
      );
      if (
        admin_groups.includes("interno-sia-sistemas-departamental") ||
        admin_groups.includes("interno-sia-sistemas-nacional")
      ) {
        this.sia_is_system = true;
      }
    }
    this.usersiadata =
      this.$store.getters["siaOperations/siaData"].user_request;
    if (this.usersiadata) {
      this.internet = this.usersiadata.internet;
      this.correo_institucional = this.usersiadata.correo_institucional;
      this.solicitudes_adicionales = this.usersiadata.solicitudes_adicionales;

      if (this.usersiadata.user.groups.length > 0) {
        this.retrieve_groups(this.usersiadata.user.groups);
      }
    }
    //this.sia_is_system = this.$store.getters["siaOperations/siaUserIsSystem"];
    if (!this.usersiadata) {
      retrieveUserData(this.$route.params["uid"]).then(
        (res) => {
          const item = JSON.parse(JSON.stringify(res));
          this.usersiadata = item.user_request;
          this.internet = this.usersiadata.internet;
          this.correo_institucional = this.usersiadata.correo_institucional;
          this.solicitudes_adicionales =
            this.usersiadata.solicitudes_adicionales;
          if (this.usersiadata.user.groups.length > 0) {
            this.retrieve_groups(this.usersiadata.user.groups);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
    if (this.uid) {
      retrieveUserRequestSiaService(this.uid).then(
        (res) => {
          const items = JSON.parse(JSON.stringify(res.results));
          this.grouped_system = _.groupBy(
            items,
            (item) => item.system["sis_name"]
          );
        },
        (err) => {
          console.error(err);
        }
      );
      retrieveUserTramitesSiaService(this.uid).then(
        (res) => {
          const items = JSON.parse(JSON.stringify(res.results));
          this.tramites = items;
          this.setPages();
        },
        (err) => {
          console.error(err);
        }
      );
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row margen-contenido" >
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Detalle de la solicitud</h4>
          </div>
          <!-- end card header -->
          <div class="col-xxl-12">
            <div class="">
              <button
                style="visibility: hidden"
                data-bs-toggle="modal"
                data-bs-target=".bs-example-modal-center"
                id="close"
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
                        <h4 class="mb-3">Solicitud Revisada</h4>
                        <p class="text-muted mb-4">
                          Se procedera a validar por el encargado de sistemas
                        </p>
                        <div class="hstack gap-2 justify-content-center">
                          <button
                            type="button"
                            class="btn btn-light"
                            data-bs-dismiss="modal"
                            @click="backPage()"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SuccessModal @send-confirmation="confirmDelete" :attrs="modalData" />
          <a
            id="show-confirm"
            :href="`#${modalData.id}`"
            :data-bs-target="`#${modalData.id}`"
            data-bs-toggle="modal"
            style="display: none"
          ></a>

          <div class="card-body">
            <div>
              <div class="row g-4 mb-3">
                <div class="col-sm-auto">
                  <div>
                    <div class="search-box ms-2"></div>
                  </div>
                </div>
                <div class="col-sm">
                  <div class="d-flex justify-content-sm-end">
                    <button
                      type="button"
                      class="btn btn-success btn-label"
                      @click="backPage()"
                    >
                      <i
                        class="ri ri-arrow-left-s-line label-icon align-middle fs-16 me-2"
                      ></i
                      >Regresar
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="card">
                  <div class="row-">
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
                                    usersiadata?.nro_ci
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Email:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.user?.email
                                  }}</span>
                                </div>
                                <div class="col-lg-12 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Nombres:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.user?.first_name
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Ap. Paterno:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    formatApellido(
                                      usersiadata?.user?.last_name,
                                      0
                                    )
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Ap. Materno:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    formatApellido(
                                      usersiadata?.user?.last_name,
                                      1
                                    )
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
                                    usersiadata?.oficina
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Distrital:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.distrital
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Cargo:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.cargo
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Unidad:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.distrital
                                  }}</span>
                                </div>
                                <div class="col-lg-6 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Área:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.area
                                  }}</span>
                                </div>
                                <div class="col-lg-12 mt-menor">
                                  <label for="basic-url" class="form-label"
                                    >Profesión/Ocupación:</label
                                  >
                                  <span class="text-muted ml-1 mb-0">{{
                                    usersiadata?.distrital
                                  }}</span>
                                </div>
                              </div>
                              <div v-if="sia_is_system">
                                <h5 class="text-muted text-uppercase fs-13">
                                  PERMISOS DE AMINISTRACIÓN:
                                </h5>
                                <div class="row g-3 mb-3 ml-sm">
                                  <div
                                    class="form-check mb-1"
                                    v-for="(data, index) of groups"
                                    :key="index"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      :name="data.name"
                                      @change="addPermision(data)"
                                      v-model="data.checked"
                                      :value="data.value"
                                      :id="index"
                                      :disabled="attached_file"
                                    />
                                    <label
                                      :for="data.name"
                                      class="form-check-label"
                                    >
                                      {{ data.name }}
                                    </label>
                                  </div>
                                  <div class="form-check form-check-dark">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="formCheck12"
                                      @click="selectAll"
                                      v-model="all_selected_group"
                                      :disabled="attached_file"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="formCheck12"
                                    >
                                      SELECCIONAR TODOS
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <h5 class="text-muted text-uppercase fs-13">
                                Servicios
                              </h5>
                              <div class="row g-3 mb-3 ml-sm">
                                <div class="form-check mb-2 col-lg-4">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="internet"
                                    :disabled="attached_file"
                                  />
                                  <label class="form-check-label">
                                    INTERNET
                                  </label>
                                </div>
                                <div class="form-check mb-2 col-lg-4">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="correo_institucional"
                                    :disabled="attached_file"
                                  />
                                  <label class="form-check-label">
                                    CORREO INSTITUCIONAL</label
                                  >
                                </div>
                              </div>
                              <h5 class="text-muted text-uppercase fs-13">
                                Aplicaciones
                              </h5>
                              <div class="row g-3 mb-3" v-if="!attached_file">
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
                                                <div
                                                  class="card-body"
                                                  id="hello"
                                                >
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
                                                            Solicitados
                                                          </th>
                                                          <th
                                                            scope="col"
                                                            width="180px"
                                                          >
                                                            Rol
                                                          </th>
                                                        </tr>
                                                      </thead>
                                                      <!--end thead-->
                                                      <tbody
                                                        class="list form-check-all"
                                                      >
                                                        <tr
                                                          v-for="(
                                                            data, index
                                                          ) of resultQuery"
                                                          :key="index"
                                                        >
                                                          <td class="id">
                                                            {{
                                                              data.tramite
                                                                .fid_servicio
                                                            }}
                                                          </td>
                                                          <td>
                                                            {{
                                                              data.tramite.title
                                                            }}
                                                          </td>
                                                          <td>
                                                            <div
                                                              class="form-check mb-2"
                                                            >
                                                              <input
                                                                class="form-check-input mr-1"
                                                                type="checkbox"
                                                                :value="
                                                                  data.enabled
                                                                "
                                                                v-model="
                                                                  data.enabled
                                                                "
                                                                :checked="
                                                                  data.enabled
                                                                "
                                                                @change="
                                                                  updateCheckTramit(
                                                                    data
                                                                  )
                                                                "
                                                              />
                                                              <label
                                                                class="form-check-label"
                                                                for="formCheck1"
                                                              ></label>
                                                            </div>
                                                          </td>
                                                          <td>
                                                            <select
                                                              v-model="data.rol"
                                                              class="form-select"
                                                              aria-label="Default select example"
                                                              @change="
                                                                onChangeRol(
                                                                  data
                                                                )
                                                              "
                                                            >
                                                              <option
                                                                :value="null"
                                                                selected
                                                                disabled
                                                              >
                                                                Asignar un rol
                                                              </option>
                                                              <option
                                                                v-for="(
                                                                  option, index
                                                                ) in options_roles"
                                                                :key="index"
                                                                :value="
                                                                  option.id
                                                                "
                                                              >
                                                                {{
                                                                  option.name
                                                                }}
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <!--end tbody-->
                                                    </table>
                                                  </div>
                                                  <div
                                                    class="d-flex justify-content-end mt-3"
                                                  >
                                                    <div
                                                      class="pagination-wrap hstack gap-2"
                                                    >
                                                      <a
                                                        class="page-item pagination-prev"
                                                        v-if="page != 1"
                                                        @click="page--"
                                                      >
                                                        Previous
                                                      </a>
                                                      <ul
                                                        class="pagination listjs-pagination mb-0"
                                                      >
                                                        <li
                                                          :class="{
                                                            active:
                                                              pageNumber ==
                                                              page,
                                                            disabled:
                                                              pageNumber ==
                                                              '...',
                                                          }"
                                                          v-for="(
                                                            pageNumber, index
                                                          ) in pages.slice(
                                                            page - 1,
                                                            page + 5
                                                          )"
                                                          :key="index"
                                                          @click="
                                                            page = pageNumber
                                                          "
                                                        >
                                                          <a class="page">{{
                                                            pageNumber
                                                          }}</a>
                                                        </li>
                                                      </ul>
                                                      <a
                                                        class="page-item pagination-next"
                                                        @click="page++"
                                                        v-if="
                                                          page < pages.length
                                                        "
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
                                            :key="title"
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
                                                @input="updateCheckSystem"
                                              />
                                              <label
                                                class="form-check-label"
                                                for="formCheck1"
                                              >
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
                                    rows="3"
                                    v-model="solicitudes_adicionales"
                                  ></textarea>
                                </div>
                                <div class="text-center mt-3">
                                  <button
                                    v-if="sia_is_system"
                                    type="button"
                                    class="btn btn-success waves-effect waves-light"
                                    @click="reviewed_aprobar"
                                  >
                                    Guardar
                                  </button>
                                  <button
                                    v-else
                                    type="button"
                                    class="btn btn-success waves-effect waves-light"
                                    @click="reviewed_aprobar"
                                  >
                                    Guardar y enviar a Sistemas
                                  </button>
                                </div>
                              </div>

                              <div class="row g-3 mb-3" v-if="attached_file">
                                <!--end col-->
                                <div class="cardbold">
                                  <div
                                    class="card-header align-items-center d-flex"
                                  >
                                    <h5 class="card-title mb-0 flex-grow-1">
                                      Documentos de aprobación
                                    </h5>
                                  </div>
                                  <!-- end card header -->
                                  <div class="card-body">
                                    <div class="live-preview">
                                      <div class="row gy-4">
                                        <div
                                          class="col-sm-12 col-lg-12 col-xxl-12"
                                        >
                                          <div>
                                            <b-button
                                              @click="print"
                                              variant="primary"
                                              class="btn btn-primary waves-effect waves-light mr-1 mb-4"
                                              >Imprimir formulario de
                                              respaldo</b-button
                                            >
                                          </div>
                                          <div>
                                            <label
                                              for="formFile"
                                              class="form-label"
                                              >Adjuntar documento firmado</label
                                            >
                                            <input
                                              class="form-control w-50"
                                              type="file"
                                              id="formFile"
                                              @change="onFileChange"
                                            />
                                          </div>
                                        </div>
                                        <!--end col-->
                                      </div>
                                      <!--end row-->
                                    </div>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="text-center mt-3">
                                    <div class="card-body-">
                                      <div class="live-preview-">
                                        <!-- Base Buttons -->
                                        <b-button
                                          variant="success"
                                          class="waves-effect waves-light mr-1"
                                          @click="approve"
                                          >Guardar</b-button
                                        >
                                      </div>
                                    </div>
                                    <!-- end card-body -->
                                  </div>
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
