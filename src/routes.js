import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


//Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import Tables from "./pages/Tables";
import ParticipationRequest from "./pages/ParticipationRequest";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cards" component={Cards} />
            <Route path="/charts" component={Charts} />
            <Route path="/tables" component={Tables} />
            <Route path="/participacoes" component={ParticipationRequest} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
