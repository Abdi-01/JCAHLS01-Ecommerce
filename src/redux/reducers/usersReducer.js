const INITIAL_STATE = {
    iduser: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DATA LOGIN ACTION", action.payload)
            return {
                ...state, ...action.payload
            }
        case "UPDATE_CART":
            return {
                ...state, cart: action.payload
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state;
    }
}