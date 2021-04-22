import jwt from 'jsonwebtoken'

class User {

    data = null

    getData() {
        const token = localStorage.getItem('authenticationToken')
        var user = null

        if(token){
            user = this.resolveToken(token)
        }

        return user;
    }

    resolveToken(token) {
        return jwt.verify(token, 'CF5E955A3D8B54C96C12A31FD177A')
    }
}

export default new User()