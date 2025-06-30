import URL from './routes/Url.js';
import axios from 'axios';
import {tipoRole} from './ENUM.js';



async function userGetAll(token){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

   try { const response = await axios.get(`${URL()}user`, headers);

    if (response.status === 200){
        return response.data;
    }
} catch (error){
    console.error(`Error:`, error);
    throw error;
}

}

async function userGetById (token, id){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try {
        const response = await axios.get(`${URL()}user/${id}`, headers);
        if ( response.status === 200 ){
            return response.data;
        }
    } catch ( error ){
        console.error("Error: ", error);
        throw error;
    }
}


async function userPost (token, nome, email, senha, role) {

    if (!Object.values(tipoRole).includes(role)) {
        throw Error("Tipo de role inválido");
      } 
    
    const dados = {
        nome : nome,
        email : email,
        senha : senha,
        role : role
    }
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

    try {
        const response = await axios.post(`${URL}user`, dados, headers);
        if ( response.status == 200){
            return response.data;
        }
    }
    catch ( error ){
        console.error("Error: ", error);
        throw error;
    }
}

async function userDeleteById(token, id){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try {
        const response = await axios.delete(`${URL()}user/${id}`, headers);
        if ( response.status === 200){
            return data.response;
        }
    } catch (error){
        console.error(`Error:`, error);
        throw error;
    }
}


export {userGetAll, userGetById, userPost,userDeleteById};