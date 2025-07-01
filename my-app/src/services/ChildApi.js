import URL from '../routes/Url';
import axios from 'axios';


async function ChildPost(token, id, nome, dataNascimento, turma, avatarId, nomePai,telefonePai) {
    const dados = {
        id: id,
        nome: nome,
        dataNascimento: dataNascimento,
        turma: turma,
        avatarId: avatarId,
        nomePai: nomePai,
        telefonePai: telefonePai
    };

    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try{
    const response = await axios.post(`${URL()}crianca`, dados, headers);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao criar criança');
        }
    
} catch (error) {
    console.error('Erro ao criar criança:', error);
    throw error;
  }
}

async function ChildGetAll(token) {
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${URL()}crianca`, headers);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao obter crianças');
        }
    } catch (error) {
        console.error('Erro ao obter crianças:', error);
        throw error;
    }
}

async function ChildGetAllWPayments(token) {
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${URL()}crianca/total/matriculas`, headers);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao obter crianças com pagamentos');
        }
    } catch (error) {
        console.error('Erro ao obter crianças com pagamentos:', error);
        throw error;
    }
}

async function ChildGetById(token, id) {
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${URL()}crianca/${id}`, headers);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao obter criança');
        }
    } catch (error) {
        console.error('Erro ao obter criança:', error);
        throw error;
    }
}

async function ChildDeleteById(token, id) {
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.delete(`${URL()}crianca/delete/${id}`, headers);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao excluir criança');
        }
    } catch (error) {
        console.error('Erro ao excluir criança:', error);
        throw error;
    }
}



export { ChildPost, ChildGetAll, ChildGetAllWPayments, ChildGetById, ChildDeleteById };