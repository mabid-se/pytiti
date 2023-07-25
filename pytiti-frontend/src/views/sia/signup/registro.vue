<script>
export default {
    
}
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
                        <div class="col-md-6 col-lg-6 col-xl-6">
                            <div class="card mt-4">
                            
                                <div class="card-body p-4"> 
                                    <div class="text-center mt-2">
                                        <h5 class="text-primary">Registro en el sistema</h5>
                                        <p class="text-muted">Llene sus datos para verificar su cuenta</p>
                                    </div>

                                    <div class="row gy-4">
                                        <div class="col-xxl-12 col-md-12">
                                            
                                            <div class="mb-3">
                                                <label for="iconInput" class="form-label">Tipo de identificador</label>
                                                <div class="form-icon right">
                                                    <select class="form-select mb-3" aria-label="-Elija el tipo de documento-">
                                                        <option disabled selected>-Elija el tipo de documento-</option>
                                                        <option value="ci">Carnet de identidad</option>
                                                        <option value="ip">Identificador de persona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="mb-3">                                                
                                                <label for="exampleInputpassword" class="form-label">Número</label>
                                                <div class="form-icon right">
                                                <input class="form-control" placeholder="Escriba el número del documento">                                                
                                                </div>
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="mt-4">
                                            <button class="btn btn-success w-100" type="submit">Ingresar</button>
                                        </div>  
                                        
                                    </div>


                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->

                            <div class="container">                                
                                <div class="row">
                                  <div class="col-6 mt-0 izquierda"><a href="signin" class="text-primary text-decoration-underline"> Ya tengo una cuenta </a></div>
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