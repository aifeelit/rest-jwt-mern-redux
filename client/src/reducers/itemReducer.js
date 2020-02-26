import uuid from 'uuid'
import {GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEM_LOADING} from '../actions/types'
 
const initialState = {
	items:[
		{id: uuid(), name : 'loading',},
	]
}

export default function(state = initialState, action){
	switch(action.type){
		case GET_ITEM:
			return {
				...state, 
				items:action.payload, 
				loading:false
			}
		case DELETE_ITEM:
			return {
				...state, 
				items:state.items.filter(item => item._id !== action.payload)
			}
		case ADD_ITEM:
			return {
				...state, 
				items:[action.payload, 
					...state.items]
				}
		case ITEM_LOADING:
			return {
				...state, 
				loading: true
			}
		default:
			return {
				...state
			}
	}	
} 