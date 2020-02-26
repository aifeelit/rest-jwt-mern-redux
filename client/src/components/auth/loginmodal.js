import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from '../../actions/authactions'
import {clearErrors} from '../../actions/erroractions'

class LoginModal extends Component{
	state = {
		modal : false,
		email: '',
		password: '',
		msg: null
	}

	static propTypes ={
		isAuth: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors:PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps){
		const {error, isAuth} = this.props
		if(error !== prevProps.error){
			if(error.id === 'LOGIN_FAIL'){
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
		const {email, password} = this.state
		const user = {email, password}
		this.props.login(user)	
	}
   
	render(){
		return(
			<div>
				<NavLink onClick ={this.toggle} href="#">Login</NavLink>
				<Modal isOpen={this.state.modal} toggle = {this.toggle} >
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
					{this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
						<Form onSubmit = {this.onSubmit}>
							<FormGroup>
								<Label for='email'>email</Label>
								<Input type='email' name= 'email' id='email' placeholder='email' onChange={this.onChange}/>
								<Label for='password'>password</Label>
								<Input type='password' name= 'password' id='password' placeholder='password' onChange={this.onChange}/>
								<Button color='success' style={{marginTop : '2rem'}} block> Login</Button>
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

export default connect(mapStateToProps, {login, clearErrors})(LoginModal)

