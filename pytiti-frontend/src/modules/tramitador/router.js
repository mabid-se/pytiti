const Module = () => import("./Module.vue");
import store from "@/state/store";

const moduleRoute = {
  path: "/tramitador",
  name: "tramitador",
  component: Module,
  children: [
    {
      path: "",
      name: "tramitador.default",
      meta: {
        title: "Dashboard",
      },
      component: () => import("./views/Default.vue"),
    },
    {
      path: "tramites/curso",
      name: "tramitador.lista.tramites.curso",
      meta: {
        title: "Trámites en curso",
      },
      component: () => import("./views/TramitesCurso.vue"),
    },
    {
      path: "tramites/comunicacion/:slug",
      name: "tramitador.comunicacion.tramites.curso",
      meta: {
        title: "Comunicación interna y externa",
      },
      component: () => import("./views/ComunicacionTramitador.vue"),
    },
    {
      path: "tramites/editar/:slug",
      name: "tramitador.editar.tramites.curso",
      meta: {
        title: "Trámite Plantilla Editar",
      },
      component: () =>
        import("./views/tramite-plantillas/TramitePlantillaEditar.vue"),
    },
  ],
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      if (store.getters["authfack/isSenasagUser"])
        return next({ name: "senasag.default" });
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isCompanyUser"]
      )
        return next({ name: "empresa.default" });
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isProcessorUser"]
      )
        return next();
      console.log("You are neither external user nor sia user");
      return false;
    },
  },
};

export default (router) => {
  router.addRoute(moduleRoute);
};
