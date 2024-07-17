import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // וודא שהייבוא הוא נכון

import { userReducer } from './user.reducer.js';
import { systemReducer } from './system.reducer';
import { chatReducer } from './chat.reducer.js';

const rootReducer = combineReducers({
    userModule: userReducer,
    systemModule: systemReducer,
    chatModule: chatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// store.subscribe(() => {
//     console.log('**** Store state changed: ****');
//     console.log('storeState:\n', store.getState());
//     console.log('*******************************');
// });

export { store };
