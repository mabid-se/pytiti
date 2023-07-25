import store from "@/state/store";

export const getMenu = () => {
  if (store.getters["authfack/isSenasagUser"])
    return getMenuAdmin(store.getters["authfack/user"].profile.groups);
  if (
    store.getters["authfack/isExternalUser"] &&
    store.getters["authfack/isCompanyUser"]
  )
    return getMenuCompany();
  if (
    store.getters["authfack/isExternalUser"] &&
    store.getters["authfack/isProcessorUser"]
  )
    return getMenuProcessor();
  return [];
};

const getMenuCompany = () => {
  const menus = ["empresa"];
  return getAllMenus().filter((m) => menus.includes(m.key));
};

const getMenuProcessor = () => {
  const menus = ["tramitador"];
  return getAllMenus().filter((m) => menus.includes(m.key));
};

const getMenuAdmin = (roles) => {
  const notMenus = ["empresa", "tramitador"];

  return getAllMenus()
    .filter(
      (m) =>
        !notMenus.includes(m.key) &&
        m.roles.length > 0 &&
        roles.filter((value) => m.roles.indexOf(value) > -1).length > 0
    )
    .map((m) => ({
      ...m,
      children: m.children
        .filter(
          (c1) =>
            roles.filter((value) => c1.roles.indexOf(value) > -1).length > 0
        )
        .map((c1) => ({
          ...c1,
          children: c1.children
            ? c1.children.filter(
                (c2) =>
                  roles.filter((value) => c2.roles.indexOf(value) > -1).length >
                  0
              )
            : [],
        })),
    }));
};

