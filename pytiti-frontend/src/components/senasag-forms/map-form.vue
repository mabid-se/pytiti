<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">
                {{ form.form_name }}
            </h4>
        </div>
        <div class="card-body">
            <div class="live-preview">
                <MapField :field="form.field" />
            </div>
        </div>
    </div>
</template>

<script>
    import MapField from "./fields/map-field.vue";

    export default {
        name: "MapForm",
        components: {
            MapField,
        },
        data() {
            return {
                form: {
                    form_name: "Mapa",
                    field: {
                        element: "map",
                        label: "Mapa ubicación",
                        label_class: "form-label",
                        id: "map-field"
                    }
                }
            }
        },
    }
</script>