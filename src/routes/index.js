// import DashboardLayout from "../Layouts/Dashboard/DashboardLayout.js";
import Game from '../views/Game/Game';
import Home from '../views/Home/Home';

// const AsyncDashboardLayout = asyncComponent(()=>import("../Layouts/Dashboard/DashboardLayout.js"))

var indexRoutes = [
    { path: "/", name: "Home", component: Home, exact:true },
    { path: "/game/:id", name: "Game", component: Game, exact:false },

    // { path: "/dashboard", name: "Dashboard", component: AsyncDashboardLayout, exact:false },


    ];

export default indexRoutes;
