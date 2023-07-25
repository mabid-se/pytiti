<template>
    <div class="mb-3">
        <select 
        class="form-select rounded-pill mb-3" 
        aria-label="Default select example"
        @change="selectCompany">
            <option>Seleccionar empresa asignada</option>
            <option 
            v-for="(item, index) in companies" 
            :key="index" 
            :value="item.idempresa">{{ item.razonsocial }}</option>
        </select>
    </div>
</template>

<script>
import { getProcessorAsignedCompanies } from '@/services/cuentas';
export default {
    name: "TramitadorEmpresasAsignadas",
    data() {
        return {
            companies: []
        }
    },
    methods: {
        loadProcessorAsignedCompanies() {
            getProcessorAsignedCompanies()
                .then(
                    res => {
                        this.companies = res.results;
                    },
                    err => {
                        console.error(err);
                    }
                );
        },
        selectCompany(e) {
            localStorage.setItem("selected_company", e.target.value);
        }
    },
    mounted() {
        this.loadProcessorAsignedCompanies();
    }
}
</script>

<style>

</style>