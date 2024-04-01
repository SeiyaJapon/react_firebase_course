const INCREMENTAR = 'CONTADOR/INCREMENTAR'
const DECREMENTAR = 'CONTADOR/DECREMENTAR'
const SETEAR = 'CONTADOR/SETEAR'

export const incrementar = () => ({
    type: INCREMENTAR,
})

export const decrementar = () => ({
    type: DECREMENTAR,
})

export const setear = payload => ({
    type: SETEAR,
    payload,
})

const initialState = 0;

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREMENTAR:
            return state + 1

        case DECREMENTAR:
            return state - 1

        case SETEAR:
            return action.payload
    
        default:
            return state;
    }
}