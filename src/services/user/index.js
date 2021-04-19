import jwt from 'jsonwebtoken'

class User {

    data = null

    constructor() {
        this.data = this.getData()
    }

    getData() {
        const token = localStorage.getItem('authenticationToken')
        var user = null

        if(token){
            user = jwt.verify(token, 'CF5E955A3D8B54C96C12A31FD177A')
        }

        return user;
    }
}

export default new User()