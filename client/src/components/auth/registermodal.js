import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {register} from '../../actions/authactions'
import {clearErrors} from '../../actions/erroractions'

class RegisterModal extends Component{
	state = {
		modal : false,
		name : '',
		email: '',
		password: '',
		msg: null
	}

	static propTypes ={
		isAuth: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors:PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps){
		const {error, isAuth} = this.props
		if(error !== prevProps.error){
			if(error.id === 'REGISTER_FAIL'){
				this.setState({msg:error.msg.msg})
			}
			else{this.setState({msg:null})}
		}
		if(this.state.modal){
			if(isAuth){
				this.toggle()
			}
		}
	}

	toggle = () => {
		this.props.clearErrors()
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
		const {name, email, password} = this.state
		const newUser = {name, email, password}
		this.props.register(newUser)
	}
   
	render(){
		return(
			<div>
				<NavLink onClick ={this.toggle} href="#">Register</NavLink>
				<Modal isOpen={this.state.modal} toggle = {this.toggle} >
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
					{this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
						<Form onSubmit = {this.onSubmit}>
							<FormGroup>
								<Label for='name'>Name</Label>
								<Input type='text' name= 'name' id='name' placeholder='name' onChange={this.onChange}/>
								<Label for='email'>email</Label>
								<Input type='email' name= 'email' id='email' placeholder='email' onChange={this.onChange}/>
								<Label for='password'>password</Label>
								<Input type='password' name= 'password' id='password' placeholder='password' onChange={this.onChange}/>
								<Button color='success' style={{marginTop : '2rem'}} block> Register</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)