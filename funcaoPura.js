const box = document.getElementById('box')

function reducer(state = 0, action) {

    switch (action.type) {
        case "MODIFICAR_WIDTH":
            // box.style.width = action.payload + 'px'
            return action.payload
        default:
            return state

    }
}

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
    const state = store.getState();
    box.style.width = state + 'px'

}

store.subscribe(render)

// store.dispatch({ type: 'MODIFICAR_WIDTH', payload: 150 })
// store.dispatch({ type: 'MODIFICAR_WIDTH', payload: 40 })
// store.dispatch({ type: 'MODIFICAR_WIDTH', payload: 350 })
// store.dispatch({ type: 'MODIFICAR_WIDTH', payload: 10 })