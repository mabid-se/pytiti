<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";

    import 'prismjs';
    import 'prismjs/themes/prism.css';

    export default {
        data() {
            return {
                title: "Firma",
                items: [{
                        text: "Base UI",
                        href: "/",
                    },
                    {
                        text: "Firma",
                        active: true,
                    },
                ],
            };
        },
        name: "Firma",
        components: {
            Layout,
            PageHeader,
        },
        data() {
            return {
                livePaper: false
            }
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
    <Layout>
        <PageHeader :title="title" :items="items" />
        

        <div class="row margen-contenido">
            <div class="col-xxl-6">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Documento con firma digital</h4>
                        <div class="flex-shrink-0">
                            <div class="form-check form-switch form-switch-right form-switch-md">
                                
                            </div>
                        </div>
                    </div>
                    <!-- end card header -->
                    <div class="card-body">
                        <p class="">
                            Proceda a incluir su firma digital.
                            
                        </p>
                        <div class="live-preview">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModalgrid">Incluir firma digital en el documento</button>
                            <div class="modal fade" id="exampleModalgrid" tabindex="-1"
                                aria-labelledby="exampleModalgridLabel">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalgridLabel">Configuración</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="javascript:void(0);">
                                                
                                                <div class="row g-3">
                                                    <label for="basiInput" class="form-label">Elija el tipo de documento</label>
                                                    <div class="mb-2">                                    
                                                        
                                                        <div class="form-check form-check-inline">
                                                            <input type="radio" class="form-check-input" name="flexRadioDefault" id="normalpaper" @click="livePaper = false" checked>
                                                            <label for="normalpaper" class="form-check-label">Digital generado por el sistema</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input type="radio" class="form-check-input" name="flexRadioDefault" id="livepaper" @click="livePaper = true">
                                                            <label for="livepaper" class="form-check-label">Archivo PDF adjunto</label>                                                            

                                                            
                                                        </div>
                                                    </div>                                                   
                                                    
                                                    <div class="mb-2">
                                                            <div class="additional-inputs" v-if="livePaper">
                                                                <label for="basiInput" class="form-label">Adjuntar archivo PDF</label>
                                                                <input class="form-control" type="file" id="formFileMultiple">
                                                            </div>                                                        
                                                    </div>

                                                    <div class="mb-2">
                                                            <div class="additional-inputs" v-if="livePaper">
                                                                <label for="basiInput" class="form-label">Escriba su PIN - Key</label>
                                                                <textarea class="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                                                            </div>                                                        
                                                    </div>

                                                    <div class="mb-2">
                                                            <div class="additional-inputs" v-if="livePaper">
                                                                
                                                            <b-alert show variant="danger">
                                                            <strong> ERROR </strong> El <b>PIN</b> no coincide.
                                                            </b-alert>
    
                                                            </div>                                                        
                                                    </div>


                                                    <div class="col-lg-12">
                                                        <div class="hstack gap-2 justify-content-end">
                                                            <button type="button" class="btn btn-light"
                                                                data-bs-dismiss="modal">Cancelar</button>
                                                            <button type="submit"
                                                                class="btn btn-primary">Generar</button>
                                                        </div>
                                                    </div>
                                                    <!--end col-->
                                                </div>
                                                <!--end row-->
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <!-- end card-body -->
                </div>
                <!-- end card -->
            </div>
            <!--end col-->

           
        </div>
        <!--end row-->

        

    </Layout>
</template>