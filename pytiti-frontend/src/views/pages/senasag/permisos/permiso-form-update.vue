<template>
      <div class="mb-3">
        <label >Nombre del permiso</label>
        <input 
          v-on:change="updateChange"
	        class="form-control"
          id="name"
          v-model="data.name"
      	/>
        <div class="mb-3">
          <label>Descripción</label>
          <input 
            v-on:change="updateChange"
            class="form-control"
            id="description"
            v-model="data.description"
          />
        </div>
        <div class="mb-3" v-if="valueshow">
          <label> Valor del permiso </label>
          <input 
            v-on:change="updateChange"
            class="form-control"
            id="value"
            v-model="data.value"
          />
        </div>
    </div>
</template>

<script>
  
  import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";  
  import { getPermissionSiaService } from "@/services/permisos"; 
  import _ from "lodash";
  export default {
    name: "PermisoFormUpdate",
    components: {
      InputFormField,
    },
    data() {
        return {
          data : {
            name: '',
            description: '',
            value: '',
          },
          valueshow: false,
          
        }
    },
    methods: {
      updateChange() {
          this.$emit("update-form-data", this.data);
      }
    },
    watch: {},
    mounted () {
        this.url_data=this.$route.params.id;
        if(this.url_data){
          getPermissionSiaService(this.url_data).then(
                (result) => {
                    this.data.name = result.name;
                    this.data.description = result.description;
                    if(result.permission_type == 'administration') {
                        this.valueshow=true;
                        this.data.value = result.value;
                    }
                  },
                err => {
                    console.error(err);
                }
          );
        }
    },
  }
</script>