import { UPDATE_SETTINGS, UPDATE_SETTINGS_RESET } from "../actions/types";

export const changeSettingsReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { ...state, success: true };
        case UPDATE_SETTINGS_RESET:
            return { success: false };
        default:
            return state;
    }
};
