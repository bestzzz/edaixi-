import React,{Component} from 'react';
import "./index.less"
import {Link} from 'react-router-dom'
export default class Profile extends Component{
    render(){
        return (
            <div className='profile-content'>
             <div className="profile-header">

                 <div className='profile-name'>
                     <img src={require('../../images/xiang.jpg')} alt=""/>
                     <div className='name'>
                         <h2> <Link to='/login'>登录</Link></h2>
                         <p>让生活多份自在</p>
                     </div>
                 </div>
                 <div className='recharge'>充值</div>
             </div>
                <div className="white">
                    <div className='address'>
                        <img src={require('../../images/address.jpg')} alt=""/>
                        <span><Link to='address'>常用地址</Link></span>
                        <span className='arrow'> > </span>
                    </div>
                </div>
                <div className="white-advice">
                    <div className='advice'>
                        <img src={require('../../images/advice.jpg')} alt=""/>
                        <span className='fade'><Link to='address'>评价</Link></span>
                        <span className='arrow'> > </span>
                    </div>
                </div>
            </div>
        )
    }
}
