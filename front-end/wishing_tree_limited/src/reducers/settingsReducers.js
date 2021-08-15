import {
  CHANGE_COUNTRY,
  CHANGE_LANGUAGE,
  CHANGE_CURRENCY,
} from '../actions/types'

export const changeSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return { ...state, currency: action.payload }
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload }
    case CHANGE_COUNTRY:
      return { ...state, country: action.payload }
    default:
      return state
  }
}
