import { contadorReducer } from "./reducers/contador.js";

const reducers = Redux.combineReducers({ contadorReducer })
export const store = Redux.createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
)
