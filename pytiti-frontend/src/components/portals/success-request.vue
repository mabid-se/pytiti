<template>
<div class="modal fade zoomIn" :id="attrs.id" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                </div>
                <div class="modal-body">
                    <div class="mt-2 text-center">
                        <lottie
                        class="avatar-xl" 
                        colors="primary:#0ab39c,secondary:#405189" 
                        :options="defaultOptions" 
                        :height="120" 
                        :width="120"
                        />
                        <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>{{ attrs.title }}</h4>
                            <p class="text-muted mx-4 mb-0">{{ attrs.message }}</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button 
                        type="button" 
                        data-bs-dismiss="modal" 
                        class="btn btn-success w-sm">{{ attrs.buttonText }}</button>
                        <button 
                        type="button" 
                        class="btn w-sm btn-danger" 
                        data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import animationData from "@/components/widgets/33886-check-okey-done.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
    name:"SuccessRequest",
    components: {
        lottie: Lottie
    },
    props: {
        attrs: {
            type: Object
        }
    },
    data() {
        return {
            defaultOptions: { animationData: animationData },
        }
    },
}
</script>

<style>

</style>