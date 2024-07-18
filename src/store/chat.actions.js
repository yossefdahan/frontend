import { chatService } from '../services/chat.service';
import { ADD_MESSAGE, LEARN_RESPONSE } from "./chat.reducer";

// Define a function to dispatch the action
export function sendMessage(message, room) {
    return async function (dispatch) {
        try {
            const responseMessage = await chatService.sendMessage(message, room)
            dispatch({
                type: ADD_MESSAGE,
                message: { from: 'Bot', txt: responseMessage },
            })
            return responseMessage
        } catch (err) {
            console.error('Failed to send message', err)
            throw err
        }
    }
}

export function learnResponse(question, answer, room) {
    return async function (dispatch) {
        try {
            const responseMessage = await chatService.learnResponse(question, answer)
            dispatch({
                type: LEARN_RESPONSE,
                message: responseMessage,
            })
            dispatch({
                type: ADD_MESSAGE,
                message: { from: 'Bot', txt: `Learned new response for "${question}"`, room }
            })
        } catch (err) {
            console.error('Failed to learn response', err)
            throw err
        }
    }
}
