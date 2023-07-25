import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "./i18n";
import store from "./state/store";
import loader from "vue-ui-preloader";
import BootstrapVue3 from "bootstrap-vue-3";
import vClickOutside from "click-outside-vue3";
// import VueApexCharts from "vue3-apexcharts";
import Maska from "maska";
import Select2 from "vue3-select2-component";

import VueFeather from "vue-feather";
// import Particles from "particles.vue3";

import "@/assets/scss/config/default/app.scss";
import "@vueform/slider/themes/default.css";

import { initFirebaseBackend } from "./authUtils";
import { configureFakeBackend } from "./helpers/fake-backend";

import Notifications from "@kyvg/vue3-notification";

// open layers
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";

// vue-good-table-next
import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

// vue3-pdf
import VuePdf from "vue3-pdfjs";

// ck-editor
import CKEditor from "@ckeditor/ckeditor5-vue";

// html to paper
//import VueHtmlToPaper from 'vue-html-to-paper';
import VueHtmlToPaper from "./helpers/html_to_paper";

import publicModule from "./modules/public";
import senasagModule from "./modules/senasag";
import empresaModule from "./modules/empresa";
import tramitadorModule from "./modules/tramitador";

import { registerModules } from "./register-modules";

import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import flatPickrC from "vue-flatpickr-component";
flatpickr.localize(Spanish);
flatpickr.setDefaults({
  altInput: true,
  altFormat: "d-m-y",
  dateFormat: "Y-m-d",
  static: true,
  wrap: false,
});

registerModules({
  public: publicModule,
  senasag: senasagModule,
  empresa: empresaModule,
  tramitador: tramitadorModule,
});

// custom styles
import "./assets/css/custom.css";

import { tooltip, sortableTable, sortableNested, choice } from "@/directives";
/**
 * Global components here...
 */
import ErrorMessage from "./components/portals/error-message.vue";
import SuccessMessage from "./components/portals/success-message.vue";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}

AOS.init({
  easing: "ease-out-back",
  duration: 1000,
});

createApp(App)
  .use(store)
  .use(router)
  // .use(VueApexCharts)
  .use(loader)
  .use(BootstrapVue3)
  .use(Notifications)
  .use(VueGoodTablePlugin)
  .use(OpenLayersMap)
  .use(VuePdf)
  .use(CKEditor)
  .component(VueFeather.type, VueFeather)
  .component("ErrorMessage", ErrorMessage)
  .component("SuccessMessage", SuccessMessage)
  .component("KtFlatPickr", flatPickrC)
  .component("Select2", Select2)
  .use(Maska)
  // .use(Particles)
  .use(i18n)
  .directive("tooltip", tooltip)
  .directive("sortable", sortableTable)
  .directive("nested", sortableNested)
  .directive("choice", choice)
  .use(vClickOutside)
  .use(VueHtmlToPaper)
  .mount("#app");
