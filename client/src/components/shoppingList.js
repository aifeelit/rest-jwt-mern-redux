import React, {Component} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItem, deleteItem, addItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component{
	static propTypes = {
		getItem: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
		deleteItem: PropTypes.func.isRequired,
		addItem: PropTypes.func.isRequired,
		isAuth: PropTypes.bool
	}
	
	componentDidMount(){
		this.props.getItem()
	}

	onDeleteClick = (_id) =>{
		this.props.deleteItem(_id)
	}

 render(){
	 const {items} = this.props.item;
	 return(
		 <Container>
			 <ListGroup>
				 <TransitionGroup className="shopping-list">
			 		{items.map(({_id, name})=>(
						<CSSTransition key = {_id}>
							<ListGroupItem >
								{this.props.isAuth?<Button className='remove-btn' color='danger' size = 'small'
									style={{margin: '5px'}} onClick={this.onDeleteClick.bind(this, _id)}>
									&times;
								</Button>: null}
								{name}
							</ListGroupItem>
						</CSSTransition>
					 ))}
				 </TransitionGroup>
			 </ListGroup>
		 </Container>
	 )
 }
}


const mapStateToProps = (state) => ({
	item: state.item,
	isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {getItem, deleteItem, addItem})(ShoppingList) ;