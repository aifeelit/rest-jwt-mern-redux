import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
  } from '../actions/types';

  
  const initialState = {
	token : window.localStorage.getItem('token'),
	isAuth : null,
	isLoading: false,
	user : null,
  }

  export default function(state = initialState, action){			
	  switch(action.type){
		  case USER_LOADING:
			  return{
				  ...state,
				  isLoading: true
			  }
			case USER_LOADED:
				return{
					...state,
					isAuth: true,
					isLoading:false,
					user: action.payload
				}
			case LOGIN_SUCCESS:
			case REGISTER_SUCCESS:
				window.localStorage.setItem('token', action.payload.token)
				return{
					...action.payload,
					isAuth: true,
					isLoading: false
				}
			case AUTH_ERROR:
			case LOGIN_FAIL:
			case LOGOUT_SUCCESS:
			case REGISTER_FAIL:
				window.localStorage.removeItem('token')
				return{
					...state,
					isAuth: false,
					token: null,
					user: null,
					isLoading: false
				}
			default:
				return state
	  }
  }