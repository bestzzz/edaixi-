import React, {Component} from 'react';
import './index.less'
import NavHeader from '../../components/NavHeader'
import {connect} from 'react-redux'
import actions from '../../store/actions/address';
import {getProduct} from '../../api';
class GetOrder extends Component {
    componentDidMount() {
        this.props.getOrder(this.props.session.user.userId);
    }

    render() {
        return (
            <div className='all'>
                <NavHeader title='您的订单' show={true}/>
                {
                    this.props.address.orders.map((item, index) => (
                        <div className="order" key={index}>
                            <div className="top">
                                <div className="icon">
                                    <img src={require('../../images/clothes-icon.jpg')} alt=""/>
                                    洗衣
                                    <span>已确认</span>
                                </div>
                            </div>
                            <div className='middle'>
                                <div className="line">
                                    <p className="number">订单编号:{item.ID}</p>
                                    <p className="time">取件时间:{item.time}</p>
                                </div>
                            </div>
                            {
                                item.orderProduct?item.orderProduct.map(pro=>(
                                    <div className="product" key={pro.proId}>
                                        <div className="line">
                                            <p className="number">
                                                <img src={require('../../images/xiang.jpg')} alt=""/>
                                                <span className='name'>马甲</span>
                                                <span className='amount'>{pro.counts}</span>
                                            </p>
                                        </div>
                                    </div>
                                )):null
                            }
                            <p className='bottom'>{item.remark}</p>
                            <p className='bottom'>等待系统分配物流</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    actions
)(GetOrder)