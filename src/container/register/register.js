import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
const RadioItem = Radio.RadioItem

@connect(
	state=>state.user,
	{register}
)
@imoocForm
class Register extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.handleChange('type', 'genius')
	}
	handleRegister = () => {
		this.props.register(this.props.state)
		console.log(this.props.state)
	}
	render() {
		return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
				<Logo />
				<WingBlank>
					<List>
						{this.props.msg?<p className="error_msg">{this.props.msg}</p>:null}
						<InputItem
							onChange={v=>this.props.handleChange('user', v)}
						>
							用户名
						</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.props.handleChange('pwd', v)}
						>
							密码
						</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.props.handleChange('repeatpwd', v)}
						>
							确认密码
						</InputItem>
					</List>
					<WhiteSpace />
					<RadioItem
						checked={this.props.state.type == 'genius'}
						onChange={()=>this.props.handleChange('type', 'genius')}
					>
						牛人
					</RadioItem>
					<WhiteSpace />
					<RadioItem
						checked={this.props.state.type == 'boss'}
						onChange={()=>this.props.handleChange('type', 'boss')}
					>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register