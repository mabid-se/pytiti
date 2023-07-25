const Module = () => import("./Module.vue");
import store from "@/state/store";

const moduleRoute = {
  path: "/senasag",
  name: "senasag",
  component: Module,
  children: [
    {
      path: "",
      name: "senasag.default",
      meta: {
        title: "Dashboard",
      },
      component: () => import("./views/Default.vue"),
    },
    {
      path: "accesosia/solicitudes-sia",
      name: "solicitudes.sia",
      meta: {
        title: "Solicitudes SIA",
      },
      component: () => import("./views/acceso-sia/SolicitudesSia.vue"),
    },
    {
      path: "accesosia/solicitudes-de-cambio-contraña",
      name: "solicitudes.contrasena",
      meta: {
        title: "Solicitudes SIA",
      },
      component: () => import("./views/cambio-acceso/SolicitudesAcceso.vue"),
    },
    {
      path: "accesosia/solicitudes-sia/:uid",
      name: "solicitudessiadetalle",
      props: true,
      meta: {
        title: "Solicitudes SIA Detalle",
      },
      component: () => import("./views/acceso-sia/SolicitudesSiaDetalle.vue"),
    },
    {
      path: "actualizar/permiso/:id/",
      name: "actualizar-permiso",
      meta: {
        title: "Permiso",
      },
      component: () => import("./views/actualizar/Permiso.vue"),
    },
    {
      path: "actualizar/rol/:id/",
      name: "actualizar-rol",
      meta: {
        title: "Rol",
      },
      component: () => import("./views/actualizar/Rol.vue"),
    },

    {
      path: "permisos",
      name: "permisos-permiso",
      meta: {
        title: "Ver permisos",
      },
      component: () => import("./views/Permiso.vue"),
    },
    {
      path: "registro/permiso",
      name: "registro-permiso",
      meta: {
        title: "Permiso",
      },
      component: () => import("./views/registros/Permiso.vue"),
    },
    {
      path: "registro/rol",
      name: "registro-rol",
      meta: {
        title: "Rol",
      },
      component: () => import("./views/registros/Rol.vue"),
    },
    {
      path: "roles",
      name: "roles-rol",
      meta: {
        title: "Ver roles",
      },
      component: () => import("./views/Roles.vue"),
    },
    {
      path: "sia/cambiocontrasena",
      name: "cambiocontrasena",
      meta: {
        title: "Solicitud de Servicios",
      },
      component: () => import("./views/SiaCambioContrasena"),
    },

    {
      path: "solicitudes/empresa/",
      name: "senasag.lista.solicitudes.empresas",
      meta: {
        title: "Listado Solicitudes Empresas",
      },
      component: () => import("./views/approve-requests/Company.vue"),
    },
    {
      path: "solicitudes/sucursal/",
      name: "senasag.lista.solicitudes.sucursales",
      meta: {
        title: "Listado Solicitudes Sucursales",
      },
      component: () => import("./views/approve-requests/Sucursales.vue"),
    },
    {
      path: "solicitudes/tramitador/",
      name: "senasag.lista.solicitudes.tramitador",
      meta: {
        title: "Listado Solicitudes Tramitadores",
      },
      component: () => import("./views/approve-requests/Tramitador.vue"),
    },
    {
      path: "solicitudes/tramitador-vincular/",
      name: "senasag.lista.solicitudes.tramitador-vincular",
      meta: {
        title: "Listado Solicitudes Vincular Tramitadore",
      },
      component: () =>
        import("./views/approve-requests/TramitadorVincular.vue"),
    },
    {
      path: "solicitudes/empresa/:id_solicitud_cuenta/",
      name: "senasag.detalle.solicitudes.empresas",
      meta: {
        title: "Detalle Solicitud Empresa",
      },
      component: () => import("./views/approve-requests/DetailedCompany.vue"),
    },
    {
      path: "solicitudes/sucursal/:id_sucursal/",
      name: "senasag.detalle.solicitudes.sucursales",
      meta: {
        title: "Detalle Solicitud Sucursal",
      },
      component: () => import("./views/approve-requests/DetalleSucursal.vue"),
    },
    {
      path: "solicitudes/tramitador/:id_solicitud_cuenta/",
      name: "senasag.detalle.solicitudes.tramitador",
      meta: {
        title: "Detalle Solicitud Tramitador",
      },
      component: () => import("./views/approve-requests/DetalleTramitador.vue"),
    },
    {
      path: "solicitudes/tramitador-vincular/:id_solicitud_vincular_tramitador/",
      name: "senasag.detalle.solicitudes.tramitador-vincular",
      meta: {
        title: "Detalle Solicitud Vincular Tramitador",
      },
      component: () =>
        import("./views/approve-requests/DetalleVincularTramitador.vue"),
    },
    {
      path: "tramites",
      name: "senasag.lista.tramites.llenados",
      meta: {
        title: "Trámites",
      },
      component: () => import("./views/TramitesAdmin.vue"),
    },
    {
      path: "firmar-documentos",
      name: "senasag.lista.firmar.documentos",
      meta: {
        title: "Firmar documentos",
      },
      component: () => import("./views/FirmarDocumentos.vue"),
    },
    {
      path: "tramites/pre-solicitados",
      name: "senasag.lista.solicitudes.tramite",
      meta: {
        title: "Trámites pre-solicitados",
      },
      component: () =>
        import("./views/approve-requests/TramitesPreSolicitados.vue"),
    },
    {
      path: "tramites/:id_solicitud_tramite",
      name: "senasag.detalle.tramites.llenados",
      meta: {
        title: "Trámites",
      },
      component: () =>
        import(
          "./views/plantilla-tramite/TramitePlantillaEditar/TramitePlantillaEditar.vue"
        ),
    },
    {
      path: "tramites/comunicacion/:id_solicitud_tramite",
      name: "senasag.comunicacion.tramites.curso",
      meta: {
        title: "Comunicación interna y externa",
      },
      component: () => import("./views/ComunicacionSenasag.vue"),
    },
    {
      path: "tramites/pre-solicitados/:requestId",
      name: "senasag.detalle.solicitudes.tramite",
      meta: {
        title: "Detalle trámite pre-solicitados",
      },
      component: () =>
        import("./views/approve-requests/TramitePreSolicitudDetalle.vue"),
    },
  ],
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      if (store.getters["authfack/isSenasagUser"]) return next();
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isCompanyUser"]
      )
        return next({ name: "empresa.default" });
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
