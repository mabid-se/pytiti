<template>
  <teleport to="#modals">
    <div
      class="modal fade"
      :id="id"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" :class="cssClasses">
        <div class="modal-content">
          <div class="modal-header" v-if="showHeader">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click.prevent="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  props: {
    idModal: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      default: "Title",
    },
    closable: {
      type: Boolean,
      default: true,
    },
    cssClasses: {
      type: Object,
      default: () => {},
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["on:close:modal"],
  data() {
    return {
      id:
        this.idModal ??
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 15),
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(`#${this.id}`);
    this.modal.show();
  },
  methods: {
    closeModal(emit = true) {
      if (!this.closable) return;
      this.modal.hide();
      if (emit) this.$emit("on:close:modal");
    },
  },
};
</script>
