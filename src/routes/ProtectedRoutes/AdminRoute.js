import Dashboard from "./../../pages/Dashboard";
import Logs from "./../../pages/Logs";
import ParticipationRequest from "./../../pages/ParticipationRequest";
import PresenceList from "./../../pages/PresenceList";
import ListLives from "./../../pages/LiveConfiguration/ListLives";
import NewLive from "./../../pages/LiveConfiguration/NewLive";
import EditLive from "./../../pages/LiveConfiguration/EditLive";
import DetailLive from "./../../pages/LiveConfiguration/DetailLive";
import ListUsers from "../../pages/Users/List"
import NewUser from "./../../pages/Users/Create"
import UpdateUser from "./../../pages/Users/Update"
import DetailUser from "./../../pages/Users/Details" 

import NewResearch from "../../pages/Research/New";
import DetailResearch from "../../pages/Research/Details";
import Research from "../../pages/Research/Listagem";

const AdminRoutes = [
    {
        path: "/dashboard",
        component: Dashboard,
    },
    {
        path: "/logs",
        component: Logs
    },
    {
        path: "/participacoes",
        component: ParticipationRequest
    },
    {
        path: "/lista-de-presenca",
        component: PresenceList
    },
    {
        path: "/eventos/:id/editar",
        component: EditLive
    },
    {
        path: "/eventos/novo",
        component: NewLive
    },
    {
        path: "/eventos/:id",
        component: DetailLive
    },
    {
        path: "/eventos",
        component: ListLives
    },
    {
        path: "/enquete/novo",
        component: NewResearch
    },
    {
        path: "/enquete/:id",
        component: DetailResearch
    },
    {
        path: '/enquete',
        component: Research
    },
    {
        path: '/users/novo',
        component: NewUser
    },
    {
        path: '/users/editar/:id',
        component: UpdateUser
    },
    {
        path: '/users/:id',
        component: DetailUser
    },
    {
        path: '/users',
        component: ListUsers
    }
]

export default AdminRoutes