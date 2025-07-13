import axios from 'axios';
import { SERVER_URL } from '../util/config';


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