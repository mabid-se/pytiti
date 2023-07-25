<template>
  <teleport to="#modals">
    <div
      class="modal fade zoomIn"
      :id="attrs.id"
      tabindex="-1"
      style="display: none"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="btn-close"
              @click="finishSuccess"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mt-2 text-center">
              <i
                class="ri-thumb-up-line"
                style="font-size: 100px; color: #158463"
              ></i>
              <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>{{ attrs.title }}</h4>
                <p class="text-muted mx-4 mb-0">{{ attrs.message }}</p>
              </div>
            </div>
            <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
              <button
                type="button"
                @click="finishSuccess"
                data-bs-dismiss="modal"
                class="btn btn-success w-sm"
              >
                {{ attrs.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "SuccessModal",
  props: {
    attrs: {
      type: Object,
    },
  },
  methods: {
    finishSuccess() {
      this.$router.push(this.attrs.redirectUrl);
    },
  },
};
</script>
