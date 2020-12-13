export const navigationsAI = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard/analytics",
  //   icon: "dashboard"
  // },
  {
    name: "Dashboard",
    path: "/record/dashbord",
    icon: "dashboard"
  },
  {
    name: "Record",
    icon: "control_camera",
    //path: "/session/404",
    children: [
      {
        name: "Report Disease",
        path: "/record/create",
        iconText: "A"
      },
      {
        name: "My Requests",
        path: "/record/officerview",
        iconText: "M"
      }
    ]
  },
  {
    name: "Disease",
    icon: "description",
    children: [
      {
        name: "Create New",
        path: "/disease/create",
        iconText: "B"
      },
      {
        name: "List All",
        path: "/disease/listAll",
        iconText: "E"
      }
    ]
  },
  {
    name: "Seeds",
    icon: "trending_up",
    children: [
      {
        name: "Level 1",
        icon: "list",
        children: [
          {
            name: "Item 1",
            path: "/charts/victory-charts",
            iconText: "1"
          },
          {
            name: "Item 2",
            path: "/charts/react-vis",
            iconText: "2"
          },
          {
            name: "Item 3",
            path: "/charts/recharts",
            iconText: "3"
          },
          {
            name: "Item 4",
            path: "/charts/echarts",
            iconText: "4"
          }
        ]
      }
    ]
  },
  // {
    // name: "Utilities",
    // icon: "format_list_bulleted",
    // children: [
    //   {
    //     name: "Color",
    //     // path: "/utilities/color",
    //     path: "/session/404",
    //     iconText: "C"
    //   },
    //   {
    //     name: "Spacing",
    //     // path: "/utilities/spacing",
    //     path: "/session/404",
    //     iconText: "S"
    //   },
    //   {
    //     name: "Typography",
    //     // path: "/utilities/typography",
    //     path: "/session/404",
    //     iconText: "T"
    //   },
    //   {
    //     name: "Display",
    //     // path: "/utilities/display",
    //     path: "/session/404",
    //     iconText: "D"
    //   }
    // ]
  // },
  // {
  //   name: "Sessions",
  //   icon: "trending_up",
  //   children: [
  //     {
  //       name: "Sign in",
  //       iconText: "SI",
  //       // path: "/session/signin"
  //       path: "/session/404"
  //     },
  //     {
  //       name: "Sign up",
  //       iconText: "SU",
  //       // path: "/session/signup"
  //       path: "/session/404"
  //     },
  //     {
  //       name: "Forgot password",
  //       iconText: "FP",
  //       // path: "/session/forgot-password"
  //       path: "/session/404"
  //     },
  //     {
  //       name: "Error",
  //       iconText: "404",
  //       path: "/session/404"
  //     }
  //   ]
  // },
  
  

  // {
  //   name: "UI Kits",
  //   icon: "favorite",
  //   badge: { value: "50+", color: "secondary" },
  //   children: [
  //     {
  //       name: "Auto Complete",
  //       path: "/material/autocomplete",
  //       iconText: "A"
  //     },
  //     {
  //       name: "Buttons",
  //       path: "/material/buttons",
  //       iconText: "B"
  //     },
  //     {
  //       name: "Checkbox",
  //       path: "/material/checkbox",
  //       iconText: "C"
  //     },
  //     {
  //       name: "Dialog",
  //       path: "/material/dialog",
  //       iconText: "D"
  //     },
  //     {
  //       name: "Expansion Panel",
  //       path: "/material/expansion-panel",
  //       iconText: "E"
  //     },
  //     {
  //       name: "Form",
  //       path: "/material/form",
  //       iconText: "F"
  //     },
  //     {
  //       name: "Icons",
  //       path: "/material/icons",
  //       iconText: "I"
  //     },
  //     {
  //       name: "Menu",
  //       path: "/material/menu",
  //       iconText: "M"
  //     },
  //     {
  //       name: "Progress",
  //       path: "/material/progress",
  //       iconText: "P"
  //     },
  //     {
  //       name: "Radio",
  //       path: "/material/radio",
  //       iconText: "R"
  //     },
  //     {
  //       name: "Switch",
  //       path: "/material/switch",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Slider",
  //       path: "/material/slider",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Snackbar",
  //       path: "/material/snackbar",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Table",
  //       path: "/material/table",
  //       iconText: "T"
  //     }
  //   ]
  // },
  {
    name: "Dashboard",
    path: "/superiro/userview",
    icon: "dashboard"
  },
  
  {
    name: "Map",
    icon: "add_location",
    // path: "/map"
    path: "/session/404"
  },
  
  
];



export const navigationsFarmer = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard/analytics",
  //   icon: "dashboard"
  // },
  {
    name: "Dashboard",
    path: "/record/dashbord",
    icon: "dashboard"
  },
  {
    name: "Record",
    icon: "control_camera",
    //path: "/session/404",
    children: [
      {
        name: "Report Disease",
        path: "/record/create",
        iconText: "A"
      },
      {
        name: "View My Request",
        path: "/record/farmerview",
        iconText: "E"
      }
    ]
  },
  {
    name: "",
    icon: "",
    children: [
      {
        name: "",
        path: "/disease/create",
        iconText: "B"
      },
      {
        name: "List All",
        path: "/disease/listAll",
        iconText: "E"
      }
    ]
  }
];


export const navigationsSuper = [
  {
    name: "Dashboard",
    path: "/record/dashbord",
    icon: "dashboard"
  },
  {
    name: "Officers Activation",
    path: "/superiro/userview",
    icon: "trending_up"
  }
  
];