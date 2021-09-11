import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,
    USER_UPDATE_LANGUAGE_REQUEST,
    USER_UPDATE_LANGUAGE_SUCCESS,
    USER_UPDATE_LANGUAGE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_RESET,
} from "../actions/types";

export const userAuthenticationReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true };
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdateLanguageReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_LANGUAGE_REQUEST:
            return { loadingLanguage: true };
        case USER_UPDATE_LANGUAGE_SUCCESS:
            return {
                loadingLanguage: false,
                successLanguage: true,
                userInfoLanguage: action.payload,
            };
        case USER_UPDATE_LANGUAGE_FAIL:
            return { loadingLanguage: false, errorLanguage: action.payload };
        default:
            return state;
    }
};

// Admin actions
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                users: action.payload.users,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

export const userDeleteReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userEditReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return { loading: true };
        case USER_EDIT_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case USER_EDIT_FAIL:
            return { loading: false, success: false, error: action.payload };
        case USER_EDIT_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};
