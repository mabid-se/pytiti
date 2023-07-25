<template>
  <div class="d-flex flex-wrap gap-2">
      <div class="dropdown">
        <a href="javascript:void(0);" class="btn btn-info btn-label right" id="dropdownMenuLink1"
          data-bs-toggle="dropdown" aria-expanded="false">
          <div class="d-flex">
            <div class="flex-shrink-0">
              <i class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"></i>
            </div>
            <div class="flex-grow-1">Opciones</div>
          </div>
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1"
            data-popper-placement="bottom-start">
          <li>
            <slot name="verDetalle"></slot>
          </li>
          <li v-if="userIsAdmin">
            <a v-if="itemData.estado !== 'APROBADO'" @click="selectAction(itemData)" :href="`#${approveModal.id}`"
              :data-bs-target="`#${approveModal.id}`" class="dropdown-item" data-bs-toggle="modal">
              Aprobar
            </a>
          </li>
          <li v-if="userIsAdmin">
            <a @click="selectAction(itemData)" :href="`#${extraModal.id}`" :data-bs-target="`#${extraModal.id}`"
              data-bs-toggle="modal" class="dropdown-item">
              Reenviar
            </a>
          </li>
          <li v-if="userIsAdmin">
            <a v-if="itemData.estado !== 'RECHAZADO'" @click="selectAction(itemData)" :href="`#${rejectModal.id}`"
              :data-bs-target="`#${rejectModal.id}`" data-bs-toggle="modal" class="dropdown-item">
              Rechazar
            </a>
          </li>
          <!--<li>
              <a class="dropdown-item">
                  <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
              </a>
          </li> -->
        </ul>
      </div>
  </div>
</template>

<script>
import { userIsAdmin } from '@/services/user';

export default {
    name: "AccionesLista",
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
        }
    },
    data() {
        return {
            userIsAdmin: userIsAdmin(),
        }
    },
    methods: {
        selectAction(itemData) {
            this.$emit("send-action", itemData);
        }
    },
}
</script>