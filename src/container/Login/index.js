import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/session'
import Alert from '../../components/Alert/index'
class Login extends Component{
    handleClick=()=>{
        localStorage.setItem('login','true');
        let username=this.username.value;
        let password=this.password.value;
        this.props.login({username,password})
    };
    render(){
        return (
            <div className='login-panel'>
              <NavHeader title='登录'  show={true}/>
                <div className='login-logo'>
                    <img src={require('../../images/xiang.jpg')} alt=""/>
                </div>
                <input type="text" ref={input=>this.username=input} placeholder='用户名'/>
                <input type="text" ref={input=>this.password=input}  placeholder='密码'/>
                <Link to='/reg'>前往注册</Link>
                <div className='login-btn' onClick={this.handleClick}>登&nbsp;录</div>
                <Alert/>
            </div>
        )
    }
}

export default connect(
    state=>state.session,
    actions
)(Login)