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
    <button class="btn btn-info" type="button" id="button-addon2">Verificar liquidación</button>
</div>
</div>

                    
                                 </div>
                            
                            
                        </div>

                        <div class="row">
            <div class="col-12">                

                <div class="row">
                    
                    <!-- end col -->                    
                    <!-- loop servicio -->
                    
                    <div class="col-xxl-4"></div>
                    <div class="col-xxl-4">
                      <h6 class="card-title mb-3 text-center">                                    
                                    <span class="badge bg-success align-middle fs-14">Registro obtenido con éxito</span>
                                </h6>
                        <div class="card border card-border-success" style="display:block;">                            
                            <div class="card-body">
                              <h5 class="text-muted text-uppercase fs-13 mb-4">Datos</h5>                                                            
                                                            <div class="row g-3 mb-3">
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nro. Liquidación:</label><span class="text-muted ml-1 mb-0">654654654</span><span class="text-muted ml-1 mb-0">M</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nombre del solicitante:</label><span class="text-muted ml-1 mb-0">Juan Perez</span>                                                                    
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Razón Social:</label><span class="text-muted ml-1 mb-0">ABC SRL.</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nit:</label><span class="text-muted ml-1 mb-0">7978789</span>
                                                                </div>                                
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Costo total:</label><span class="text-muted ml-1 mb-0">500</span>
                                                                </div>
                                                                <hr>                                                                                               
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ejecutado:</label><span class="text-muted ml-1 mb-0">50</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Pago:</label><span class="text-muted ml-1 mb-0">50</span>
                                                                </div>                                                                
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Servicio:</label><span class="text-muted ml-1 mb-0">52</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Cantidad:</label><span class="text-muted ml-1 mb-0">2</span>
                                                                </div>
                                                                <hr>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Ejecutado:</label><span class="text-muted ml-1 mb-0">450</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Pago:</label><span class="text-muted ml-1 mb-0">500</span>
                                                                </div>                                                                
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Servicio:</label><span class="text-muted ml-1 mb-0">60</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Cantidad:</label><span class="text-muted ml-1 mb-0">1</span>
                                                                </div>
                                                            </div>
                                <p class="card-text">
                                  
                                </p>
                                <div class="text-end">
                                    
                                </div>
                                <!-- Default File Input Example -->

                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4"></div>
                    <!-- end loop -->
                    


                    <!-- end col -->
                    <div class="col-xxl-4">
                        
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end col -->
            <div class="col-xxl-4"></div>
            <div class="col-xxl-4 mb-2" style="display:block;">
    <label for="formFile" class="form-label">Adjuntar archivo de liquidación</label>
    <input class="form-control" type="file" id="formFile">
