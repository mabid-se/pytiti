<template>
    <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">{{ name }}</h4>
    </div>
</template>

<script>
    export default {
        name: "CardName",
        props: {
            name: {
                type: String,
            },
        },
    }
</script>