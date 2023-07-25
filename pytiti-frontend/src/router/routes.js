import store from "@/state/store";

export default [
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
      authRequired: true,
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
          return next({ name: "tramitador.default" });
        console.log("You are neither external user nor sia user");
        return false;
      },
    },
    component: () => import("../views/dashboard/ecommerce/index.vue"),
  },
  {
    path: "/firma/firmadigital",
    name: "Firma",
    meta: { title: "Firma", authRequired: true },
    component: () => import("../views/firma/firmadigital"),
  },
  {
    path: "/firma/certificado",
    name: "Certificado",
    meta: { title: "Certificado", authRequired: true },
    component: () => import("../views/firma/certificado"),
  },
  {
    path: "/pages/profile",
    name: "profile",
    meta: { title: "Profile", authRequired: true },
    component: () => import("../views/pages/profile/simple"),
  },
  {
    path: "/pages/profile-setting",
    name: "profile-setting",
    meta: { title: "Setting", authRequired: true },
    component: () => import("../views/pages/profile/setting"),
  },
  {
    path: "/rubros/",
    name: "rubros",
    meta: {
      title: "Tasa y rubro",
      authRequired: true,
    },
    component: () => import("../views/pages/senasag/rubro/rubro"),
  },

  {
    path: "/liquidador/liquidador",
    name: "liquidador",
    meta: {
      title: "liquidador",
      authRequired: true,
    },
    component: () => import("../views/pages/senasag/liquidador/liquidador"),
  },
  {
    path: "/liquidador/liquidadorencontrado",
    name: "liquidadorencontrado",
    meta: {
      title: "liquidadorencontrado",
      authRequired: true,
    },
    component: () =>
      import("../views/pages/senasag/liquidador/liquidadorencontrado"),
  },
  {
    path: "/liquidador/liquidadoraceptado",
    name: "liquidadoraceptado",
    meta: {
      title: "liquidadoraceptado",
      authRequired: true,
    },
    component: () =>
      import("../views/pages/senasag/liquidador/liquidadoraceptado"),
  },
  {
    path: "/liquidador/liquidadorerror",
    name: "liquidadorerror",
    meta: {
      title: "liquidadorerror",
      authRequired: true,
    },
    component: () =>
      import("../views/pages/senasag/liquidador/liquidadorerror"),
  },
  {
    path: "/liquidador/liquidadornoseencontro",
    name: "liquidadornoseencontro",
    meta: {
      title: "liquidadornoseencontro",
      authRequired: true,
    },
    component: () =>
      import("../views/pages/senasag/liquidador/liquidadornoseencontro"),
  },
  {
    path: "/liquidador/liquidadorusada",
    name: "liquidadorusada",
    meta: {
      title: "liquidadorusada",
      authRequired: true,
    },
    component: () =>
      import("../views/pages/senasag/liquidador/liquidadorusada"),
  },
  /**
   * SENASAG rutas senasag
   */
  /* ask to delete */
  {
    path: "/productos/lista",
    name: "productos-lista",
    meta: {
      title: "Listado Productos",
    },
    component: () => import("../views/pages/senasag/productos/lista-productos"),
  },
  /**
   * SENASAG Creador-Trámites
   */
  {
    path: "/creador-tramites",
    meta: {
      title: "Módulo de creación y modificación de formularios",
    },
    component: () => import("../views/pages/senasag/tramites/listado"),
    children: [
      {
        path: "listado",
        component: () =>
          import("../views/pages/senasag/tramites/tramites-table"),
        name: "creador-tramites-listado",
      },
      {
        path: "crear",
        component: () =>
          import("../views/pages/senasag/tramites/tramites-form-container"),
        name: "creador-tramites-crear",
      },
    ],
  },
  {
    path: "/creador-tramites/:idTramite/detalle",
    name: "creador-tramites-show",
    meta: {
      title: "Módulo de creación y modificación de formularios",
    },
    component: () => import("../views/pages/senasag/tramites/detalle/index"),
  },
];
