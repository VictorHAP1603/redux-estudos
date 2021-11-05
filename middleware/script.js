const { compose, applyMiddleware, createStore } = Redux

const reducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENTAR":
            return state + 1
        case "REDUZIR":
            return state - 1
        default:
            return state
    }
}

const initialState = {
    loading: false,
    data: null,
    error: null
}

const reducerFetch = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_STARTED":
            return { ...state, loading: true }
        case "FETCH_SUCCESS":
            return { data: action.payload, error: null, loading: false, }
        case "FETCH_ERROR":
            return { data: null, error: action.payload, loading: false, }
        default:
            return state
    }
}

// const logger = store => next => action => {
//     const state = store.getState();
//     if (action.type === "REDUZIR" && state <= 0) return;

//     return next(action)
// }

// const teste = store => next => action => {
//     if (action.type === "REDUZIR") {
//         alert('REDUZIU')
//     };

//     return next(action)
// }

const thunk = store => next => action => {
    // console.log(action)
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return next(action)
}

const composeEnharcers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnharcers(applyMiddleware(thunk))
const store = createStore(reducerFetch, enhancer);
store.subscribe(render)

function render() {
    const state = store.getState()
    console.log(state)
}

function fetchUrl(url) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "FETCH_STARTED" });
            const data = await (await fetch(url)).json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });

        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: err.message });
        }
    }
}

store.dispatch(
    fetchUrl('https://dogsapi.origamid.dev/json/api/photo'),
)
// fetchUrl(store.dispatch, 'https://dogsapi.origamid.dev/json/api/photo')

// store.dispatch({ type: 'INCREMENTAR' })
// store.dispatch({ type: 'INCREMENTAR' })
// store.dispatch({ type: 'REDUZIR' })
// store.dispatch({ type: 'REDUZIR' })
// store.dispatch({ type: 'REDUZIR' })
// store.dispatch({ type: 'INCREMENTAR' })
// store.dispatch({ type: 'INCREMENTAR' })