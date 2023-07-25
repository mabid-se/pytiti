<template>
    <div class="modal fade" :id="attrs.id" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                </div>
                <div class="modal-body">
                    <InputFormField @update-change="updateChange" :field="{
                        type: 'text',
                        label: 'Correo electronico',
                        id: 'email',
                        name: 'email',
                        placeholder: '',
                        required: false,
                    }" />
                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button 
                        type="button" 
                        class="btn w-sm btn-light" 
                        data-bs-dismiss="modal">Cancelar</button>
                        <button 
                        @click="sendConfirmation" 
                        type="button" 
                        class="btn w-sm btn-danger btn btn-success float-end" 
                        data-bs-dismiss="modal">Solicitar el cambio</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import trashIcon from "@/assets/icons/person-icon.png";
import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";

export default {
    name: "ForgotPasswordModal",
    props: {
        attrs: {
            type: Object
        }
    },
    data() {
        return {
            sent: false,
            icon: trashIcon,
            formData: {},
        }
    },
    components: {
      InputFormField,
    },
    methods: {
        sendConfirmation() {
            this.$emit("send-confirmation", { sent: !this.sent, data: this.formData });  
        },
        updateChange(data) {
            this.formData = data;
        },
    }
}
</script>