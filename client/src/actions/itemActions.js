import {GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEM_LOADING} from './types'
import axios from 'axios'
import {tokenconfig} from './authactions'
import {returnErrors} from './erroractions'

export const getItem = () => dispatch =>{
	dispatch(itemLoading())
	axios.get('/api/items').then(res => dispatch({
		type:GET_ITEM,
		payload: res.data
	}))
	.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (_id) =>(dispatch, getState) =>{
	
	axios.delete(`/api/items/${_id}`, tokenconfig(getState))
	.then(res => dispatch({
		type:DELETE_ITEM,
		payload: _id
	}))
	.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addItem = (item)=>(dispatch, getState) =>{
	axios.post('/api/items', item, tokenconfig(getState)).then(res => dispatch({
		type:ADD_ITEM,
		payload: res.data
	}))
	.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const itemLoading = () =>{
	return{
		type:ITEM_LOADING
	}
}