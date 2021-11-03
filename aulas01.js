const buttonSomar = document.querySelector('#somar')
const buttonIncrementar = document.querySelector('#incrementar')
const buttonAbrir = document.querySelector('#abrir')
const buttonFechar = document.querySelector('#fechar')
const span = document.querySelector('#conta')

const INCREMENT = "INCREMENTAR"
const SOMAR = "SOMAR"
const ABRIR = "ABRIR"
const FECHAR = "FECHAR"



function somar() {
    const payload = +document.querySelector('input').value
    return { type: SOMAR, payload: payload ? payload : 1 }
}

function increment() {
    return { type: INCREMENT }
}

function abrir() {
    return { type: ABRIR }
}

function fechar() {
    return { type: FECHAR }
}

const initialState = {
    cont: 0
}

function contador(state = initialState, action) {

    switch (action.type) {
        case SOMAR:
            return { ...state, cont: state.cont += action.payload }
        case INCREMENT:
            return { ...state, cont: state.cont += 1 }
        default:
            return state;
    }

}

function modal(state = false, action) {
    switch (action.type) {
        case ABRIR:
            return true
        case FECHAR:
            return false
        default:
            return state
    }
}


const reducers = Redux.combineReducers({ contador, modal });
const store = Redux.createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
    const state = store.getState()

    const { cont } = state.contador
    span.innerHTML = cont

}


render();
store.subscribe(render)

buttonSomar.addEventListener('click', () => store.dispatch(somar()))
buttonIncrementar.addEventListener('click', () => store.dispatch(increment()))


buttonAbrir.addEventListener('click', () => store.dispatch(abrir()))
buttonFechar.addEventListener('click', () => store.dispatch(fechar()))

