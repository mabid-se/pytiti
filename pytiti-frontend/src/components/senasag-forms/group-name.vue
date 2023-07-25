<template>
    <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">{{ name}}</h4>
    </div><!-- end card header -->
</template>

<script>
    export default {
        name: "GroupName",
        props: {
            name: {
                type: String,
            },
        },
    }
</script>