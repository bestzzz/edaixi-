import React, {Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import './index.less'
import {Link} from 'react-router-dom'

export default class Address extends Component {
    render() {
        return (
            <div className='usual-address'>
                <NavHeader title='常用地址' show={true}/>
                <div className='white'>
                    <Link to='/addadress' className='info'>
                        <span>姓名</span>
                        <span>1888888888</span>
                        <p className='address'>深圳市南山区科技园南区R2-B三楼步步高哈哈哈哈(收)</p>
                        <span className='arrow'> &gt; </span>
                    </Link>
                </div>
                <div className='white'>
                    <Link to='/addadress' className='info'>
                        <span>姓名</span>
                        <span>1888888888</span>
                        <p className='address'>深圳市南山区科技园南区R2-B三楼步步高哈哈哈哈(收)</p>
                        <span className='arrow'> &gt; </span>
                    </Link>
                </div>
                <div className="add"> <Link to='/addadress'>+ 添加</Link> </div>
            </div>
        )
    }
}
