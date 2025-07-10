import URL from '../routes/Url';
import axios from 'axios';

async function login (email, senha){
    const dados = {
        email : email,
        senha : senha
    };

    try {
    const response = await axios.post(`${URL()}auth/login`, dados)
    if ( response.status === 200){
    return response.data;
    } 
}
   catch (error) {
        console.error('Erro ao tentar efetuar login:', error);
        throw error;
    }
}
export default login;