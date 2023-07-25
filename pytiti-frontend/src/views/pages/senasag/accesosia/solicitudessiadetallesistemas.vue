<script>
    import Layout from "../../../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../../../app.config";
    import { retrieveUserRequestSiaService, approveRequestSiaService } from "@/services/sia";
    import _ from "lodash";
  

    export default {
      page: {
        title: "SOLICITUDES SIA",
        meta: [{ name: "description", content: appConfig.description }],
      },
      props: {
        uid: {
          default() {
            return 0
          }
        },
      },
      data() {
        return {
          title: "SOLICITUDES SIA - Vobo",
          page: 1,
          perPage: 5,
          pages: [],
          grouped_system: {},
          usersiadata: {},
          checkeditems: {},
          services: [],
          solicitudes_adicionales: ''
        };
      },
      name: "Widgets",
      components: {
        Layout,
        PageHeader,
      },
      computed: { },
      watch: { },
      created() { },
      filters: { },
      methods: {
        /* fetchUser(){
          if (this.uid){
            console.log(this.uid);
          }
        }, */
        backPage() {
          this.$router.replace({
              name: 'solicitudessia',
          })
        },
        formatApellido(value, pos) {
          if (value) return value.split(' ')[pos];
          return value;
        },
        updateCheck (event) {
          this.checkeditems = this.grouped_system
          console.log(this.checkeditems);
        },
        aprobar: function (event) {
          let _items = Object.values(this.checkeditems);
          const fn = _.spread(_.union);
          const result = fn(_items);
          let data = {"items_to_validate": result};
          console.log(data);
          approveRequestSiaService(data, this.uid)
              .then(
                  (res) => {
                    alert("OK");
                    console.log(res);
                  },
                  err => {  
                    console.error(err);
                  }
              );
        }
      },
      mounted () {
        this.usersiadata = this.$store.getters["siaOperations/siaData"].user_request;
        if(this.usersiadata/*  ==! undefined */){
          this.services = JSON.parse(this.usersiadata['servicios']);
          this.solicitudes_adicionales = JSON.parse(this.usersiadata['solicitudes_adicionales']);
          console.log(this.solicitudes_adicionales);
        }
        if (this.uid){
            retrieveUserRequestSiaService(this.uid)
                .then(
                    (res) => {
                      const items = JSON.parse(JSON.stringify(res.results))
                      this.grouped_system = _.groupBy(items, item => item.system['sis_name']);
                    },
                    err => {
                        console.error(err);
                    }
                );
        }
      },
    };
    </script>

<template>
    <Layout>
        <PageHeader :title="title"/>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">Detalle de la solicitud</h4>
                    </div>
                    <!-- end card header -->
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
                                        <button type="button" class="btn btn-success btn-label" @click="backPage()">
                                            <i class="ri ri-arrow-left-s-line label-icon align-middle fs-16 me-2"></i>Regresar </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="card">
                                    <div class="card-body" id="hello">
                                        <div class="table-responsive table-card">
                                            <div class="row-">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="live-preview">
                                                                <div>
                                                                    <h5 class="text-muted text-uppercase fs-13 mb-4">Datos personales</h5>
                                                                    <div class="row g-3 mb-3">
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">CI:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.nro_ci}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Email:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.user?.email}}</span>
                                                                        </div>
                                                                        <div class="col-lg-12 mt-menor">
                                                                            <label for="basic-url" class="form-label">Nombres:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{ usersiadata.user?.first_name}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Ap. Paterno:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{ formatApellido(usersiadata.user?.last_name, 0) }}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Ap. Materno:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{ formatApellido(usersiadata.user?.last_name, 1) }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <h5 class="text-muted text-uppercase fs-13 mb-4">Datos institucionales</h5>
                                                                    <div class="row g-3 mb-3">
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Oficina:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.oficina}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Distrital:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.distrital}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Cargo:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.cargo}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Unidad:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.distrital}}</span>
                                                                        </div>
                                                                        <div class="col-lg-6 mt-menor">
                                                                            <label for="basic-url" class="form-label">Área:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.area}}</span>
                                                                        </div>
                                                                        <div class="col-lg-12 mt-menor">
                                                                            <label for="basic-url" class="form-label">Profesión/Ocupación:</label>
                                                                            <span class="text-muted ml-1 mb-0">{{usersiadata.distrital}}</span>
                                                                        </div>
                                                                    </div>
                                                                    <h5 class="text-muted text-uppercase fs-13">USUARIO CON PERMISO DE VISTO BUENO</h5>
                                                                    <div class="row g-3 mb-3 ml-sm">
                                                                      <div class="form-check form-switch form-switch-lg" dir="ltr">
                                                                      <input type="checkbox" class="form-check-input" id="customSwitchsizelg">
                                                                      <label class="form-check-label" for="customSwitchsizelg">Asignar VoBo</label>
                                                                      </div>
                                                                    </div>
                                                                    <h5 class="text-muted text-uppercase fs-13">Servicios</h5>
                                                                    <div class="row g-3 mb-3 ml-sm">
                                                                        <div class="form-check mb-2 col-lg-4">
                                                                            <input class="form-check-input" type="checkbox" v-model="services.internet">
                                                                            <label class="form-check-label" for="formCheck1"> INTERNET</label>
                                                                        </div>
                                                                        <div class="form-check mb-2 col-lg-4">
                                                                            <input class="form-check-input" type="checkbox" v-model="services.correo_institucional">
                                                                            <label class="form-check-label" for="formCheck1"> CORREO INSTITUCIONAL</label>
                                                                        </div>
                                                                    </div>
                                                                    <h5 class="text-muted text-uppercase fs-13">Aplicaciones</h5>
                                                                    <div class="row g-3 mb-3">
                                                                        <div class="col-12">
                                                                            <div class="card">
                                                                                <!-- end card header -->
                                                                                <div class="card-body-full">
                                                                                    <div class="live-preview">
                                                                                        <b-accordion>
                                                                                            <b-accordion-item v-for="(data, title) of grouped_system" :title="title">
                                                                                                <div class="form-check mb-2 col-lg-6" v-for="(d, i) of data" :key="i">
                                                                                                    <input class="form-check-input" type="checkbox" :value="d.id" v-model="d.checked" :checked="d.checked" @input="updateCheck">
                                                                                                    <label class="form-check-label" for="formCheck1"> {{ d.system.item }}</label>
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
                                                                        <h5 class="text-muted text-uppercase fs-13">OTRAS APLICACIONES U BD</h5>
                                                                        <div class="col-lg-12">
                                                                            <label for="exampleFormControlTextarea5" class="form-label">Escriba sus solicitudes adicionales</label>
                                                                            <textarea class="form-control" id="exampleFormControlTextarea5" rows="3" v-model="solicitudes_adicionales.solicitudes_adicionales"></textarea>
                                                                        </div>
                                                                        <div class="text-center mt-3">
                                                                            <button type="button" class="btn btn-success waves-effect waves-light" @click="aprobar">Guardar y enviar a Sistemas</button>
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