<template>
  <div class="card">
    <div class="card-header d-flex">
      <slot name="title"></slot>
    </div>
    <!-- end card header -->
    <div class="card-body card-padding d-flex align-items-end flex-column">
      <slot></slot>
    </div>
    <!-- end card-body -->
  </div>
</template>

<script>

export default {
  name: "kt-card",
};
</script>
