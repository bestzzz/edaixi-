import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './index.less'
export default class Tab extends Component{
    render(){
        return (
            <nav>
                <NavLink exact to="/">
                    <i className="iconfont icon-xiugaimima"></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/order">
                    <i className="iconfont icon-book"></i>
                    <span>订单</span>
                </NavLink>
                <NavLink to="/profile">
                    <i className="iconfont icon-xiaolian"></i>
                    <span>我的</span>
                </NavLink>
            </nav>
        )
    }
}
