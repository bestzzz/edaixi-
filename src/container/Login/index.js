import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import {Link} from 'react-router-dom'
import './index.less'
export default class Login extends Component{
    render(){
        return (
            <div className='login-panel'>
              <NavHeader title='登录'  show={true}/>
                <div className='login-logo'>
                    <img src={require('../../images/xiang.jpg')} alt=""/>
                </div>
                <input type="text" placeholder='用户名'/>
                <input type="text" placeholder='密码'/>
                <Link to='/reg'>前往注册</Link>
                <div className='login-btn'>登&nbsp;录</div>
            </div>
        )
    }
}
