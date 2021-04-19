import React from 'react'
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

class AdminRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const token = localStorage.getItem('authenticationToken')
        let isAuthenticated = false
        
        if(token){
            let decoded = jwt.verify(token, 'CF5E955A3D8B54C96C12A31FD177A');
            isAuthenticated = decoded.tipo === 2 && verifyAuthorizationField(decoded.id)
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