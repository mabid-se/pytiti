<template>
    <div class="d-flex flex-wrap gap-2">
        <a 
        v-if="requestState != 'APROBADO'"
        @click="selectAction(itemData)" 
        :href="`#${approveModal.id}`" 
        :data-bs-target="`#${approveModal.id}`" 
        class="btn btn-success btn-icon" 
        data-bs-toggle="modal" 
        v-b-tooltip.hover
        title="Aprobar">
            <i class="bx bx-check" style="font-size: 20px"></i>
        </a>
        <a 
        @click="selectAction(itemData)"
        :href="`#${extraModal.id}`" 
        :data-bs-target="`#${extraModal.id}`" 
        data-bs-toggle="modal" 
        class="btn btn-info btn-icon" 
        v-b-tooltip.hover
        title="Cambiar Trámite">
            <i class="ri-mail-send-line align-middle"></i>
        </a>
        <a 
        v-if="requestState !== 'RECHAZADO'"
        @click="selectAction(itemData)" 
        class="btn btn-danger btn-icon" 
        :href="`#${rejectModal.id}`" 
        :data-bs-target="`#${rejectModal.id}`"
        data-bs-toggle="modal" 
        v-b-tooltip.hover
        title="Rechazar">
            <i class="bx bx-x align-middle"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: "AccionesDetalle",
    props: {
        itemData: {
            type: Object
        },
        approveModal: {
            type: Object
        },
        rejectModal: {
            type: Object
        },
        extraModal: {
            type: Object
        },
        requestState: {
            type: String
        }
    },
    methods: {
        selectAction(itemData) {
            this.$emit("send-action", itemData);
        }
    },
}
</script>