const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')


const User = require('../../models/user')

const cors = require ('cors')

const app = express()

app.use(cors());


router.get('/', function(req, res){
	res.send('register')
})

router.post('/user', function(req,res){
	const {name, email, password} = req.body
	if(!name || !email || !password){
		return res.status(400).json({msg:"please enter all"})
	}
	User.findOne({email}).then(user => {
		if(user) return res.status(400).json({msg:"user already exists"})
	})
	const newUser = new User({name, email, password})
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash)=>{
			if (err) throw err
			newUser.password = hash
			newUser.save().then( user => {

				jwt.sign(
					{id: user.id},
					config.get('jwtSecret'),
					{expiresIn:3600},
					(err, token) => {
						if(err) throw err
						res.json({
							token,
							user:{
							id: user.id, name: user.name, email: user.email
						}
						})
					}
				)
			})
		})
	})
})

module.exports = router