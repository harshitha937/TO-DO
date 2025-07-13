import axios from 'axios';

const SERVER_URL='http://localhost:5000/api';

const registerUSer=(data)=>{
    return axios.post(SERVER_URL+'/register',data);
}

const loginUSer=(data)=>{
    return axios.post(SERVER_URL+'/login',data);
}

const AuthServices={
    registerUSer,
    loginUSer
}

export default AuthServices;