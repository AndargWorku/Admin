// src/redux/reducers/shopReducer.ts

import {
    FETCH_SHOPS_REQUEST,
    FETCH_SHOPS_SUCCESS,
    FETCH_SHOPS_FAILURE,
  } from '../actions/shopActions';
  
  interface Shop {
    id: string;
    name: string;
    description: string;
    shopUrl: string;
    permissionName: string;
    picture: string;
  }
  
  interface ShopState {
    shops: Shop[];
    loading: boolean;
    error: string;
  }
  
  const initialState: ShopState = {
    shops: [],
    loading: false,
    error: '',
  };
  
  const shopReducer = (state = initialState, action: any): ShopState => {
    switch (action.type) {
      case FETCH_SHOPS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SHOPS_SUCCESS:
        return {
          ...state,
          loading: false,
          shops: action.payload,
          error: '',
        };
      case FETCH_SHOPS_FAILURE:
        return {
          ...state,
          loading: false,
          shops: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default shopReducer;
  