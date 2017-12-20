import React, {Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import './index.less'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/address'
class Address extends Component {
    render() {
        console.log(this.props);
        return (
            <div className='usual-address'>
                <NavHeader title='常用地址' show={true}/>
                {
                    this.props.users.map((item,index)=>(
                        <div className='white' key={item.ID}>
                            <Link to='/addadress' className='info'>
                                <span>{item.name}</span>
                                <span>{item.tel}</span>
                                <p className='address'>{item.province}{item.city}{item.address1}{item.address2}</p>
                                <span className='arrow'> &gt; </span>
                            </Link>
                        </div>
                    ))
                }
                <div className="add"> <Link to='/addadress'>+ 添加</Link> </div>
            </div>
        )
    }
}
export default connect(
    state=>state.address,
    actions
)
(Address)