const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const UserRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')

// const User = mongoose.model('user', new mongoose.Schema({
// 	user:{type: String, require: true},
// 	age:{type: Number, require: true}
// }))

// User.create({
// 	user: 'tim',
// 	age: 22
// }, function(err, doc) {
// 	if (!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

// User.remove({age: 19}, function(err, doc) {
// 	console.log(doc)
// })

// User.update({user: 'tim'}, {'$set': {age: 30}}, function(err, doc) {
// 	console.log(doc)
// })

// 新建app
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendmsg', function(data) {
		// console.log(data)
		// io.emit('recvmsg', data)
		const {from, to, msg} = data
		const chatid = [from, to].sort().join('_')
		Chat.create({chatid, from, to, content: msg}, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', UserRouter)

// app.get('/', function(req, res) {
// 	res.send('<h1>hello world</h1>')
// })
// 
// app.get('/data', function(req, res) {
// 	// res.json({name:'imooc ss',type:'IT'})
// 	User.findOne({user: 'tim'}, function(err, doc) {
// 		res.json(doc)
// 	})
// })

server.listen(9093, function() {
	console.log('Node app start at port 9093')
})