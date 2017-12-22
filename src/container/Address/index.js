import React, {Component} from 'react';
import NavHeader from '../../components/NavHeader/index'
import './index.less'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/address'
import ListSwipe from 'react-list-swipe';
import {withRouter} from 'react-router-dom'

class Address extends Component {
    componentDidMount() {
        this.props.addresses(this.props.session.user.userId);
    }

    /*componentWillUpdate(){
       // let userId=this.props.session.user.userId||'';

        this.props.addresses(this.props.session.user.userId)
    }*/

    render() {
        let item = {userId: '', province: '', city: '', address1: '', address2: '', name: '', sex: '男', tel: ''};
        return (
            <div className='usual-address'>
                <NavHeader title='常用地址' show={true}/>
                <div className="content">
                    {
                        this.props.address.users ? this.props.address.users.map((item, index) => {
                            return <ListSwipe key={index}>
                                <div className="swipe-list-view-cell outcell">
                                    <div className="swipe-right-btn" id='bg-info' onClick={() => {
                                        this.props.deleteaddress(item.ID, this.props.session.user.userId);
                                    }}>
                                        <i className="iconfont icon-lajitong"></i> 删除
                                    </div>
                                    <div className="swipe-handle">
                                        <div className='white'>
                                            <div className="default">
                                                <span>
                                                    <Link to={{pathname: `/order/${item.ID}`, state: {item}}}
                                                                 className='info'>
                                                        <span>{item.name}</span>
                                                        <span>{item.tel}</span>
                                                        <p className='address'>{item.province}{item.city}{item.address1}{item.address2}</p>
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link to={{pathname: `/addadress/${item.ID}`, state: {item}}}
                                                          className='info'>
                                                        <span className='arrow'><i className="iconfont icon-bianji"></i> 编辑 <i className="iconfont icon-arrow-right"></i> </span>
                                                    </Link>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </ListSwipe>
                        }) : null
                    }
                </div>
                <div className="add"><Link to={{pathname: '/addadress', state: {item}}}>+ 添加地址</Link></div>
            </div>
        )
    }
}

export default connect(
    state => state,
    actions
)
(withRouter(Address))