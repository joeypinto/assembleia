import React from 'react'
import { Redirect } from 'react-router-dom'
import user from '../../services/user';

class AdminRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const token = localStorage.getItem('authenticationToken')
        let isAuthenticated = false
        
        if(token){
            
            let decoded = user.resolveToken(token)
            isAuthenticated = verifyAuthorizationField(decoded.id) && decoded.tipo === 2
        }

        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

function verifyAuthorizationField(value){
    return value !== undefined && value !== ""
}

export default AdminRoute;