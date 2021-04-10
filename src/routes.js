import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


//Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Logs from "./pages/Logs";
import Tables from "./pages/Tables";
import ParticipationRequest from "./pages/ParticipationRequest";
import PresenceList from "./pages/PresenceList";
import LiveConfiguration from "./pages/LiveConfiguration";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/logs" component={Logs} />
            <Route path="/participacoes" component={ParticipationRequest} />
            <Route path="/lista-de-presenca" component={PresenceList} />
            <Route path="/live" component={LiveConfiguration} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cards" component={Cards} />
            <Route path="/tables" component={Tables} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
