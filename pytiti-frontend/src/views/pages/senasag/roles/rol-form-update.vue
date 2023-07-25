<template>
    <div>
      <div class="mb-3">
        <input 
          v-on:change="updateChange"
	        class="form-control"
          id="name"
          v-model="name"
      	/>
      <div class="row">
        
      <div class="col-12">
        PERMISOS DE TRÁMITE:
        <div class="form-check mb-2" v-for="(value, index) in roles" :key="index">
          <input @change="sendChanges" class="form-check-input" type="checkbox" :id="value.id" v-model="value.checked">
          <label class="form-check-label" :for="value.id">{{ value.name }}</label>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import InputFormField from "@/components/senasag-forms/form-fields/input-form-field.vue";  
  import { getPermissionsSiaService, getRoleSiaService } from "@/services/permisos"; 
  import _ from "lodash";
  export default {
    name: "RolesFormUpdate",
    components: {
      InputFormField,
    },
    data() {
        return {
          name: '',
          roles: [],
          update_roles: [],
        }
    },
    methods: {
      sendChanges() {
        let permisos = JSON.parse(JSON.stringify(_.filter(this.roles, function(o) { return o.checked})));
        let _data = {
          "permisos": permisos,
          "name": this.name,
        }
        this.$emit("update-form-data", _data);
      }
    },
    watch: {},
    mounted () {
        this.url_data=this.$route.params.id;
        if(this.url_data){
            getRoleSiaService(this.url_data).then(
                (result) => {
                    this.name = result.name;
                    getPermissionsSiaService().then(
                        (res) => {
                            const items = JSON.parse(JSON.stringify(res.results));
                            let _items = _.mapValues(items, function(val, key) {
                                val.checked = false;
                                if (result.permissions.includes(val.id)){
                                  val.checked = true;
                                }
                                return val;
                            })
                            let filter_items = _.filter(_items, function(o) { return o.permission_type == 'tramit'; });
                            this.roles = filter_items;
                        },
                        err => {
                            console.error(err);
                        }
                    );
                },
                err => {
                    console.error(err);
                }
            );
        };
        
    },
  }
</script>