</div>
<div class="col-xxl-4"></div>
            <div class="row text-center" style="display:block;">
            <div class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0">
              <button type="button" class="btn btn-info btn-label"><i class="ri-link label-icon align-middle fs-16 me-2"></i>
                                                        Vincular cobro</button>                                                    
                                                </div>
                                              </div>
                                              <div class="row" style="display:none;">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">                                        
                                        <div class="live-preview">
                                            <div class="row">
                                                <div class="col-xl-12">
                                                    <div class="table-responsive mt-4 mt-xl-0">
                                                        <table class="table table-success table-striped table-nowrap- align-middle mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">N°</th>
                                                                    <th scope="col">Código</th>
                                                                    <th scope="col">Servicio</th>
                                                                    <th scope="col">Fecha emisión</th>
                                                                    <th scope="col">Pago</th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="fw-medium">1</td>
                                                                    <td>52</td>
                                                                    <td><a href="#" data-toggle="tooltip" title="Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial">Registro sanitario de empresas del rubro alimenticio...</a></td>
                                                                    <td>25/05/22</td>
                                                                    <td>5 días - Pago pendiente</td>                                                                    
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td class="fw-medium">1</td>
                                                                    <td>60</td>
                                                                    <td><a href="#" data-toggle="tooltip" title="Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial">Registro sanitario de empresas del rubro alimenticio...</a></td>
                                                                    <td>25/05/22</td>
                                                                    <td>27/05/22</td>                                                                    
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div><!--end col-->
                                            </div><!--end row-->
                                        </div>
                                        
                                    </div><!-- end card-body -->
                                </div><!-- end card -->
                            </div>
                            <!-- end col -->
                        </div><!--end row-->
                        <div class="row text-center" style="display:none;">
            <div class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0">
              <button type="button" class="btn btn-success btn-label mr-1"><i class="ri-exchange-dollar-line label-icon align-middle fs-16 me-2"></i>
                                                        Verificar pago</button>
              <button type="button" class="btn btn-danger btn-label"><i class="ri-link-unlink label-icon align-middle fs-16 me-2"></i>
                                                        Liberar liquidación</button>                                                    
                                                </div>
                                              </div>

        </div>
        <!-- end row -->
                            
                        </div>
                    </div>
                    

                </div>
                <div class="tab-pane" id="profile1" role="tabpanel">
                  <div class="d-flex">                        
                        <div class="flex-grow-1 ms-2">
                            <div class="row">
                              <div class="col-12">
                                <div class="flex-shrink-0">                                                                
                                <p><i class="ri-checkbox-multiple-blank-fill text-success"></i> CODIGO DE SERVICIO: 52</p>
                                <p>Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial</p>                           
                                </div>                                
                                <div class="col-10">
                                <label for="formFile" class="form-label">Elija el tipo de parámetro y escriba el valor</label>
                                <div class="row">
                                  <div class="col-lg-3">                                  
                                  <select class="form-select mb-3" aria-label="Default select example">
                                    <option selected disabled>-Parámetro-</option>
                                    <option value="1">Nro. de Multa</option>
                                    <option value="2">Nro. Acta o Resolución Sancionatoria</option>                    
                                  </select>
                                  </div>
                                  <div class="col-lg-4">
                                    <div class="input-group">
                                    <input type="text" class="form-control" aria-label="Documento" aria-describedby="button-addon2">                                                                        
                                    </div>
                                    <p>Escriba el valor para vincular la multa al trámite</p>
                                  </div>
                                  <div class="col-lg-5">
                                    <div class="input-group">
                                    <input type="text" class="form-control left w-50" aria-label="CI" aria-describedby="button-addon2"><button class="btn btn-info" type="button" id="button-addon2">Buscar multa</button>
                                    <p>Escriba su carnet de identidad</p>
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
                        <div class="card border card-border-success">
                            <div class="card-header">
                                <span class="float-end"></span>
                                <h6 class="card-title mb-0 text-center">                                    
                                    <span
                                        class="badge bg-success align-middle fs-14">Registro obtenido con éxito</span>
                                </h6>
                            </div>
                            <div class="card-body">
                              <h5 class="text-muted text-uppercase fs-13 mb-4">Datos</h5>                                                            
                                                            <div class="row g-3 mb-3">
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nro. Multa:</label><span class="text-muted ml-1 mb-0">654654654</span><span class="text-muted ml-1 mb-0">M</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nombre del responsable:</label><span class="text-muted ml-1 mb-0">Juan Perez</span>                                                                    
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Razón Social:</label><span class="text-muted ml-1 mb-0">ABC SRL.</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Nit:</label><span class="text-muted ml-1 mb-0">7978789</span>
                                                                </div>                                                                
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Concluido:</label><span class="text-muted ml-1 mb-0">50</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Pago:</label><span class="text-muted ml-1 mb-0">50</span>
                                                                </div>
                                                                <div class="col-lg-12 mt-menor">
                                                                    <label for="basic-url" class="form-label">Costo total:</label><span class="text-muted ml-1 mb-0">500</span>
                                                                </div>                                                                
                                                            </div>
                                <p class="card-text">
                                  
                                </p>
                                <div class="text-end">
                                    
                                </div>
                          
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-xxl-4">
                        
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end col -->
            <div class="row text-center">
            <div class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0">
              <button type="button" class="btn btn-info btn-label"><i class="ri-link label-icon align-middle fs-16 me-2"></i>
                                                        Vincular multa</button>                                                    
                                                </div>
                                              </div>

                                              <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">                                        
                                        <div class="live-preview">
                                            <div class="row">
                                                <div class="col-xl-12">
                                                    <div class="table-responsive mt-4 mt-xl-0">
                                                        <table class="table table-success table-striped table-nowrap- align-middle mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">N°</th>
                                                                    <th scope="col">Código</th>
                                                                    <th scope="col">Servicio</th>
                                                                    <th scope="col">Fecha emisión</th>
                                                                    <th scope="col">Pago</th>
                                                                    <th scope="col">Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="fw-medium">1</td>
                                                                    <td>52</td>
                                                                    <td><a href="#" data-toggle="tooltip" title="Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial">Registro sanitario de empresas del rubro alimenticio...</a></td>
                                                                    <td>25/05/22</td>
                                                                    <td>5 días - Pago pendiente</td>                                                                    
                                                                    <td>
                                                                        <div class="hstack gap-3 flex-wrap">
                                                                          <a href="javascript:void(0);" class="link-success fs-15" data-toggle="tooltip" title="Ver datos"><i class="ri-eye-line"></i></a>                                                                           
                                                                          <a href="javascript:void(0);" class="link-danger fs-15" data-toggle="tooltip" title="Eliminar"><i class="ri-delete-bin-line"></i></a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="fw-medium">1</td>
                                                                    <td>52</td>
                                                                    <td><a href="#" data-toggle="tooltip" title="Registro sanitario de empresas del rubro alimenticio (Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas) Categoría industrial">Registro sanitario de empresas del rubro alimenticio...</a></td>
                                                                    <td>25/05/22</td>
                                                                    <td>27/05/22</td>                                                                    
                                                                    <td>
                                                                        <div class="hstack gap-3 flex-wrap">
                                                                          <a href="javascript:void(0);" class="link-success fs-15" data-toggle="tooltip" title="Ver datos"><i class="ri-eye-line"></i></a>                                                                           
                                                                          <a href="javascript:void(0);" class="link-danger fs-15" data-toggle="tooltip" title="Eliminar"><i class="ri-delete-bin-line"></i></a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div><!--end col-->
                                            </div><!--end row-->
                                        </div>
                                        
                                    </div><!-- end card-body -->
                                </div><!-- end card -->
                            </div>
                            <!-- end col -->
                        </div><!--end row-->

        </div>
        <!-- end row -->                                                   
                                </div>
                        </div>
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