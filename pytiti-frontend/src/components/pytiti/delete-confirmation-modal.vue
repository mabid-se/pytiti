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
                        class="btn w-sm btn-light" 
                        data-bs-dismiss="modal">Cerrar</button>
                        <button 
                        @click="sendConfirmation" 
                        type="button" 
                        class="btn w-sm btn-danger " 
                        data-bs-dismiss="modal">{{ attrs.buttonText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import trashIcon from "@/assets/icons/trash-icon.png";

export default {
    name: "DeleteConfirmationModal",
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
        sendConfirmation() {
            this.$emit("send-confirmation", { sent: !this.sent });
        }
    }
}
</script>