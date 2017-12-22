import React,{Component} from 'react';
import './index.less'
import NavHeader from '../../components/NavHeader'
import {connect} from 'react-redux'
import actions from '../../store/actions/address';

class GetOrder extends Component{
    componentDidMount(){
        this.props.getOrder(1)
    }
    render(){
        console.log(this.props.address.orders);
        return (
            <div className='all'>
              <NavHeader title='您的订单' show={true}/>
               <div className="order">
                   <div className="top">
                       <div className="icon">
                           <img src={require('../../images/clothes-icon.jpg')} alt=""/>
                           洗衣
                           <span>已确认</span>
                       </div>
                   </div>
                   <div className='middle'>
                       <div className="line">
                           <p className="number">订单编号</p>
                           <p className="time">取件时间:111111111</p>
                       </div>
                   </div>
                   <p className='bottom'>等待系统分配物流</p>
               </div>

            </div>
        )
    }
}
export default connect(
    state=>state,
    actions
)(GetOrder)