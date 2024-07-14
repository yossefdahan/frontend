import { httpService } from './http.service'

const BASE_URL = 'chat';

export const chatService = {
    sendMessage,
    learnResponse
}

async function sendMessage(message, room) {
    try {
        const response = await httpService.post('chat', { message, room });
        return response.message;
    } catch (err) {
        console.error('Failed to send message', err);
        throw err;
    }
}

async function learnResponse(question, answer, room) {
    try {
        const message = `learn:${question}::${answer}`;
        const response = await httpService.post(BASE_URL, { message, room });
        return response.message;
    } catch (err) {
        console.error('Failed to learn response', err);
        throw err;
    }
}
