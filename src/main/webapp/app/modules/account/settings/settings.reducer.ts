import axios from 'axios';
import {Storage, translate} from 'react-jhipster';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';
import {getSession} from 'app/shared/reducers/authentication';

export const ACTION_TYPES = {
  UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updateFailure: false
};

export type SettingsState = Readonly<typeof initialState>;

// Reducer
export default (state: SettingsState = initialState, action): SettingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'api/account';

export const saveAccountSettings = account => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNT,
    payload: axios.post(apiUrl, account),
    meta: {
      successMessage: translate('settings.messages.success')
    }
  });

  if (Storage.session.get(`locale`)) {
    Storage.session.remove(`locale`);
  }

  await dispatch(getSession());
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});