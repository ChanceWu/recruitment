import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
const socket = io('ws://192.168.31.120:9093')

@connect(
	state=>state,
	{ getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			msg: []
		}
	}
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
		// socket.on('recvmsg', (data)=>{
		// 	this.setState({
		// 		msg: [...this.state.msg, data.text]
		// 	})
		// })
	}
	componentWillUnmount() {
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	fixCarousel = () => {
		// 为解决grid展示的bug，利用一个延迟事件
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		}, 0)
	}
	handleSubmit() {
		// socket.emit('sendmsg', {text: this.state.text})
		// this.setState({text: ''})
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({
			text: '',
			showEmoji: false
		})
	}
	render() {
		const emoji = '😲 😃 ❤ 🔥 😍 😊 ✔ 👍 🐦 👿 🐗 📱 💬 💕 🎌 🔣 💡 🌇 ⚽ 🍔 🐻 😲 😃 ❤ 🔥 😍 😊 ✔ 👍 🐦 👿 🐗 📱 💬 💕 🎌 🔣 💡 🌇 ⚽ 🍔 🐻 😲 😃 ❤ 🔥 😍 😊 ✔ 👍 🐦 👿 🐗 📱 💬 💕 🎌 🔣 💡 🌇 ⚽ 🍔 🐻'
						.split(' ')
						.filter(v=>v)
						.map(v=>({text: v}))
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if (!users[userid]) {
			return null
		}
		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
		return (
			<div id="chat-page">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>
				{
					chatmsgs.map((v, i)=>{
						const avatar = require(`../img/${users[v.from].avatar}.png`)
						return v.from==userid?(
							<List key={i}>
								<Item thumb={avatar}>{v.content}</Item>
							</List>
						):(
							<List key={i}>
								<Item
									extra={<img src={avatar} />}
									className="chat-me"
								>{v.content}</Item>
							</List>
						)
					})
				}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											}, this.fixCarousel())
										}}
									>😲</span>
									<span onClick={()=>this.handleSubmit()}>发送</span>
								</div>
							}
						/>
					</List>
					{
						this.state.showEmoji?(
						<Grid
							data={emoji}
							columnNum={9}
							carouselMaxRow={4}
							isCarousel={true}
							onClick={el=>{
								this.setState({
									text: this.state.text+el.text
								})
							}}
						/>):null
					}
				</div>
			</div>
		)
	}
}

export default Chat
