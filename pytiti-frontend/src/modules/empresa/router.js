const Module = () => import("./Module.vue");
import store from "@/state/store";

const moduleRoute = {
  path: "/empresa",
  name: "empresa",
  component: Module,
  children: [
    {
      path: "",
      name: "empresa.default",
      meta: {
        title: "Dashboard",
      },
      component: () => import("./views/Default.vue"),
    },
    {
      path: "plantilla/previa/:slug",
      name: "empresa.plantilla.vistaPrevia",
      meta: {
        title: "Plantilla Previa",
      },
      component: () =>
        import("./views/tramite-plantillas/TramitePlantillaVistaPrevia.vue"),
    },
    {
      path: "sucursales/",
      name: "empresa.lista.sucursales",
      meta: {
        title: "Listado Sucursales",
      },
      component: () => import("./views/Branches.vue"),
    },
    {
      path: "sucursales/registro",
      name: "empresa.lista.sucursales.create",
      meta: {
        title: "Registro Sucursal",
      },
      component: () => import("./views/CreateBranch.vue"),
    },
    {
      path: "tramitadores/",
      name: "empresa.lista.tramitadores",
      meta: {
        title: "Tramitadores de la Empresa",
      },
      component: () => import("./views/Tramitadores.vue"),
    },
    {
      path: "tramites",
      name: "empresa.lista.tramites",
      meta: {
        title: "Trámites",
      },
      component: () => import("./views/TramitesLista.vue"),
    },
    {
      path: "tramites/curso",
      name: "empresa.lista.tramites.curso",
      meta: {
        title: "Trámites en curso",
      },
      component: () => import("./views/TramitesCurso.vue"),
    },
    {
      path: "tramites/pre-solicitados",
      name: "empresa.lista.solicitudes.tramite",
      meta: {
        title: "Trámites pre-solicitados",
      },
      component: () => import("./views/TramitesPreSolicitados.vue"),
    },
    {
      path: "tramites/reportes",
      name: "empresa.lista.solicitudes.reportes",
      meta: {
        title: "Reportes",
      },
      component: () => import("./views/reportes/ReportesEmpresas.vue"),
    },
    {
      path: "tramites/comunicacion/:slug",
      name: "empresa.comunicacion.tramites.curso",
      meta: {
        title: "Comunicación interna y externa",
      },
      component: () => import("./views/ComunicacionEmpresa.vue"),
    },
    {
      path: "tramites/editar/:slug",
      name: "empresa.editar.tramites.curso",
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
        return next();
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isProcessorUser"]
      )
        return next({ name: "tramitador.default" });
      console.log("You are neither external user nor sia user");
      return false;
    },
  },
};

export default (router) => {
  router.addRoute(moduleRoute);
};
