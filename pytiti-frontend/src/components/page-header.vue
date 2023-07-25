<template>
  <!-- start page title -->
  <div class="row fixed">
    <div class="col-12">
      <div
        class="page-title-box d-flex align-items-center justify-content-between"
      >
        <div class="col-lg-12">
          <div class="titulo_modulo">
            <h4 class="mb-sm-0 align-bottom">
              <i class="ri-briefcase-line icon-grande"></i>
              &nbsp;&nbsp;{{ title }}&nbsp;{{ description }}
            </h4>
          </div>
          <div class="page-title-left ocultar-">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Inicio</a>
              </li>
              <li class="breadcrumb-item active">RS</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters("permissions", ["userIsProcessor"]),
  },
};
</script>
