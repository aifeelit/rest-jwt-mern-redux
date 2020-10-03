const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Item = require('../../models/items')
const cors = require ('cors')

const app = express()

app.use(cors());

router.get('/items', function(req, res){
	Item.find()
	.sort({date : -1})
	.then(items => res.json(items))
})

router.post('/', auth, function(req,res){
	var newItem = new Item({
		name:req.body.name,
	})
  newItem.save().then(item => res.json(item)) 
})

router.delete('/:_id', auth, function(req,res){
	Item.findById(req.params._id)
	.then(item => item.remove()
		.then(()=>res.json({success:true})))
		.catch(err=>res.status(404).json({success:false}))
})

module.exports = router