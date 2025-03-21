import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (user_id, password, full_name, job_title) => {
    try {
        const { data } = await $host.post('/auth/registration', { user_id, password, full_name, job_title });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        throw error.response ? error.response.data : new Error('Ошибка при регистрации');
    }
};

export const loginUser = async (user_id, password) => {
    try {
        const { data } = await $host.post('/auth/login', { user_id, password });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token); 
    } catch (error) {
        alert(error.response ? error.response.data.message : 'Ошибка при авторизации');
        return;
    }
};

export const createMessage = async ( message_send_date, message_get_date, title, text) => {
    try {
        const messageData = {
            message_send_date,
            message_get_date,
            title,
            text
        };
        console.log(data)
        const { data } = await $authHost.post('/messages/create', messageData);
        return data;
    } catch (error) {
        console.error('Ошибка при создании сообщения:', error);
        throw error.response ? error.response.data : new Error('Ошибка при создании сообщения');
    }
};

export const deleteMessage = async (message_id) => {
    try {
        await $authHost.delete(`/messages/${message_id}`);
    } catch (error) {
        console.error('Ошибка при удалении сообщения:', error);
        throw error.response ? error.response.data : new Error('Ошибка при удалении сообщения');
    }
};

export const getMessagesBySender = async (sender) => {
    try {
        const { data } = await $authHost.get('/messages/sender', { params: { sender } });
        return data;
    } catch (error) {
        console.error('Ошибка при получении сообщений по отправителю:', error);
        throw error.response ? error.response.data : new Error('Ошибка при получении сообщений');
    }
};

export const getMessagesByRecipient = async (recipient) => {
    try {
        const { data } = await $authHost.get('/messages/recipient', { params: { recipient } });
        return data;
    } catch (error) {
        console.error('Ошибка при получении сообщений по получателю:', error);
        throw error.response ? error.response.data : new Error('Ошибка при получении сообщений');
    }
};

export const getMessagesByTitle = async (title) => {
    try {
        const { data } = await $authHost.post('/messages/title', { title });
        return data;
    } catch (error) {
        console.error('Ошибка при получении сообщений по заголовку:', error);
        throw error.response ? error.response.data : new Error('Ошибка при получении сообщений');
    }
};