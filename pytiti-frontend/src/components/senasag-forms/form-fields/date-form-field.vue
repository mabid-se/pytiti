<template>
	<div class="mb-3">
		<label :for="field.id">{{ field.label }}</label>
		<input
	        @input="updateField"
	        :id="field.id"
	        :name="field.name"
	        :type="field.type"
	        class="form-control"
	        :placeholder="field.placeholder" 
	        :required="field.required"
      	/>
      	<div  class="invalid-feedback" :style="checked && 'display:block'">
            Éste campo es requerido
        </div>
	</div>
</template>

<script>
	export default {
		name: "DateFormField",
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
					let date = new Date(e.target.value);
					this.$emit("update-change", {[e.target.name]: date.toISOString()});
				}
			}
		}
	}
</script>