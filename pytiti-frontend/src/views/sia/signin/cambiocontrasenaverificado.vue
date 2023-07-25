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
                                        <h5 class="text-primary">Actualización de contraseña</h5>
                                        <p class="text-muted"></p>
                                    </div>                                        
                                        <div class="tab-content text-muted">
                                            <h2 class="text-center">Gracias</h2>
                                            <p class="text-center">Su contraseña a si actualizada</p>

                                        </div>
                                    </div><!-- end card-body -->
                                </div>


                            
                            <!-- end card -->

                            <div class="container">                                
                                <div class="row">
                                  <div class="col-6 mt-0 izquierda"><a href="signup" class="text-primary text-decoration-underline"></a></div>
                                  <div class="col-6 derecha"><a href="#" class="text-primary text-decoration-underline">Ingresar</a></div>
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