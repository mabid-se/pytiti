<template>
    <div class="modal fade zoomIn" :id="attrs.id" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                </div>
                <div class="modal-body">
                    <div class="mt-2 text-center">
                        <img :src="icon" alt="delete" style="width: 100px;">
                        <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>{{ attrs.title }}</h4>
                            <p class="text-muted mx-4 mb-0">{{ attrs.message }}</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button 
                        type="button" 
                        data-bs-dismiss="modal" 
                        @click="sendConfirmation" 
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
import trashIcon from "@/assets/icons/warn-icon.png";

export default {
    name: "ApproveConfirmationModal",
    props: {
        attrs: {
            type: Object
        }
    },
    data() {
        return {
            sent: false,
            icon: trashIcon
        }
    },
    methods: {
        sendConfirmation(e) {
            e.preventDefault();
            this.$emit("send-confirmation", { sent: true });
        }
    }
}
</script>