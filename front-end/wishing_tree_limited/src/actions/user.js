import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
} from "./types";

import user from "../apis/api";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await user.post(
            "/signin",
            { email, password },
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = (userId, token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await user.post(
            "/signout",
            {
                userId: userId,
                token: token,
            },
            config
        );
        console.log(data);
        dispatch({ type: USER_LOGOUT });
        localStorage.removeItem("userInfo");
    } catch (error) {
        console.log(error);
    }
};

// Register
export const register =
    (username, email, password, language) => async (dispatch) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await user.post(
                "/signup",
                { username, email, password, language },
                config
            );
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
