import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';
const login = async({email,password}) =>{

    const res = await axios.post(`${BASE_URL}/login`,{email,password});
    return res.data.token;
}

export default login;