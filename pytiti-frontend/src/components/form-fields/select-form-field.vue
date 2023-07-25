<template>
	<div class="mb-3">
		<label :for="field.id">{{ field.label }}</label>
		<select
	        @input="updateField"
	        :id="field.id"
	        :name="field.name"
	        :type="field.type"
	        class="form-control"
	        :placeholder="field.placeholder" 
	        :required="field.required">
	        <option>-- Seleccionar --</option>
	        <option 
	        v-for="(item, index) in field.options" 
	        :key="index" 
	        :value="item.id">{{ item.name }}</option>
	    </select>
      	<div  class="invalid-feedback" :style="checked && 'display:block'">
            Éste campo es requerido
        </div>
	</div>
</template>

<script>
	export default {
		name: "InputFormField",
		props: {
			field: {
				type: Object
			}
		},
		data() {
			return {
				checked: false,
			}
		},
		methods: {
			updateField(e) {
				if (e.target.value === "" && this.field.required) {
					this.checked = true;
					e.target.classList.add("is-invalid");
					e.target.classList.remove("is-valid");
					this.$emit("update-change", {[e.target.name]: null});
				} else {
					this.checked = false;
					e.target.classList.add("is-valid");
					e.target.classList.remove("is-invalid");
					this.$emit("update-change", {[e.target.name]: e.target.value});
				}
			}
		}
	}
</script>