import React, {Fragment} from 'react'
import {logout} from '../../actions/authactions'
import {connect } from 'react-redux'
import { NavLink } from 'reactstrap'
import PropTypes from 'prop-types'



export class Logout extends React.Component{
	static propTypes = {
		logout:PropTypes.func.isRequired
	}
	render(){
		return(
			<Fragment>
				<NavLink onClick={this.props.logout} href="#">
					Logout
				</NavLink>
			</Fragment>
		)
	}
}

export default connect(null, {logout})(Logout)