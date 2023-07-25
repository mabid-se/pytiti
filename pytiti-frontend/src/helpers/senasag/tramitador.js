export const getProcessorCompanies = () => {
	try {
		let linkedCompanies = JSON.parse(localStorage.getItem("user").empresas_asociadas);
		return linkedCompanies;
	} catch(err) {
		return []
	}
}

export const saveProcessorCompany = (companyId) => {
	localStorage.setItem("selected_company", companyId);
}

export const getProcessorCompany = () => {
	return localStorage.getItem("selected_company");
}