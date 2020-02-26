import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
  } from './types';
  
import {returnErrors} from './erroractions'
import axios from 'axios';

export const loadUser =() => (dispatch, getState) =>{
	dispatch({type: USER_LOADING})

	axios.get('/api/auth/user', tokenconfig(getState))
	.then(res=>dispatch({
		type:USER_LOADED,
		payload: res.data
	}))
	.catch(err =>{
		dispatch(returnErrors(err.response.data, err.response.status));
		dispatch({
			type: AUTH_ERROR,
		})
	})
}

export const register = ({name, email, password}) => dispatch =>{
	const config = {
		header:{
			"Content-Type":"application/json"
		} 
	}

	axios.post('/api/users', {name, email, password}, config)
	.then(res=>dispatch({type:REGISTER_SUCCESS, payload:res.data}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
		dispatch({type:REGISTER_FAIL})})
}


export const login = ({email, password}) => dispatch =>{
	const config = {
		header:{
			"Content-Type":"application/json",
		} 
	}

	axios.post('/api/auth', {email, password}, config)
	.then(res=>dispatch({type:LOGIN_SUCCESS, payload:res.data}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
		dispatch({type:LOGIN_FAIL})})
}

export const logout = () =>{
	return{
		type:LOGOUT_SUCCESS
	}
}

export const tokenconfig = (getState) =>{
	const tok = getState().auth.token
	const config = {
		headers: {
			"Content-Type" : "application/json",
		}
	}
	if (tok){
		config.headers['x-auth-token'] = tok
	}
	return (config)
}