const INCREMENTAR = 'INCREMENTAR';
const REDUZIR = 'REDUZIR';

export const incrementar = () => ({ type: INCREMENTAR });
export const reduzir = () => ({ type: REDUZIR });

const initialState = 0;

export const contadorReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENTAR:
            return state + 1
        case REDUZIR:
            return state - 1
        default:
            return state
    }
}