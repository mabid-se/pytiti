<template>
    <div class="card">
        <GroupName name="Datos personales del representante legal" />
        <div class="card-body">
            <div class="live-preview">
                <div class="row gy-4">
                    <div class="col-lg-6">
                        <label for="numeroci" class="required">N° de Carnet de Identidad: </label>
                        <input 
                        @input="checkField('ci', $event)"
                        type="text" 
                        class="form-control" 
                        id="numeroci" 
                        name="numeroci" />
                        <div class="invalid-feedback">{{ message }}</div>
                    </div>
                    <div class="col-lg-6">
                        <label for="expedido" class="required">Expedido en: </label>
                        <input type="text" class="form-control" id="expedido" name="expedido" />
                    </div>
                    <div class="col-lg-6">
                        <label for="lugarnacimiento" class="required">Lugar de nacimiento: </label>
                        <input type="text" class="form-control" id="lugarnacimiento" name="lugarnacimiento" />
                    </div>
                    <div class="col-lg-3">
                        <label for="fechanacimiento">Fecha de nacimiento: </label>
                        <input type="date" class="form-control" id="fechanacimiento" name="fechanacimiento" />
                    </div>
                    <div class="col-lg-3">
                        <label for="genero">Género: </label>
                        <select class="form-control" id="genero" name="genero">
                            <option>Seleccionar género</option>
                            <option value="H">Hombre</option>
                            <option value="M">Mujer</option>
                        </select>
                    </div>
                    <div class="col-lg-3">
                        <label for="prefijonombre">Prefijo del nombre: </label>
                        <input type="text" class="form-control" id="prefijonombre" name="prefijonombre" />
                    </div>
                    <div class="col-lg-6">
                        <label for="nombres" class="required">Nombres: </label>
                        <input type="text" class="form-control" id="nombres" name="nombres" />
                    </div>
                    <div class="col-lg-6">
                        <label for="apellido_paterno" class="required">Apellido Paterno: </label>
                        <input type="text" class="form-control" id="apellido_paterno" name="apellido_paterno" />
                    </div>
                    <div class="col-lg-6">
                        <label for="apellido_materno">Apellido Materno: </label>
                        <input type="text" class="form-control" id="apellido_materno" name="apellido_materno" />
                    </div>
                    <div class="col-lg-6">
                        <label for="relacionacargo" class="required">Relación con la empresa o cargo: </label>
                        <input type="text" class="form-control" id="relacionacargo" name="relacionacargo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <GroupName name="Residencia del representante legal" />
        <div class="card-body">
            <div class="live-preview">
                <div class="row gy-4">
                    <div class="col-lg-6">
                        <label for="direccion" class="required">Dirección: </label>
                        <input type="text" class="form-control" id="direccion" name="direccion" />
                    </div>
                    <div class="col-lg-6">
                        <label for="ciudad" class="required">Ciudad / Localidad: </label>
                        <input type="text" class="form-control" id="ciudad" name="ciudad" />
                    </div>
                    <div class="col-lg-6">
                        <label for="telefonos" class="required">Teléfono / Celular: </label>
                        <input type="text" class="form-control" id="telefonos" name="telefonos" />
                    </div>
                    <div class="col-lg-6">
                        <label for="correoe" class="required">E-mail: </label>
                        <input type="text" class="form-control" id="correoe" name="correoe" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <GroupName name="Documentación de representante legal" />
        <div class="card-body">
            <div class="live-preview">
                <div class="row gy-4">
                    <div class="col-lg-4">
                        <label for="poderrepresentante">Porder de representante legal: </label>
                        <input 
                        @change="handleChange"
                        class="form-control" 
                        type="file" 
                        name="poderrepresentante" 
                        id="poderrepresentante" 
                        multiple>
                        <!-- multiple-file-preview -->
                        <div v-if="loadedFiles">
                            <div class="border rounded border-dashed p-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-3">
                                        <div class="avatar-sm">
                                            <div class="avatar-title bg-light text-secondary rounded fs-24">
                                                <i class="ri-file-pdf-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="fs-13 mb-1"><a href="#" class="text-body text-truncate d-block">archivo.pdf</a></h5>
                                        <div>2.2MB</div>
                                    </div>
                                    <div class="flex-shrink-0 ms-2">
                                        <div class="d-flex gap-1">
                                            <button type="button" class="btn btn-icon text-muted btn-sm fs-18"><i class="ri-download-2-line"></i></button>
                                            <div class="dropdown">
                                                <button class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="ri-more-fill"></i>
                                                </button>
                                                <ul class="dropdown-menu" style="">
                                                    <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Cambiar</a></li>
                                                    <li><a class="dropdown-item" href="#"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Borrar</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /multiple-file-preview -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GroupName from "@/components/senasag-forms/group-name.vue";
import MapFormField from "@/components/senasag-forms/form-fields/map-form-field.vue";

// service-validations
import { fieldValidation } from "@/services/validations";

export default {
    name: "RepresentanteLegal",
    components: {
        GroupName,
        MapFormField,
    },
    data() {
        return {
            files: [],
            selectFile: undefined,
            loadedFiles: false,
            // form-data
            message: undefined,
        }
    },
    methods: {
        handleChange(e) {
            this.loadedFiles = true;
            let files = e.target.files;
            this.files = files;
            console.log(this.files);
        },
        checkField(field, e) {
            let data = {
                [field]: e.target.value
            };
            console.log(data);
            fieldValidation(data)
                .then(
                    res => {
                        console.log(res.data);
                    },
                    err => {
                        console.error(err);
                    }
                )
        },
    }
}
</script>