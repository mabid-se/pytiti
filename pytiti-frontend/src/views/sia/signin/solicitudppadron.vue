<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
export default {
  page: {
    title: "Grid Js",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Grid Js",
      items: [
        {
          text: "Tables",
          href: "/",
        },
        {
          text: "Grid Js",
          active: true,
        },
      ],
      data: [
        {
          id: 52,
          name: "Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial",
          email: "jonathan@example.com",
          position: "Senior Implementation Architect",
          company: "Koelpin - Goldner",
          country: "Vanuatu",
        },
        {
          id: 53,
          name: "Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría Semi-industrial",
          email: "harold@example.com",
          position: "Forward Creative Coordinator",
          company: "Feeney, Langworth and Tremblay",
          country: "Niger",
        },
        {
          id: 54,
          name: "Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría Artesanal",
          email: "shannon@example.com",
          position: "Legacy Functionality Associate",
          company: "Streich Group",
          country: "Niue",
        },
        {
          id: 55,
          name: "Robert",
          email: "robert@example.com",
          position: "Product Accounts Technician",
          company: "Ebert, Schamberger and Johnston",
          country: "Mexico",
        },
        {
          id: 56,
          name: "Noel",
          email: "noel@example.com",
          position: "Customer Data Director",
          company: "Raynor, Rolfson and Daugherty",
          country: "Qatar",
        },
        {
          id: 57,
          name: "Tracl",
          email: "traci@example.com",
          position: "Corporate Identity Director",
          company: "Hauck Inc",
          country: "Holy See",
        },
        {
          id: 58,
          name: "Kerry",
          email: "kerry@example.com",
          position: "Lead Applications Associate",
          company: "Metz Inc",
          country: "Iran",
        },
        {
          id: 8,
          name: "Patsy",
          email: "patsy@example.com",
          position: "Dynamic Assurance Director",
          company: "Zemlak Group",
          country: "South Georgia",
        },
        {
          id: 9,

          name: "Cathy",
          email: "cathy@example.com",
          position: "Customer Data Director",
          company: "Hoeger",
          country: "San Marino",
        },
        {
          id: 10,
          name: "Tyrone",
          email: "yrone@example.com",
          position: "Senior Response Liaison",
          company: "Howell - Rippin",
          country: "Germany",
        },
      ],
      page: 1,
      perPage: 5,
      pages: [],
    };
  },
  name: "Widgets",
  components: {
    Layout,
    PageHeader,
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.data);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.id.toLowerCase().includes(search) ||
            data.name.toLowerCase().includes(search) ||
            data.email.toLowerCase().includes(search) ||
            data.position.toLowerCase().includes(search) ||
            data.company.toLowerCase().includes(search) ||
            data.country.toLowerCase().includes(search) 
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
  methods: {
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
      return data.slice(from, to);
    },
  },
};
</script>

<template>
    <div class="auth-page-wrapper pt-5">
            

            <!-- auth page content -->
            <div class="auth-page-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <a href="index.html" class="d-inline-block auth-logo">
                                        <img src="@/assets/images/logo-light2.png" alt="SENASAG" width="100%">
                                    </a>
                                </div>
                                <p class="mt-3 fs-15 fw-medium">PPADRON WEB - SENASAG</p>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-8 col-xl-8">
                            <div class="card">
                                    <div class="card-body">
                                        <div class="text-center mt-2">
                                        <h5 class="text-verde">Solicitud de acceso a trámites</h5>
                                        <p class="text-muted">Indique los trámites que desea administrar</p>
                                    </div> 
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                
                                                <div class="card-body">
                                                    <div class="live-preview">
                                                        <div class="mb-menor">
                                                            <h5 class="text-muted text-uppercase fs-13 mb-4">Datos personales</h5>                                                            
                                                            <div class="row g-3 mb-3">                                                                
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nombres:</label><span class="text-muted ml-1 mb-0">Juan Carlos</span>
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ap. Paterno:</label><span class="text-muted ml-1 mb-0">Perez</span>
                                                                </div>                                                                
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ap. Materno:</label><span class="text-muted ml-1 mb-0">Rojas</span>
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Email:</label><span class="text-muted ml-1 mb-0">jperez@senasag.gob.bo</span>                                                                    
                                                                </div>
                                                            </div>
                                                            <h5 class="text-muted text-uppercase fs-13 mb-4">Datos institucionales</h5>
                                                            <div class="row g-3 mb-3">
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Oficina:</label><span class="text-muted ml-1 mb-0">NAL</span>
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Distrital:</label><span class="text-muted ml-1 mb-0">BEN</span>
                                                                </div>  
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Cargo:</label><span class="text-muted ml-1 mb-0">Responsable de registro de IA</span>                                                                    
                                                                </div>                                                                
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Área:</label><span class="text-muted ml-1 mb-0">IA</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            <!--tabla-->
                                            <div class="row">
      <div class="card">
        <div class="card-body" id="hello">
            <div class="row row-cols-lg-auto g-3 align-items-center">
                                                    <div class="col-12">
                                                        <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
                                                        <div class="input-group">                                                            
                                                            <input type="text" class="form-control" id="autoSizingInput" placeholder="Buscar...">
                                                        </div>
                                                    </div><!--end col-->
                                                    <div class="col-12">
                                                        <button type="submit" class="btn btn-primary">Buscar</button>
                                                    </div><!--end col-->
                                                </div>


          <div class="table-responsive table-card mt-3">
            <table class="table align-middle table-nowrap-" id="customerTable">
              <thead class="table-light text-muted">
                <tr>
                  <th class="sort" data-sort="currency_name" scope="col">Código</th>
                  <th class="sort ancho" data-sort="current_value" scope="col">Trámite</th>                  
                  <th scope="col">Solicitud</th>
                </tr>
              </thead>
              <!--end thead-->
              <tbody class="list form-check-all">
                <tr v-for="(data, index) of resultQuery" :key="index">
                  <td class="id">
                    {{ data.id }}
                  </td>                  
                  <td class="low">{{ data.name }}</td>                  
                  <td>
                    <div class="form-check mb-2 col-lg-6">
                    <input class="form-check-input" type="checkbox" id="formCheck1">
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
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                 :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
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
                                            <!--fin tabla-->

                                        </div>
                                        <!--end col-->
                                    </div>
                                    <div class="text-center mt-3"><button type="button" class="btn btn-success waves-effect waves-light">Guardar</button></div>
                                    <!--end row-->
                                        

                                    </div><!-- end card-body -->
                                </div>


                            
                            <!-- end card -->

                            <div class="container">                                
                                <div class="row">
                                  <div class="col-6 mt-0 izquierda"><a href="signup" class="text-primary text-decoration-underline"></a></div>
                                  <div class="col-6 derecha"><a href="#" class="text-primary text-decoration-underline"></a></div>
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
                                <p class="mb-0 text-footer-black">&copy; {{new Date().getFullYear()}} - SENASAG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- end Footer -->
        </div>
        <!-- end auth-page-wrapper -->

    


</template>