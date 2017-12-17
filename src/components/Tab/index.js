import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './index.less'
import NavHeader from "../NavHeader/index";
export default class Tab extends Component{
    render(){
        return (
            <nav>
                <NavLink exact to="/">
                    <i className="iconfont icon-icon_washer "></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/orders">
                    <i className="iconfont icon-nav-order"></i>
                    <span>订单</span>
                </NavLink>
                <NavLink to="/profile">
                    <i className="iconfont icon-wode"></i>
                    <span>我的</span>
                </NavLink>
            </nav>
        )
    }
}