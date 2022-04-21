
export const loginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const updateCartAction = (data) => {
    return {
        type: "UPDATE_CART",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem("tokenIdUser")
    return {
        type: "LOGOUT"
    }
}