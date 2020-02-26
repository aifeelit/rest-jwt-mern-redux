import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import {connect} from 'react-redux'
import {addItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component{
	state = {
		modal : false,
		name : ''
	}

	static propTypes = {
		isAuth: PropTypes.bool
	}

	toggle = () => {
		this.setState({
			modal : !this.state.modal
		})
	}

	onChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	onSubmit = (e) =>{
		e.preventDefault();
		const newItem = {
			name: this.state.name
		}
		this.props.addItem(newItem);
		this.toggle();
	}

	render(){
		return(
			<div>
			{
				this.props.isAuth ? 
				<Button color='dark' style={{marginBottom:'2rem'}} onClick={this.toggle}> Submit
				</Button> : <h4 className='mb-3 mr-4'>Please login to add item</h4>
			}
				<Modal isOpen={this.state.modal} toggle = {this.toggle} >
					<ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
					<ModalBody>
						<Form onSubmit = {this.onSubmit}>
							<FormGroup>
								<Label for='item'>Item</Label>
								<Input type='text' name= 'name' id='id' placeholder='Something to add' onChange={this.onChange}/>
								<Button color='success' style={{marginTop : '2rem'}}> Add Item</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal> 
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	item: state,
	isAuth: state.auth.isAuth

})

export default connect(mapStateToProps, {addItem})(ItemModal) ;