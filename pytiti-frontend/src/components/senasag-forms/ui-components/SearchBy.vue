<template>
    <div class="pt-3 pb-3 mt-3 mb-3" style="background: #e9ebec;padding-right:1rem;padding-left:1rem;">
        <div class="row align-items-center">
            <div class="col-lg-auto">
                <label for="search-by-select">Buscar representante</label>
            </div>
            <div class="col-lg-2 col-xxl-2">
                <select name="search-by-select" id="search-by-select" class="form-select">
                    <option value="1">NIT</option>
                    <option value="2">Nombre de la empresa (Razón Social)</option>
                    <option value="3">Número de Registro Sanitario</option>
                </select>
            </div>
            <div class="col-lg-5 col-xxl-5">
                <div class="form-icon">
                    <input type="text" class="form-control form-control-icon" id="search-by-input" placeholder="Escriba el texto a buscar">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="col-lg-auto col-xxl-auto">
                <button class="btn btn-success">Buscar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBy"
}
</script>