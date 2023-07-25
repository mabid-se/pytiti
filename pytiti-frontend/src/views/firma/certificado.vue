<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";

    import 'prismjs';
    import 'prismjs/themes/prism.css';

    

    export default {
        data() {
            return {
                title: "Certificado",
                items: [{
                        text: "Base UI",
                        href: "/",
                    },
                    {
                        text: "Certificado",
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
            <div class="col-xxl-12">
                <div class="card">
                        <div class="row card-body">
                            <h5 class="card-title mb-1">Generar certificado</h5>
                        <p class="card-text">Llene la información del registro.</p>
                        <div class="col-1">
                                <div><label for="basiInput" class="form-label">Distrital</label><p>08 - SCZ</p></div>
                            </div>    
                        <div class="col-1">
                                <div><label for="basiInput" class="form-label">Distrital</label><p>08 - SCZ</p></div>
                            </div>
                            <div class="col-3">
                                <div><label for="basiInput" class="form-label">Categoría</label><p>01 - INDUSTRIAL / PROCESADORA DE ALIMENTOS</p></div>
                            </div>
                            <div class="col-2">
                                <div><label for="basiInput" class="form-label">Nivel de mercado</label>
                                    <p>03 - Nacional/Internacional</p>
                                </div>
                            </div>
                            <div class="col-3">
                                <div><label for="basiInput" class="form-label">Línea de alimento</label>
                                    <p>02 - De carne y derivados</p>                                    
                                </div>
                                <div id="passwordHelpBlock" class="form-text"> Seleccione la línea de mayor riesgo.</div>
                            </div>
                            <div class="col-3">
                                <div><label for="basiInput" class="form-label">Ambito de acción</label>
                                    <p>04 - Comercialización</p>
                                </div>
                            </div>
                            <div class="col-12">                                
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="formCheck1"><label class="form-check-label" for="formCheck1"> Registro provisional </label></div>
                            </div>
                        <p class="card-text">
                            <small class="text-muted">Registro provisional permitirá importaciones hasta un periódo máximo de 6 meses mientras dure su proceso de registro.</small>
                        </p>
                        </div>
                </div>
            </div>

            <div class="col-xxl-6">
                <div class="card">
                        <div class="row card-body">
                            <h5 class="card-title mb-1">Vigencia del empadronamiento</h5>
                            <div class="col-6">
                                <div><label for="basiInput" class="form-label">Fecha registro</label>
                                    <input type="date" class="form-control" id="basiInput">
                                </div>
                            </div>
                            <div class="col-6">
                                <div><label for="basiInput" class="form-label">Años validez</label>
                                    <select class="form-select mb-3" aria-label="Default select example" disabled>
                                    <option selected disabled>Elija</option>
                                    <option value="0">0 (Indefinido)</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-xxl-6">
                <div class="card">
                        <div class="row card-body">
                            <h5 class="card-title mb-1">Registro físico</h5>
                            <div class="col-6 mb-3">
                                <div><label for="basiInput" class="form-label">Libro (Secuencial)</label><input type="" class="form-control" id="basiInput"></div>
                            </div>
                            <div class="col-6">
                                <div><label for="basiInput" class="form-label">Folio (Año)</label><input type="" class="form-control" id="basiInput"></div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-xxl-12">
                <div class="card">
                        <div class="row card-body"><h5 class="card-title mb-1">Informe técnico, Actas</h5>
                            <div class="col-4">
                                <div><label for="basiInput" class="form-label">Nro. Acta de inspección: </label>67654674</div>
                            
                                <div><label for="basiInput" class="form-label">Fecha Acta de inspección: </label>01/02/2022</div>
                            </div>
                            <div class="col-4">
                                <div><label for="basiInput" class="form-label">Nro. Informe técnico: </label>478785758</div>
                            
                                <div><label for="basiInput" class="form-label">Fecha Informe técnico: </label>05/02/2022</div>
                            </div>
                            <div class="col-4">
                                <div><label for="basiInput" class="form-label">Nro. de Dictamen: </label>6745734</div>
                            
                                <div><label for="basiInput" class="form-label">Fecha de Dictamen: </label>10/02/2022</div>
                            </div>
                        </div>
                        
                </div>
            </div>

            

            <div class="col-xxl-6">
                <div class="card">
                    <div class="card-body"><h5 class="card-title mb-1">Firma del Encargado de registro</h5>
                            <div class="col-2">
                            <!-- Radio Buttons -->
                            <b-button-group role="firma1" aria-label="Basic radio toggle button firma1">
                            <input type="radio" class="btn-check" name="btnradio1" id="btnradio1" autocomplete="off" checked="">
                            <label class="btn btn-outline-secondary" for="btnradio1">Digital</label>

                            <input type="radio" class="btn-check" name="btnradio1" id="btnradio2" autocomplete="off">
                            <label class="btn btn-outline-secondary" for="btnradio2">Manual</label>

                            </b-button-group>
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-6">
                <div class="card">
                    <div class="card-body"><h5 class="card-title mb-1">Firma del Jefe departamental</h5>
                            <div class="col-2">
                            <!-- Radio Buttons -->
                            <b-button-group role="firma2" aria-label="Basic radio toggle button firma2">
                            <input type="radio" class="btn-check" name="btnradio2" id="btnradio3" autocomplete="off" checked="">
                            <label class="btn btn-outline-secondary" for="btnradio3">Digital</label>

                            <input type="radio" class="btn-check" name="btnradio2" id="btnradio4" autocomplete="off">
                            <label class="btn btn-outline-secondary" for="btnradio4">Manual</label>

                            </b-button-group>
                            </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                                                                    <div class="row">
                                                                      <div class="col btn_izq">
                                                                        <button type="button" class="btn btn-navega btn-label rounded-pill" disabled><i class="ri-arrow-left-s-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                                                                            Anterior</button>
                                                                      </div>
                                                                      <div class="col-6 col-sm-4 btn_cen">
                                                                        <button type="button" class="btn btn-guardar btn-label right mb-1 ml-1"><i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                                                                            Guardar</button>
                                                                            <button type="button" class="btn btn-print btn-label right mb-1 ml-1" data-bs-toggle="modal" data-bs-target="#exampleModalgrid"><i class="ri-printer-line label-icon align-middle fs-16 ms-2"></i>
                                                                                Imprimir</button>
                                                                      </div>
                                                                      <div class="col btn_der">
                                                                        
                                                                      </div>
                                                                    </div>                                                        
                                                                </div>

           
        </div>
        
        <div class="modal fade" id="exampleModalgrid" tabindex="-1" aria-labelledby="exampleModalgridLabel">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalgridLabel">Impresión de certificados</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <form action="javascript:void(0);">
                                                                <div class="row g-3">
                                                                    
                                                                    <div class="col-xxl-6">
                                                                        <h5 class="fs-13 fw-medium text-muted">Nro. de copias</h5>                                                                                                                                                 
                                                                        <div class="input-step step-info">                                                                            
                                                                            <button type="button" class="minus">–</button><input type="number" class="product-quantity" min="0" max="100" readonly=""><button type="button" class="plus">+</button>
                                                                        </div>                                                                       
                                                                    </div><!--end col-->
                                                                    <div class="col-xxl-6">
                                                                        <div>
                                                                            <label for="firstName" class="form-label">Nro. preimpreso</label>                                                                            
                                                                            <input type="text" class="form-control" id="preimpreso" placeholder="" disabled>
                                                                        </div>
                                                                    </div><!--end col-->
                                                                    
                                                                    <div class="col-lg-12">
                                                                        <label class="form-label">Tipo de impresión</label>
                                                                        <div>
                                                                            <div class="form-check form-check-inline">
                                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                                                                <label class="form-check-label" for="inlineRadio1">De prueba</label>
                                                                            </div>
                                                                            <div class="form-check form-check-inline">
                                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                                                                <label class="form-check-label" for="inlineRadio2">AI Certificado</label>
                                                                            </div>
                                                                        </div>
                                                                    </div><!--end col-->
                                                                    <div class="col-xxl-12">
                                                                        <div class="form-check mb-2">
                                                                            <input class="form-check-input" type="checkbox" id="formCheck1" disabled>
                                                                            <label class="form-check-label" for="formCheck1">
                                                                            Imprimir en el último modelo de membretado (R.A. 148/2008)
                                                                            </label>
                                                                            </div>
                                                                    </div><!--end col-->
                                                                    
                                                                    <div class="col-lg-12">
                                                                        <div class="hstack gap-2 justify-content-end">
                                                                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button type="submit" class="btn btn-primary">Imprimir</button>
                                                                        </div>
                                                                    </div><!--end col-->
                                                                </div><!--end row-->
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- /.modal -->
        

    </Layout>
</template>