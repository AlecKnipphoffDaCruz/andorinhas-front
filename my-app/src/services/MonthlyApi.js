import URL from '../routes/Url';
import axios from 'axios';

async function monthGetAllByX (token, x){
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {const response = await axios.get(`${URL()}mensalidade/${x}`, headers)
        if (response.status === 200){
            return response.data;
        }
}
    catch (error) {
        console.error('Erro mensalidade:', error);
        throw error;
    }
}

async function monthGetPending(token){
const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }
};

try {
    const response = await axios.get(`${URL()}mensalidade/pendente`, headers);
    if ( response.status === 200){
        return response.data;
    }

} catch (error) {
        console.error('Erro mensalidade:', error);
        throw error;
    };
}

async function monthGetQuantPending(token){

const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }
};

try {
    const response = await axios.get(`${URL()}mensalidade/quantidade/pendente`, headers);
    if ( response.status === 200){
        return response.data;
    }

} catch (error) {
        console.error('Erro mensalidade:', error);
        throw error;
    };
}


async function monthPost (token, criancaId, valor){

    const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }
};

    const dados = {
    crianca_id : criancaId,
    valor : valor        
    };

    try {
        const response = await axios.post(`${URL()}mensalidade`, dados, headers);
        if ( response.status === 200){
            return response.data;
        }
    }
    catch (error) {
        console.error('Erro mensalidade: ', error);
        throw error;
    } 
}

async function monthPutPayById (token, id) {
       const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }
};
    try {
        const response = await axios.put(`${URL()}mensalidade/${id}`, {}, headers);
        if ( response.status === 200){
            return response.data;
        }
    }catch (error){
        console.error('Error mensaldidade: ', error);
        throw error;
    }
}

async function monthPutById(token , id , valor){
    const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }};

        try {
            const response = await axios.put(`${URL()}mensalidade/${id}/${valor}`, null,headers);

            if ( response.status === 200){
                return response.data;
            }
        }
        catch (error){
            console.error('Error mensalidade: ', error);
            throw error;
        }
}

async function monthPostAll(token){
        const headers = {
     headers: {
            'Authorization': `Bearer ${token}`
        }};

        const dados = {};

        try {
            const response = await axios.post(`${URL()}mensalidade/criar-automaticamente`, dados, headers);
            if ( response.status === 200){
                return response.data;
            }
        }
        catch ( error ){
            console.error("Error: ",error);
            throw error;
        }
}

async function monthGetById(token , id){
  console.log("Token usado no ChildGetAll:", token);
    const headers = {

     headers: {
            'Authorization': `Bearer ${token}`
        }};

        try {
            const response = await axios.get(`${URL()}mensalidade/por/${id}`, headers);

            if ( response.status === 200){
                return response.data;
            }
        }
        catch (error){
            console.error('Error mensalidade: ', error);
            throw error;
        }
}

export {monthGetAllByX, monthGetById,monthGetPending, monthGetQuantPending, monthPost, monthPutPayById, monthPutById, monthPostAll};