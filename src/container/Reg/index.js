import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import {Link} from 'react-router-dom';
import './index.less';
import {connect} from 'react-redux';
import actions from '../../store/actions/session'
import Alert from '../../components/Alert/index'
class Reg extends Component{
    handleClick=()=>{
        let username=this.username.value;
        let password=this.password.value;
        this.props.reg({username,password})
    };
    render(){
        return (
            <div className='reg-panel'>
                <NavHeader title='注册'  show={true}/>
                <div className='reg-logo'>
                    <img src={require('../../images/xiang.jpg')} alt=""/>
                </div>
                <input type="text" ref={input=>this.username=input} placeholder='请输入用户名'/>
                <input type="text" ref={input=>this.password=input} placeholder='请输入密码'/>
                <Link to='/login'>前往登录</Link>
                <div className='reg-btn' onClick={this.handleClick}>注&nbsp;册</div>
                <Alert/>
            </div>
        )
    }
}
export default connect(
    state=>state.session,
    actions
)(Reg);