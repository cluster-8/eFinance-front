export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    //? PAINEL PRINCIPAL
    {
      name: "dashboard",
      displayName: "menu.dashboard",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
    },
    {
      name: "ranking",
      displayName: "menu.ranking",
      meta: {
        icon: "vuestic-iconset-statistics",
      },
      disabled: true,
      children: [
        {
          name: "tariffs",
          displayName: "menu.tariffs",
        },
        {
          name: "topfive",
          displayName: "menu.topfive",
        },
        {
          name: "linhadotempo",
          displayName: "menu.linhadotempo",
        },
      ],
      /*  children: [
        
        {
          name: 'tariffs',
          displayName: 'menu.tariffs',
        },
        {
          name: 'timeline',
          displayName: 'menu.timeline',
        },
        {
          name: 'topfive',
          displayName: 'menu.topfive',
        },
      ], */
    },

    {
      name: "comparator",
      displayName: "menu.comparator",
      meta: {
        icon: "vuestic-iconset-tables",
      },
      /* children: [
       
        {
          name: 'products-services',
          displayName: 'menu.productsServices',
        },
        {
          name: 'banks',
          displayName: 'menu.banks',
        },
        {
          name: 'currency',
          displayName: 'menu.currency',
        },
      ], */
    },
  ] as INavigationRoute[],
};
