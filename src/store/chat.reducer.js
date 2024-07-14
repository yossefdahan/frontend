
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LEARN_RESPONSE = 'LEARN_RESPONSE';

const initialState = {
    messages: [],
    learnFeedback: null
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        case 'LEARN_RESPONSE':
            return {
                ...state,
                learnFeedback: action.message
            };
        default:
            return state;
    }
}