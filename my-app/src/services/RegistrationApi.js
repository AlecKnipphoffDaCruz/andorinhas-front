import URL from '../routes/Url';
import axios from 'axios';
import {tipoRegistration} from './ENUM.js';

async function registrationPost (token , id, tipo){

    if (!Object.values(tipoRegistration).includes(tipo)) {
        throw Error("Tipo de entrada inválida");
      } 


    const dados = {};
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

    try{
        const response = await axios.post(`${URL()}registro/${id}/${tipo}`, dados, headers);
        if (response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error("error: ", error);
        throw error;
    }
}

async function registrationGetHistory(token, nome){
      console.log("Token usado no Regsistration:", token);
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try {
        const response = await axios.get(`${URL()}registro/historico/${nome}`, headers);
        if (response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error(`Error: `, error);
        throw error;
    }
}

async function registrationGetPresents(token){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

    try{
        const response = await axios.get(`${URL()}registro/presentes`, headers);
        if ( response.status === 200){
            return response.data;
        }
    }
    catch( error ){
        console.error("error: ", error);
        throw error;
    }
}

async function registrationsGetToday(token){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

    try{
        const response = await axios.get(`${URL()}registro/total/hoje`, headers);
        if ( response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error('error', error);
        throw error;
    }
}

async function registrationTotalPresenca(token){
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};
    try{
        const response = await axios.get(`${URL()}registro/total/semana`, headers);
        if (response.status === 200){
            return response.data;
        }
    }
    catch (error){
        console.error('error: ', error);
        throw error;
    }
}

export {registrationPost, registrationGetHistory, registrationGetPresents,registrationsGetToday,registrationTotalPresenca };