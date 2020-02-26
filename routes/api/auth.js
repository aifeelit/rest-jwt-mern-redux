const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')
const User = require('../../models/user')

const cors = require ('cors')

const app = express()

app.use(cors());

router.get('/', function(req, res){
	res.send('register')
})

router.post('/', function(req,res){
	const {email, password} = req.body
	if(!email || !password)	return res.status(400).json({msg:"please enter all"})
	User.findOne({email}).then(user => {
		if(!user) return res.status(400).json({msg:"doent exist"})
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if (!isMatch) return res.status(400).json({msg: "invalid creds"})
			jwt.sign(
				{id: user.id},
				config.get('jwtSecret'),
				{expiresIn:3600},
				(err, token) => {
					if(err) throw err
					res.json({
						token,
						user:{
							id: user.id, 
							name: user.name, 
							email: user.email
						}
					})
				}
			)
		})
	})	
})

router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
	.select('-password')
	.then(user => res.json(user))
})

module.exports = router