const getAllMenus = () => {
  return [
    // {
    //   heading: "SENASAG",
    //   key: "senasag",
    //   children: [
    //     {
    //       to: "profile",
    //       icon: "ri-dashboard-2-line",
    //       text: "Perfil",
    //       nested: false,
    //     },
    //   ],
    // },
    {
      heading: "EMPRESA",
      key: "empresa",
      children: [
        //   {
        //     to: "profile",
        //     icon: "ri-dashboard-2-line",
        //     text: "Perfil",
        //     nested: false,
        //   },
        {
          to: "empresa.lista.sucursales",
          icon: "ri-building-line",
          text: "Surcursales",
          nested: false,
        },
        {
          to: "empresa.lista.tramitadores",
          icon: "ri-team-fill",
          text: "Tramitadores",
          nested: false,
        },
        {
          to: "empresa.lista.tramites.curso",
          icon: "ri-briefcase-line",
          text: "Mis trámites",
          nested: false,
        },
        {
          to: "empresa.lista.solicitudes.tramite",
          text: "Pre-solicitudes de Trámites",
          icon: "ri-briefcase-line",
          nested: false,
        },
        {
          to: "empresa.lista.solicitudes.reportes",
          text: "Reportes",
          icon: "ri-briefcase-line",
          nested: false,
        },
      ],
    },
    {
      heading: "TRAMITADOR",
      key: "tramitador",
      children: [
        //  {
        //    to: "profile",
        //    icon: "ri-dashboard-2-line",
        //    text: "Perfil",
        //    nested: false,
        //  },
        {
          to: "tramitador.lista.tramites.curso",
          icon: "ri-briefcase-line",
          text: "Mis trámites",
          nested: false,
        },
        // {
        //   to: "tramitador.lista.solicitudes.tramite",
        //   text: "Pre-solicitudes de Trámites",
        //   icon: "ri-briefcase-line",
        //   nested: false,
        // },
      ],
    },
    // {
    //   heading: "FUNCIONARIO",
    //   key: "funcionario",
    //   children: [
    //     {
    //       to: "/sia/signin",
    //       icon: "ri-user-fill",
    //       text: "Ingreso",
    //       nested: false,
    //     },
    //     {
    //       to: "solicitudes.sia",
    //       icon: "ri-user-fill",
    //       text: "Solicitudes",
    //       nested: false,
    //     },
    //   ],
    // },

    {
      heading: "ADMINISTRACION",
      roles: [
        "interno-aprobar-empresas",
        "interno-aprobar-solicitudes",
        "interno-aprobar-tramitadores",
        "interno-sia-vobo",
        "interno-roles",
        "interno-permisos",
      ],
      key: "administracion",
      children: [
        {
          to: "sidebarTramitadores",
          icon: "ri-building-line",
          text: "Empresas",
          nested: true,
          roles: ["interno-aprobar-empresas", "interno-aprobar-solicitudes"],
          children: [
            {
              to: "senasag.lista.solicitudes.empresas",
              text: "Empresas",
              roles: ["interno-aprobar-empresas"],
            },
            {
              to: "senasag.lista.solicitudes.sucursales",
              text: "Sucursales",
              roles: ["interno-aprobar-empresas"],
            },

            {
              to: "senasag.lista.solicitudes.tramitador-vincular",
              text: "Solicitudes vincular tramitador",
              roles: ["interno-aprobar-empresas"],
            },
            {
              to: "senasag.lista.solicitudes.tramite",
              text: "Pre-solicitudes de Trámites",
              roles: ["interno-aprobar-solicitudes"],
            },
            {
              to: "senasag.lista.solicitudes.tramite",
              text: "Reportes",
              roles: ["interno-aprobar-solicitudes"],
            },
          ],
        },
        {
          to: "senasag.lista.solicitudes.tramitador",
          icon: "ri-team-fill",
          text: "Tramitadores",
          nested: false,
          roles: ["interno-aprobar-tramitadores"],
          children: [],
        },
        /* {
          to: "solicitudes.sia",
          icon: "ri-user-fill",
          text: "SIA",
          nested: false,
          roles: ["interno-sia-vobo"],
          children: [],
        }, */
        {
          to: "sidebarPassword",
          icon: "ri-user-fill",
          text: "SIA",
          nested: true,
          roles: ["interno-roles", "interno-permisos"],
          children: [
            {
              to: "solicitudes.sia",
              text: "Solicitudes de acceso",
              roles: ["interno-roles", "interno-permisos"],
            },
            {
              to: "solicitudes.contrasena",
              text: "Solicitudes de cambio de contraseña",
              roles: ["interno-roles", "interno-permisos"],
            },
          ],
        },
        {
          to: "sidebarRoles",
          icon: "ri-shield-user-fill",
          text: "Roles y permisos",
          nested: true,
          roles: ["interno-roles", "interno-permisos"],
          children: [
            {
              to: "roles-rol",
              text: "Roles",
              roles: ["interno-roles"],
            },
            {
              to: "permisos-permiso",
              text: "Permisos",
              roles: ["interno-permisos"],
            },
          ],
        },
      ],
    },
    {
      heading: "TRAMITES",
      key: "tramites",
      roles: [
        "interno-aprobar-empresas",
        "interno-aprobar-solicitudes",
        "interno-aprobar-tramitadores",
        "interno-sia-vobo",
        "interno-roles",
        "interno-permisos",
      ],
      children: [
        {
          to: "senasag.lista.tramites.llenados",
          icon: "ri-briefcase-line",
          text: "Trámites",
          roles: [
            "interno-aprobar-empresas",
            "interno-aprobar-solicitudes",
            "interno-aprobar-tramitadores",
            "interno-sia-vobo",
            "interno-roles",
            "interno-permisos",
          ],
          nested: false,
        },
        {
          to: "senasag.lista.firmar.documentos",
          icon: "ri-edit-fill",
          text: "Firmar documentos",
          roles: [
            "interno-aprobar-empresas",
            "interno-aprobar-solicitudes",
            "interno-aprobar-tramitadores",
            "interno-sia-vobo",
            "interno-roles",
            "interno-permisos",
          ],
          nested: false,
        },
      ],
    },
    {
      heading: "REPORTES",
      key: "reportes",
      roles: [],
      children: [
        {
          to: "senasag.lista.tramites.llenados",
          icon: "ri-file-paper-line",
          text: "Económico",
          roles: [],
          nested: false,
        },
        {
          to: "senasag.lista.tramites.llenados",
          icon: "ri-file-paper-line",
          text: "Trámites",
          roles: [],
          nested: false,
        },
        {
          to: "senasag.lista.tramites.llenados",
          icon: "ri-file-paper-line",
          text: "Empresas",
          roles: [],
          nested: false,
        },
        {
          to: "sidebarAlertas",
          icon: "ri-layout-3-line",
          text: "Alertas",
          roles: [],
          nested: true,
          children: [],
        },
        {
          to: "sidebarCreadorTramites",
          icon: "ri-file-list-3-line",
          text: "Creador Trámites",
          roles: [],
          nested: true,
          children: [
            {
              roles: [],
              to: "creador-tramites-listado",
              text: "Listado",
            },
          ],
        },
      ],
    },
    {
      heading: "OTROS",
      key: "otros",
      roles: [],
      children: [
        {
          to: "sidebarUI",
          icon: "ri-pencil-ruler-2-line",
          text: "APIs",
          nested: true,
          control: "sidebarUI",
          children: [
            {
              to: "/firma/firmadigital",
              text: "Firma digital",
            },
            {
              to: "/liquidador/liquidador",
              text: "Liquidador",
            },
          ],
        },
      ],
    },
  ];
};
