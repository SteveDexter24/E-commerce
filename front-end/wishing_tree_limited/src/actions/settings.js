import { UPDATE_SETTINGS } from "./types";

export const changeSettings = (language, country, currency) => (dispatch) => {
    dispatch({
        type: UPDATE_SETTINGS,
        payload: { language, country, currency },
    });
    localStorage.setItem(
        "settings",
        JSON.stringify({ language, country, currency })
    );
};
