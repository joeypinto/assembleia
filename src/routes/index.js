import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import user from '../services/user';

//Pages
import SignIn from "./../pages/SignIn";
import NotFound from "./../pages/NotFound";


//Routes Auth Handler
import AdminRoutes from "./ProtectedRoutes/AdminRoute";
import AssociateRoute from "./ProtectedRoutes/AssociateRoute";

//TODO: study https://javascript.plainenglish.io/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
//TODO: study https://reactrouter.com/web/example/auth-workflow

function isAdmin() {
    const token = localStorage.getItem('authenticationToken')
    let isAuthenticated = false
    
    if(token){  
        let decoded = user.resolveToken(token)
        isAuthenticated = verifyAuthorizationField(decoded.id) && decoded.tipo === 2
    }

    return isAuthenticated
}

function isAssociate() {
    const token = localStorage.getItem('authenticationToken')
    let isAuthenticated = false
    
    if(token){   
        let decoded = user.resolveToken(token)
        isAuthenticated = verifyAuthorizationField(decoded.id) && decoded.tipo === 1
    }
    
    return isAuthenticated 
}

function verifyAuthorizationField(value){
    return value !== undefined && value !== ""
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            
            { AssociateRoute.map((props, i) => isAssociate() ? <Route key={`associate-${i}`} {...props} /> : null) }

            { AdminRoutes.map((props, i) => isAdmin() ? <Route key={`admin-${i}`} {...props} /> : <Redirect key={`associate-${i}`}  to="/" />) } 
            
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
