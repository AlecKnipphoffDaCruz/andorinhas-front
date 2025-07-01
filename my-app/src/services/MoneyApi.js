import URL from '../routes/Url';
import axios from 'axios';

async function gastoGet(token){

   const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try{
    const response = await axios.get(`${URL()}money/gasto`, headers);
    if (response.status === 200){
        return response.data;
    }
}catch (error){
    console.error("Error ao pegar total gastos: ", error);
    throw error;
}
}


async function ganhoGet(token){

   const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try{
    const response = await axios.get(`${URL()}money/ganho`, headers);
    if (response.status === 200){
        return response.data;
    }
}catch (error){
    console.error("Error ao pegar total gastos: ", error);
    throw error;
}
}

export {gastoGet, ganhoGet};