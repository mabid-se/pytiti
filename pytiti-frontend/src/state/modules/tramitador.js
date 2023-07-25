import { 
	getProcessorCompanies,
	saveProcessorCompany
} from "@/helpers/senasag/tramitador";

export const state = {
	asignedCompanies: getProcessorCompanies(),
	selectedCompany: undefined,
}

export const mutations = {
	SELECT_COMPANY(state, companyId) {
		state.selectedCompany = companyId;
		saveProcessorCompany(company);
	}
}

export const actions = {
	setSelectedCompany({ dispatch, commit}, {companyId}) {
		commit("SELECT_COMPANY", companyId);
	}
}

export const getters = {
	getAsignedCompanies(state) {
		return state.asignedCompanies;
	},
	getSelectedCompany(state) {
		return state.selectedCompany;
	}
}