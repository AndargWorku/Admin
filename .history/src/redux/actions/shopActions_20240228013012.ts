// src/redux/actions/shopActions.ts

import axios from 'axios';

export const FETCH_SHOPS_REQUEST = 'FETCH_SHOPS_REQUEST';
export const FETCH_SHOPS_SUCCESS = 'FETCH_SHOPS_SUCCESS';
export const FETCH_SHOPS_FAILURE = 'FETCH_SHOPS_FAILURE';

export const fetchShops = () => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_SHOPS_REQUEST });

    try {
      const response = await axios.get('/api/shops/user/all');
      dispatch({ type: FETCH_SHOPS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_SHOPS_FAILURE, payload: error.message });
    }
  };
};
