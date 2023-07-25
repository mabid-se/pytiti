<template>
    <div :class="className">
        
        <div class="mb-3">
            <label for="copianit" class="form-label required">Fotocopia de NIT</label>
            <input 
                @change="handleFile" 
                type="file" class="form-control" id="copianit" name="copianit" 
                accept="application/pdf" 
            />
        </div>
        <div class="mb-3">
            <label for="cartasolicitud" class="form-label required">
              Carta de solicitud de asignación de cuenta usuario y contraseña
            </label>
            <input 
                @change="handleFile" 
                type="file" class="form-control" id="cartasolicitud" name="cartasolicitud" 
                accept="application/pdf" 
            />
        </div>
    </div>
</template>

<script>
// import { uploadFiles } from "@/services/solicitudes";

export default {
    name: "EmpresaDocsForm",
    props: {
        errors: {
            type: Object,
            default() { return {}; },
        },
        modelValue: {
            type: Object,
            default() { return {}; },
        },
        className: {
            type: String
        },
        companyId: {
            type: String
        }
    },
    methods: {
        handleFile(e) {
            this.$emit("update:modelValue", {
                ...this.modelValue,
                [`${e.target.name}`]: e.target.files[0],
                [`${e.target.name}_name`]: e.target.name,
                [`${e.target.name}_table`]: "empresas"
            });
        },
        
    }
}
</script>

<style>

</style>