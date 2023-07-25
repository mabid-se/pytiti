<template>
  <div class="d-flex flex-wrap gap-2">
    <div class="dropdown">
      <a
        href="javascript:void(0);"
        class="btn btn-info btn-label right"
        id="dropdownMenuLink1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div class="d-flex">
          <div class="flex-shrink-0">
            <i
              class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"
            ></i>
          </div>
          <div class="flex-grow-1">Opciones</div>
        </div>
      </a>
      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownMenuLink1"
        data-popper-placement="bottom-start"
      >
        <li>
          <slot name="verDetalle"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { userIsAdmin } from "@/services/user";

export default {
  name: "ActionsList",
  props: {
    itemData: {
      type: Object,
    },
    approveModal: {
      type: Object,
    },
    rejectModal: {
      type: Object,
    },
    extraModal: {
      type: Object,
    },
  },
  data() {
    return {
      userIsAdmin: userIsAdmin(),
    };
  },
  methods: {
    selectAction(itemData) {
      this.$emit("send-action", itemData);
    },
  },
};
</script>
