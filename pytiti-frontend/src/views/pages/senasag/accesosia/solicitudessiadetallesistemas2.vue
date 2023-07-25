<script>
    import Layout from "../../../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../../../app.config";
    
    export default {
      page: {
        title: "SOLICITUDES SIA",
        meta: [{ name: "description", content: appConfig.description }],
      },
      data() {
        return {
          title: "SOLICITUDES SIA - Vobo",
          items: [
            {
              text: "Tables",
              href: "/",
            },
            {
              text: "SOLICITUDES SIA",
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
              name: "Habilitación de línea (grupo) de productos con nivel de alto riesgo o altamente perecibles A1 o A2 correspondientes al registro sanitario de procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y fraccionadoras. Categoría industrial",
              email: "robert@example.com",
              position: "Product Accounts Technician",
              company: "Ebert, Schamberger and Johnston",
              country: "Mexico",
            },
            {
              id: 56,
              name: "Habilitación de línea (grupo) de productos con nivel de alto riesgo o altamente perecibles A1 o A2 correspondientes al registro sanitario de procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y fraccionadoras. Categoría Semi-industrial",
              email: "noel@example.com",
              position: "Customer Data Director",
              company: "Raynor, Rolfson and Daugherty",
              country: "Qatar",
            },
            {
              id: 57,
              name: "Habilitación de línea (grupo) de productos con nivel de alto riesgo o altamente perecibles A1 o A2 correspondientes al registro sanitario de procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y fraccionadoras. Categoría artesanal",
              email: "traci@example.com",
              position: "Corporate Identity Director",
              company: "Hauck Inc",
              country: "Holy See",
            },
            {
              id: 7,
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
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
                        <div class="col-12 margin-cont">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title mb-0">Detalle de la solicitud</h4>
                                </div><!-- end card header -->

                                <div class="card-body">
                                    <div id="customerList">
                                        <div class="row g-4 mb-3">
                                            <div class="col-sm-auto">
                                                <div>
                                                    <div class="search-box ms-2">
                                                        
                                                    </div>                                                   
                                                    
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="d-flex justify-content-sm-end">
                                                    
                                                        <a href="solicitudessiadetallesistemas" role="button" class="btn btn-success btn-label">
                                                          <i class="ri ri-arrow-left-s-line label-icon align-middle fs-16 me-2"></i>Regresar</a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
      <div class="card-">
        <div class="card-body-" id="hello">
          <div class="table-responsive table-card">
            <div class="row-">
                                        <div class="col-lg-12">
                                            <div class="card-">
                                                
                                                <div class="card-body">
                                                    <div class="live-preview">
                                                        <div>
                                                            <h5 class="text-muted text-uppercase fs-13 mb-4">Datos personales</h5>                                                            
                                                            <div class="row g-3 mb-3">
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">CI:</label><span class="text-muted ml-1 mb-0">43474436</span><span class="text-muted ml-1 mb-0">M</span>
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Email:</label><span class="text-muted ml-1 mb-0">jperez@senasag.gob.bo</span>                                                                    
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nombres:</label><span class="text-muted ml-1 mb-0">Juan Carlos</span>
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ap. Paterno:</label><span class="text-muted ml-1 mb-0">Perez</span>
                                                                </div>                                                                
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ap. Materno:</label><span class="text-muted ml-1 mb-0">Rojas</span>
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
                                                                    <label for="basic-url" class="form-label">Unidad:</label><span class="text-muted ml-1 mb-0">Registro</span>                                                                    
                                                                </div>
                                                                <div class="col-lg-6 mt-menor">
                                                                    <label for="basic-url" class="form-label">Área:</label><span class="text-muted ml-1 mb-0">IA</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Profesión/Ocupación:</label><span class="text-muted ml-1 mb-0">Ingeniero</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="row g-3 mb-3">
                                                                
      <!--end col-->               
      <div class="cardbold">
                                                                                    <div class="card-header align-items-center d-flex">
                                                                                        <h5 class="card-title mb-0 flex-grow-1">Documentos de aprobación</h5>
                                                                                        
                                                                                    </div><!-- end card header -->
                                                                                    <div class="card-body">
                                                                                        <div class="live-preview">
                                                                                            <div class="row gy-4">                                                                                                
                                                                                                <div class="col-sm-12 col-lg-12 col-xxl-12">
                                                                                                    <div>
                                                                                                        <b-button variant="primary" class="btn btn-primary waves-effect waves-light mr-1 mb-4">Imprimir formulario de respaldo</b-button>


                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <label for="formFile" class="form-label">Adjuntar documento firmado</label>
<input class="form-control w-50" type="file" id="formFile">
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
<b-button variant="success" class="waves-effect waves-light mr-1">Guardar</b-button>
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
                                        
                                        
                                    </div>
                                </div><!-- end card -->
                            </div>
                            <!-- end col -->
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->

       
    </Layout>
</template>