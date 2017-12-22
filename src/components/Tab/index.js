import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './index.less'
import NavHeader from "../NavHeader/index";
import {connect} from 'react-redux';
import actions from '../../store/actions/session'
class Tab extends Component{
    componentDidMount(){
        this.props.validate();
    }
    render(){
        return (
            <nav>
                <NavLink exact to="/">
                    <i className="iconfont icon-icon_washer "></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/list/1/6">
                    <i className="iconfont icon-nav-order"></i>
                    <span>类别</span>
                </NavLink>
                <NavLink to="/profile">
                    <i className="iconfont icon-wode"></i>
                    <span>我的</span>
                </NavLink>
            </nav>
        )
    }
}

export default connect(
   state=>state.session,
    actions
)(Tab)