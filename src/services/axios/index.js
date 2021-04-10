import axios from "axios"

// https://codedcreatures.com/2020/02/17/creating-and-using-axios-instances-in-react/

const unAuthenticatedAxiosInstance = axios.create({
   baseURL: 'https://d2hlik0ak2.execute-api.us-east-2.amazonaws.com'
});

const authenticatedInstance = axios.create({
   baseURL: 'https://d2hlik0ak2.execute-api.us-east-2.amazonaws.com'
});

authenticatedInstance.defaults.headers.common['Authorization'] = localStorage.getItem('authenticationToken');

export default authenticatedInstance
export { unAuthenticatedAxiosInstance }