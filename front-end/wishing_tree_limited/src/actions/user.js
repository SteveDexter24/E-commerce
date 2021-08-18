import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
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

export const logout = (userId, token) => async (dispatch, getState) => {
    const { token } = getState().userAuth.userInfo;
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

// Get user Info
export const getUserInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { userInfo } = getState().userAuth;
        const { token } = userInfo;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await user.get(`/user/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        console.log("Function at actions/user.js: getUserInfo ");
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Update user Info
// export const updateUserInfo =
//     (username, email, currentPassword, password, language) =>
//     async (dispatch, getState) => {
//         const { userInfo } = getState().userAuth;
//         const { token, _id } = userInfo;
//         console.log(token, _id);
//         try {
//             dispatch({ type: USER_UPDATE_REQUEST });
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const { data } = await user.patch(
//                 `/user/${_id}`,
//                 { username, email, currentPassword, password, language },
//                 config
//             );
//             dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

//             dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
//             // localStorage.removeItem("userInfo");
//             localStorage.setItem("userInfo", JSON.stringify(data));
//         } catch (error) {
//             dispatch({
//                 type: USER_UPDATE_FAIL,
//                 payload:
//                     error.response && error.response.data.message
//                         ? error.response.data.message
//                         : error.message,
//             });
//         }
//     };
