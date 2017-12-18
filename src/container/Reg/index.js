import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import {Link} from 'react-router-dom'
import './index.less'
export default class Reg extends Component{
    render(){
        return (
            <div className='reg-panel'>
                <NavHeader title='注册'  show={true}/>
                <div className='reg-logo'>
                    <img src={require('../../images/xiang.jpg')} alt=""/>
                </div>
                <input type="text" placeholder='请输入用户名'/>
                <input type="text" placeholder='请输入密码'/>
                <Link to='/login'>前往登录</Link>
                <div className='reg-btn'>注&nbsp;册</div>
            </div>
        )
    }
}
