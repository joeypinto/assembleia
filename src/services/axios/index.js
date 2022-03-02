import axios from "axios"

// https://codedcreatures.com/2020/02/17/creating-and-using-axios-instances-in-react/

const unAuthenticatedAxiosInstance = axios.create({
   baseURL: 'https://kj4fdqr31d.execute-api.sa-east-1.amazonaws.com/assembleia-sinpeem'
});

const authenticatedInstance = axios.create({
   baseURL: 'https://kj4fdqr31d.execute-api.sa-east-1.amazonaws.com/assembleia-sinpeem'
});

authenticatedInstance.defaults.headers.common['Authorization'] = localStorage.getItem('authenticationToken');

export default authenticatedInstance
export { unAuthenticatedAxiosInstance }