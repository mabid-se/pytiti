<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-body">
                        <div class="live-preview">
                            <div class="card card-border-grey">
                                <div class="card-header card-border-bottom-grey">
                                    <h6 class="fs-">Solicitud de trámite</h6>
                                </div>
                                <div class="card-body">
                                    <div class="live-preview">
                                        <div class="card card-border grey">
                                            <div class="card-header card-border-bottom-grey">
                                                <h6 class="fs-15">Guía para seleccionar su trámite</h6>
                                                <p class="text-muted">Responda a este formulario para que un funcionario SENASAG lo guíe en la selección de su trámite.</p>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="fs-13">Ud. eligió el trámite:</h4>
                                                <h6 class="fs-15 text-primary">Registro sanitario de empresas veterinarias importadoras Comercializadoras.</h6>
                                                <p class="fs-13">Registro, Evaluación, Inspección y Supervisión zoosanitarias de empresas y sucursales que importan, elaboran, fraccionan, distribuyen, comercializan, productos de uso veterinario.</p>
                                                <form>
                                                    <div class="mb-3">
                                                        <label for="descripcionactividad">Detalle la actividad principal a la que se dedica su empresa</label>
                                                        <textarea name="descripcionactividad" id="descripcionactividad" rows="4" class="form-control"></textarea>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="objetivo">¿Cuál es el objetivo que desea cumplir al completar este trámite?</label>
                                                        <textarea name="objetivo" id="objetivo" rows="4" class="form-control"></textarea>
                                                    </div>
                                                    <div class="d-flex flex-wrap gap-2 mb-3 mt-4 mb-lg-0 justify-content-md-center">
                                                        <a href="javascript:void(0);" class="btn btn-success btn-label">
                                                            <div class="d-flex">
                                                                <div class="flex-shrink-0">
                                                                    <i class="ri-arrow-left-s-line label-icon align-middle fs-16 me-2"></i>
                                                            </div>
                                                            <div class="flex-grow-1">Regresar al listado</div>
                                                            </div>
                                                        </a>
                                                        <a 
                                                        :href="`#${modals.successRequestData.id}`" 
                                                        class="btn btn-success btn-label right" 
                                                        :data-bs-target="`#${modals.successRequestData.id}`"
                                                        data-bs-toggle="modal">
                                                            <div class="flex-grow-1">Enviar las respuestas</div>
                                                            <div class="d-flex">
                                                                <div class="flex-shrink-0">
                                                                    <i class="ri-arrow-right-s-line label-icon align-middle fs-16"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SuccessRequest :attrs="modals.successRequestData" />
    </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
//
import SuccessRequest from "@/components/portals/success-request.vue";

export default {
    name: "SolicitudTramite",
    components: {
        Layout,
        PageHeader,
        //
        SuccessRequest
    },
    data () {
        return {
            title: "LISTADO SOLICITUDES DE REGISTRO",
            items: [
                {
                text: "Trámites",
                href: "/",
                },
                {
                text: "Solicitud",
                active: true,
                },
            ],
            modals: {
                successRequestData: {
                    id: "successRequestModal",
                    title: "Solicitud enviada",
                    message: "La solicitud se ha enviado correctamente",
                    buttonText: "Aceptar"
                }
            },
        }
    }
}
</script>

<style>

</style>