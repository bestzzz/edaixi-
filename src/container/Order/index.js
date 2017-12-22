import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux';
import Tab from '../../components/Tab'
import actions from '../../store/actions/cart'
import {addresses, addOrder, getAddress} from '../../api';
import DatePicker from 'react-mobile-datepicker';
import {format} from '../../utils';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            address: {name: '', tel: '', province: '', city: '', address1: '', address2: ''},
            time: new Date(),
            isOpen: false,
            userId: '',
            addressId: ''
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        let {params: {id}} = this.props.match;
        this.setState({addressId: id});
        if (id) {
            let address = await getAddress(id);
            this.setState({address});
        }
    }

    async componentWillReceiveProps() {
        localStorage.getItem('login') ? null : this.props.history.push('/login');
        if (this._isMounted && this.props.session.user && this.props.session.user.userId) {
            this.setState({userId: this.props.session.user.userId})
            if (!this.state.addressId) {
                let address = await addresses(this.props.session.user.userId);
                console.log(address);
                if (address.length) {
                    this.setState({address: address[0]});
                }
            }
            if (localStorage.getItem('cart') && this.props.cart.cart.length == 0) {
                this.props.addCart(JSON.parse(localStorage.getItem('cart')), localStorage.getItem('sumPrice'));
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClick = () => {
        this.setState({isOpen: true});
    }

    handleCancel = () => {
        this.setState({isOpen: false});
    }

    handleSelect = (time) => {
        this.setState({time, isOpen: false});
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let userId = this.state.userId;
        let orderProduct = this.props.cart.cart;
        let orderPriceSum = this.props.cart.orderPriceSum;
        let addressId = this.state.address.ID;
        let PickUpTime = format(this.state.time, "yyyy-MM-dd");
        let remark = this.remark.value;
        let order = {userId, orderProduct, orderPriceSum, addressId, PickUpTime, remark};
        addOrder(order).then(res => {
            if (res) {
                alert("下单成功啦，我们会尽快安排取件哦~");
                this.props.history.push('/profile');
                localStorage.removeItem('cart');
                localStorage.removeItem('sumPrice');
                localStorage.removeItem('cartLocal');
            }
        }).catch(err => {
            console.log('出错了: ( ' + err);
        })
    }

    render() {
        console.log(this.state.address);
        return (
            <div className="box">
                <div className="pickUp">预约取件</div>
                <form method='POST' onSubmit={this.handleSubmit}>
                    <Link to="/address">
                        <div className="con">
                                <span className="name">{this.state.address.name}</span>
                                <span className = "tel"> {this.state.address.tel}</span>
                                <span
                                className="address">{this.state.address.province + this.state.address.city + this.state.address.address1 + this.state.address.address2}</span>
                            <span className="updateAddress">添加/修改地址<i className="iconfont icon-jiantouyou"></i></span>
                        </div>
                    </Link>
                    <div className="choose">
                        <a
                            className="select-btn"
                            onClick={this.handleClick}>
                            请选择取件时间：{format(this.state.time, "yyyy-MM-dd")}<span>改天再送? 点我</span>
                        </a>
                        <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            onSelect={this.handleSelect}
                            onCancel={this.handleCancel}/>
                    </div>
                    <p><textarea ref={input => this.remark = input} name="remark" id="remark" cols="30" rows="10"
                                 placeholder="如有问题请备注信息"></textarea></p>
                    <p>
                        <input type="submit" id='submit' value="立即预约"/>
                    </p>
                    <Tab/>
                </form>
            </div>
        )
    }
}

export default connect(
    state => state,
    actions
)(Order)