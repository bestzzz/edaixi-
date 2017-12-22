import React,{Component} from 'react';
import "./index.less"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/session'
import UploadImg from "../../components/UploadImg/uploadImg";

class Profile extends Component{
    handleClick=()=>{
        localStorage.removeItem('login');
        this.props.logout()
    };
    render(){
        console.log(this.props);
        return (
            <div className='profile-content'>
                <div className="profile-header">
                 <div className='profile-name'>
                     <UploadImg uploadImge={this.props.uploadImge}/>
                     <img src={require('../../images/xiang.jpg')} alt=""/>
                     <div className='name'>
                         {
                             this.props.user?<h2>{this.props.user.username}</h2>:<h2><Link to='/login'> 登录 </Link></h2>
                         }
                         <p>让生活多份自在</p>
                     </div>

                 </div>
                    {
                        this.props.user?<div className='recharge' onClick={this.handleClick}>退出</div>:null
                    }
             </div>
                <div className="white">
                    <div className='address'>
                        <img src={require('../../images/address.jpg')} alt=""/>
                        <span><Link to={{pathname:'/address'}}>常用地址</Link></span>
                        <span className='arrow'> > </span>
                    </div>
                </div>
                <div className="white-advice">
                    <div className='advice'>
                        <img src={require('../../images/advice.jpg')} alt=""/>
                        <span className='fade'><Link to='/back'>评价</Link></span>
                        <span className='arrow'> > </span>
                    </div>
                </div>
                <div className="white-order">
                    <div className='order'>
                        <img src={require('../../images/order.jpg')} alt=""/>
                        <span className='fade'><Link to='/getorder'>获取订单</Link></span>
                        <span className='arrow'> > </span>
                    </div>
                </div>

            </div>
        )
    }
}
export default connect(
    state=>state.session,
    actions
)(Profile)