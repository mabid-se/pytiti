<script>
    import Layout from "../../../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../../../app.config";
    
    export default {
      page: {
        title: "Liquidador",
        meta: [{ name: "description", content: appConfig.description }],
      },
      data() {
        return {
          title: "Liquidador",
          items: [
            {
              text: "Tables",
              href: "/",
            },
            {
              text: "Liquidador",
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
                                    <h4 class="card-title mb-0">Vincular liquidación o multa</h4>
                                </div><!-- end card header -->

                                <div class="card-body">
                                    <div id="customerList">
                                        <div class="row">

<div class="col-xxl-12">
    
    <div class="card">
        <div class="card-body">
            <span class="link">Con este formulario se puede vincular un documento de Liquidación o de Multa previamente generado a través del <a href="https://paititi.senasag.gob.bo/liquidador/" target="new">sistema de Liquidador</a>.</span>
            <br><br>
            <!-- Nav tabs -->
            <ul class="nav nav-pills nav-justified mb-3" role="tablist">
                                            <li class="nav-item waves-effect waves-light">
                                                    <a class="nav-link active" data-bs-toggle="tab" href="#home1" role="tab">
                                                        Liquidación 
                                                </a>
                                            </li>
                                            <li class="nav-item waves-effect waves-light">
                                                <a class="nav-link" data-bs-toggle="tab" href="#profile1" role="tab">
                                                    Multas 
                                                </a>
                                            </li>
                                           
                                        </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="home1" role="tabpanel">
                    <div class="d-flex">                        
                        <div class="flex-grow-1 ms-2">
                            <div class="row">
                            <div class="col-lg-10">
                                <div class="flex-shrink-0">                                                                
                                <p><i class="ri-checkbox-multiple-blank-fill text-success"></i> CODIGO DE SERVICIO: 52</p>
                                <p>Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial</p>                           
                                </div>
                                <div class="flex-shrink-0">                                                                
                                <p><i class="ri-checkbox-multiple-blank-fill text-success"></i> CODIGO DE SERVICIO: 60</p>
                                <p>Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial</p>                           
                                </div>
                                <div class="col-5">
                                <label for="formFile" class="form-label">Escriba el código de liquidación para vincular la liquidación al trámite</label>
                                <div class="input-group mb-3">
    <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-info" type="button" id="button-addon2">Buscar liquidación</button>
</div>
</div>

                    
                                 </div>
                            
                            
                        </div>

                        <div class="row">
            <div class="col-12">                

                <div class="row">
                    <div class="col-xxl-4">
                        
                    </div>
                    <!-- end col -->
                    <div class="col-xxl-4">
                      <h6 class="card-title mb-3 text-center">                                    
                        <span class="badge bg-danger align-middle fs-14">El código no se encontró</span>
                                </h6>

                    </div>
                    <!-- end col -->
                  
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end col -->
           

        </div>
        <!-- end row -->
                            
                        </div>
                    </div>
                    

                </div>
                            
            </div>
        </div><!-- end card-body -->
    </div><!-- end card -->
</div><!--end col-->


</div><!--end row-->
                                        
                             
                                        
                                        
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