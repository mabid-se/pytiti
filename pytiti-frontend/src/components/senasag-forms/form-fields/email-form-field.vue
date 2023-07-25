<template>
	<div class="mb-3">
		<label :for="field.id">{{ field.label }}</label>
		<input
      @change="validateEmail"
      :id="field.id"
      :name="field.name"
      type="email"
      class="form-control" 
      :class="{
      	'is-invalid': hasErrors
      }"
      :required="field.required" 
      :placeholder="field.placeholder"
  	/>
    <div v-if="hasErrors === true" class="invalid-feedback" style="diplay:block">
        {{ feedback.error }}
    </div>
	</div>
</template>

<script>
	import { checkEmailIsUnique } from "@/services/validations";
	export default {
		name: "EmailFormField",
		props: {
			field: {
				type: Object
			}
		},
		data() {
			return {
				feedback: {
					error: "",
					data: false
				},
				hasErrors: false,
			}
		},
		methods: {
			validateEmail(e) {
				if (this.verifyEmailType(e)) {
					checkEmailIsUnique({email: e.target.value})
						.then(
							res => {
								this.feedback = res;
								this.hasErrors = this.feedback.data;
								this.updateField(e);
							},
							err => {
								this.hasErrors = true;
								console.error(err);
							}
						);
				} else {
					this.hasErrors = true;
				}
		  },
		  verifyEmailType(e) {
		  	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
		  		this.hasErrors = false;
		  		return true;
		  	}
		  	this.hasErrors = true;
		  	return false;
		  },
		  updateField(e) {
		  	if (!this.hasErrors) {
		  		let data = { [this.field.name]: e.target.value.trim() };
		  		this.$emit("update-change", data);
		  	} else {
		  		this.$emit("update-change", { [this.field.name]: null });
		  	}
		  }
		}
	}
</script>