import React, {Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/session'

class Order extends Component {
    render() {
        return (
            <div>
                <span>name</span><span>tel</span><div>地址：</div>
                选择取件时间：<span>time</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="如有问题请备注信息"></textarea>
                <button>立即预约</button>
            </div>
        )
    }
}
export default connect(
    state => state.session,
    actions
)(Order)