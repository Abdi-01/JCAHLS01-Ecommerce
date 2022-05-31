import axios from "axios"
import { API_URL } from "../../helper"

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

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            // Memeriksa adanya token
            if (token) {
                let res = await axios.post(`${API_URL}/users/keep`, {
                    iduser: token
                })
                // Memeriksa adanya data user atau tidak
                if (res.data.iduser) {
                    // Menyimpan ulang token
                    localStorage.setItem("tokenIdUser", res.data.iduser);
                    // Memperbarui reducer
                    dispatch(loginAction(res.data))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}