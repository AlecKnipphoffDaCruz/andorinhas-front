import URL from '../routes/Url';
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


async function userPost(token, nome, email, senha, role, userImg) {
  if (!Object.values(tipoRole).includes(role)) {
    throw Error("Tipo de role inválido");
  }

  const dados = {
    nome: nome,
    email: email,
    senha: senha,
    role: role,
    userImg: userImg,
  };

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${URL()}user`, dados, headers);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}


async function userDeleteById(token, id){
  const headers = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.delete(`${URL()}user/${id}`, headers);
    if (response.status === 200){
      return response.data;
    }
  } catch (error){
    console.error("Error:", error);
    throw error;
  }
}

async function userPutById(token, id, nome, email, senha, userImg) {
   

    const dados = {
        id : id,
        nome : nome,
        email : email,
        senha : senha,
        userImg : userImg
    }
    const headers = {
    headers: {
    'Authorization': `Bearer ${token}`
    }};

    try {
        const response = await axios.put(`${URL()}user/config`, dados, headers);
        if ( response.status == 200){
            return response.data;
        }
    }
    catch ( error ){
        console.error("Error: ", error);
        throw error;
    }
}


export {userGetAll, userGetById, userPost, userDeleteById, userPutById};