import Dashboard from "./../../pages/Dashboard";
import Logs from "./../../pages/Logs";
import ParticipationRequest from "./../../pages/ParticipationRequest";
import PresenceList from "./../../pages/PresenceList";
import ListLives from "./../../pages/LiveConfiguration/ListLives";
import NewLive from "./../../pages/LiveConfiguration/NewLive";

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
        path: "/lives",
        component: ListLives
    },
    {
        path: "/lives/novo",
        component: NewLive
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
    }
]

export default AdminRoutes