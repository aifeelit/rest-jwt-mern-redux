const mongoose  = require ('mongoose')
const config = require('config')
const path = require('path')
const db = config.get('MongoURI')
const cors = require ('cors')
const express = require('express')

const app = express()

app.use(cors());

app.use(express.json())
app.use('/api/items',require('./routes/api/items'))

app.use('/api/users',require('./routes/api/user'))

app.use('/api/auth',require('./routes/api/auth'))

mongoose.connect(db)
.then(()=>console.log("****~~~MongoDB connected~~~***")) 
.catch(err=> console.log(err))

if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 5000


app.listen(port, ()=> console.log("Server started"))