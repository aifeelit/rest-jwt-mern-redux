import React, {Component, Fragment} from 'react'
import{
	Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, Container, NavItem
} from 'reactstrap'
import Logout from './auth/logout'
import LoginModal from './auth/loginmodal'
import RegisterModal from './auth/registermodal'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class AppNavbar extends Component{
	state = {
		isOpen : false,
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
	}

	toggle = () => {
		this.setState({
			isOpen : !this.state.isOpen
		}) 
	}

	render(){		
		const {isAuth, user}=this.props.auth
		const authLinks =(
			<Fragment>
				<NavItem>
					<Logout/>
				</NavItem>
				<NavItem>
					<span className="navbar-text mr-2"><strong>{user ? `Welcome ${user.name}` : ''}</strong></span>
				</NavItem>
			</Fragment>
		)

		const guestLinks = (
			<Fragment>
				<NavItem>
					<RegisterModal/>
				</NavItem>
				<NavItem>
					<LoginModal/>
				</NavItem>
			</Fragment>
		)

		return(
			<div>
				<Navbar color = 'dark' dark expand='sm' className='mb-5'>
					<Container>
						<NavbarBrand href='/'>Kinda To Do or whatever</NavbarBrand>
						<NavbarToggler onClick={this.toggle}/>
						<Collapse isOpen={this.state.isOpen} navbar> 
							<Nav className='ml-auto' navbar>
								{isAuth ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth:state.auth,
})

export default connect(mapStateToProps ,null)(AppNavbar);