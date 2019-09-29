
// import Query from "../Views/Query/Query";


//end
const dashboardRoutes = [

{
    path: "/dashboard/users",
    name: "Users",
    icon: "pe-7s-graph",
    exact:false,
    component: Users,
},


 
  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
