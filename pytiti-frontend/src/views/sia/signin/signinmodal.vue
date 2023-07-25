<script>
    import Layout from "../../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    
    import 'prismjs';
    import 'prismjs/themes/prism.css';
    
    export default {
        data() {
            return {
                title: "Modals",
                items: [
                    {
                        text: "Base UI",
                        href: "/",
                    },
                    {
                        text: "Modals",
                        active: true,
                    },
                ],
            };
        },
        name: "Modals",
        components: {
            Layout,
            PageHeader,
        },
        mounted() {
            const checkbox = document.getElementsByClassName("code-switcher");
            Array.from(checkbox).forEach((check) => {
                check.addEventListener('change', () => {
                    const card = check.closest('.card');
                    const preview = card.querySelector(".live-preview");
                    const code = card.querySelector(".code-view");
                    if (check.checked) {
                        // do this
                        preview.classList.add("d-none");
                        code.classList.remove("d-none");
                    } else {
                        // do that
                        preview.classList.remove("d-none");
                        code.classList.add("d-none");
                    }
                });
            });
        }
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
                        <div class="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                    <div class="card-body">
                                        <div class="text-center mt-2">
                                        <h5 class="text-primary">Ingreso al sistema</h5>
                                        <p class="text-muted">Llene sus datos correctos para ingresar o registrarse al sistema</p>
                                    </div> 
                                        <!-- Nav tabs -->
                                        <ul class="nav nav-pills animation-nav nav-justified gap-2 mb-3 borde-bajo" role="tablist">
                                            <li class="nav-item waves-effect waves-light">
                                                <a class="nav-link active" data-bs-toggle="tab" href="#animation-home" role="tab">
                                                    Ingresar 
                                                </a>
                                            </li>
                                            <li class="nav-item waves-effect waves-light">
                                                <a class="nav-link" data-bs-toggle="tab" href="#animation-profile" role="tab">
                                                    Solicitar acceso 
                                                </a>
                                            </li>                                            
                                        </ul>
                                        <div class="tab-content text-muted">
                                            <div class="tab-pane active" id="animation-home" role="tabpanel">
                                                <div class="mb-3">
                                                <label for="iconInput" class="form-label">Usuario</label>
                                                <div class="form-icon right">
                                                    <input type="email" class="form-control form-control-icon" id="iconInput" placeholder="Escriba su nombre de usuario asignado">
                                                   
                                                </div>
                                                </div>
                                                <div class="mb-3">                                                
                                                    <label for="exampleInputpassword" class="form-label">Contraseña</label>
                                                    <div class="form-icon right">
                                                    <input type="password" class="form-control" id="exampleInputpassword" placeholder="Escriba su contraseña">
                                                    
                                                    </div>
                                                    <div class="container">                                
                                                        <div class="row">
                                                        <div class="col-6 mt-0 izquierda"><a href="signup" class="text-primary text-decoration-underline"> </a></div>
                                                        <div class="col-6 derecha-verde mt-1"><a href="#" class="text-primary text-decoration-underline"> Olvidé mi contraseña </a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-4">
                                                <button class="btn btn-success w-100" type="submit">Acceder</button>
                                                </div>
                                                
                                            </div>
                                            <div class="tab-pane" id="animation-profile" role="tabpanel">                                                
                                                <div class="mb-3">                                                
                                                <label for="exampleInputpassword" class="form-label">Carnet de identidad</label>
                                                <div class="form-icon right">
                                                <input class="form-control" placeholder="Escriba su número de carnet">                                                
                                                </div>
                                                </div>
                                                <div class="mb-3">                                                
                                                <label for="exampleInputpassword" class="form-label">Complemento de carnet de identidad</label>
                                                <div class="form-icon right">
                                                <input class="form-control" placeholder="Escriba el complemento">                                               
                                                <span>Solo para duplicados</span> 
                                                </div>
                                                </div>
                                                <div class="mt-4">
                                                    <div class="row">
            
            <div class="col-xxl-12">
                <div class="card">
                    
                    <!-- end card header -->
                    <div class="card-body">
                       
                        <div class="live-preview">
                            <div>
                                <!-- center modal -->
                               
                                <button
                                    type="button"
                                    class="btn btn-success w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target=".bs-example-modal-center"
                                >Verificar</button>
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
                                                    style="width:120px;height:120px"
                                                ></lord-icon>
                                                <div class="mt-4">
                                                    <h4 class="mb-3">Oops something went wrong!</h4>
                                                    <p
                                                        class="text-muted mb-4"
                                                    >The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                                                    <div
                                                        class="hstack gap-2 justify-content-center"
                                                    >
                                                        <button
                                                            type="button"
                                                            class="btn btn-light"
                                                            data-bs-dismiss="modal"
                                                        >Close</button>
                                                        <a
                                                            href="javascript:void(0);"
                                                            class="btn btn-danger"
                                                        >Try Again</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.modal-content -->
                                    </div>
                                    <!-- /.modal-dialog -->
                                </div>
                                <!-- /.modal -->
                            </div>
                        </div>

                      
                    </div>
                    <!-- end card-body -->
                </div>
                <!-- end card -->
            </div>
        </div>
        <!---end row-->
                                                    
                                                    
                                                
                                                </div>

                                            </div>
                                            
                                            
                                        </div>
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