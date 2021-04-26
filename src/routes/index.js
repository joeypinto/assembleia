import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Routes Auth Handler
import AdminRoute from "./ProtectedRoutes/AdminRoute";
import AssociateRoute from "./ProtectedRoutes/AssociateRoute";

//Pages
import SignUp from "./../pages/SignUp";
import SignIn from "./../pages/SignIn";
import Dashboard from "./../pages/Dashboard";
import NotFound from "./../pages/NotFound";
import Cards from "./../pages/Cards";
import Logs from "./../pages/Logs";
import Tables from "./../pages/Tables";
import ParticipationRequest from "./../pages/ParticipationRequest";
import PresenceList from "./../pages/PresenceList";
import LiveConfiguration from "./../pages/LiveConfiguration";
import WatchLive from "./../pages/WatchLive";
import NewResearch from "../pages/Research/New";
import DetailResearch from "../pages/Research/Details";
import Research from "../pages/Research/Listagem";


//TODO: study https://javascript.plainenglish.io/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
//TODO: study https://reactrouter.com/web/example/auth-workflow

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <AdminRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute path="/logs" component={Logs} />
            <AdminRoute path="/participacoes" component={ParticipationRequest} />
            <AdminRoute path="/lista-de-presenca" component={PresenceList} />
            <AdminRoute path="/live" component={LiveConfiguration} />
            <AdminRoute path="/enquete/:id" component={DetailResearch} />
            <AdminRoute path="/enquete/novo" component={NewResearch} />
            <AdminRoute path="/enquete" component={Research} />
            <AssociateRoute path="/watch" component={WatchLive} />

            {/* Modelos de pagina */}
            <AdminRoute path="/signup" component={SignUp} />
            <AdminRoute path="/cards" component={Cards} />
            <AdminRoute path="/tables" component={Tables} />
            
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
