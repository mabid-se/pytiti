<template>
	<h2>testFields</h2>
	<div v-for="(field, index) in fields" :key="index">
		<InputField 
			v-if="field.type_field === 'input'" 
			:field="field" 
			@update-change="updateFormData" 
		/>
	</div>
</template>

<script>
	import InputField from "@/components/senasag-forms/test-fields/input-field";
	export default {
		name: "FieldsSpike",
		components: {
			InputField,
		},
		data() {
			return {
				fields: [
					{
						type_field: "input",
						value: "hola",
						label: "Field 1",
						required: true,
						name: "field_1",
						type: "text",
						entity_field: {
							name: "field1",
						}
					}
				],
				form_data: undefined
			}
		},
		methods: {
			updateFormData(data) {
				this.form_data = {...this.form_data, ...data};
			}
		},
		mounted() {
			alert("hola");
		}
	}
</script>