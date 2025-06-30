import URL from './routes/Url.js';
import axios from 'axios';
import {tipoSpent} from './ENUM.js';


async function spentPost(token, descricao, valor, tipo){

    if (!Object.values(tipoSpent).includes(tipo)) {
        throw Error("Tipo de gasto inválido");
      } 

    const dados = {
        descricao : descricao,
        valor : valor,
        tipo : tipo
    };
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try{
        const response = await axios.post(`${URL()}despesa`, dados,headers );
        if (response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error("error: ", error);
        throw error;
    }
}

async function spentGetAll(token){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try {
        const response = await axios.get(`${URL()}despesa`, headers);
        if (response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error("Error: ", error);
        throw error;
    }
}

async function spentDeleteByDelete(token, id){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try {
        const response = await axios.delete(`${URL()}despesa/${id}`, headers);
        if (response.status === 200){
            return response.data;
        }
    }
    catch ( error ){
        console.error(`error: `, error);
        throw error;
    }
}