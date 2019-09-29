import {IoIosNavigate,IoIosPaperPlane,IoIosPie,IoMdContacts,IoMdGift,IoMdWallet,IoIosAnalytics,IoIosJournal,IoIosSettings,IoIosRibbon,IoMdPersonAdd} from 'react-icons/io';

export const sideBarMenuItemsList = [

  {
    path: "",
    name: "Staffs",
    icon: IoMdContacts,
    sub:[
        {
            path:"/dashboard/users", 
            name:"Permissions", 
            icon: IoMdPersonAdd
        },
        {
            path:"/dashboard/drivers", 
            name:"Drivers", 
            icon: IoMdPersonAdd
        },
        {
            path:"/dashboard/records", 
            name:"Records", 
            icon: IoIosPie
        },
        {
            path:"/dashboard/targets", 
            name:"Targets", 
            icon: IoIosPie
        },
         {
            path:"/dashboard/register", 
            name:"Register", 
            icon: IoMdPersonAdd
        },
    ]
  },
  {
    path: "/dashboard/query",
    name: "Query",
    icon: IoIosAnalytics,
    sub:[]
  },
  {
    name:"Zones",
    icon:IoIosPaperPlane,
    sub:[
          {
            path: "/dashboard/zones",
            name: "Zone ",
            icon: IoIosPaperPlane,
            sub:[]
        },
        {
          path: "/dashboard/operations",
          name: "Operations",
          icon: IoIosNavigate,
          sub:[]
        }
    ]
  },
  // {
  //   path: "/dashboard/operations",
  //   name: "Operations",
  //   icon: IoIosPaperPlane,
  //   sub:[]
  // },
  // {
  //   path: "/dashboard/zones",
  //   name: "Zone Management",
  //   icon: IoIosAirplane,
  //   sub:[]
  // },
  {
    path: "/dashboard/shippers",
    name: "Shippers",
    icon: IoIosRibbon,
    sub:[]
  },
  {
    path: "/dashboard/financials",
    name: "Finance",
    icon: IoMdWallet,
    sub:[]
  },
  {
    path: "/dashboard/discount",
    name: "Discount",
    icon: IoMdGift,
    sub:[]
  },
  {
    // path: "/dashboard/pricing",
    name: "Pricing",
    icon: IoIosJournal,
    sub:[
        {
          path: "/dashboard/pricing",
          name: "Pricing",
          icon: IoIosJournal,
          sub:[]
        },
        {
          path: "/dashboard/pricingbyzones",
          name: "Pricing By Zones",
          icon: IoIosJournal,
          sub:[]
        }
    ]
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: IoIosSettings,
    sub:[]
  }
  //,
  
 
  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];