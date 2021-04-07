import axios from "axios"

// https://codedcreatures.com/2020/02/17/creating-and-using-axios-instances-in-react/

const instance = axios.create({
   baseURL: 'https://d2hlik0ak2.execute-api.us-east-2.amazonaws.com'
});

const authenticatedInstance = axios.create({
   baseURL: 'https://d2hlik0ak2.execute-api.us-east-2.amazonaws.com'
});

authenticatedInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance